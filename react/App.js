const UserTime = (props) => {
  const { hours, minutes } = props.content;

  return (
    <>
      <p>User Time</p>
      <div className="clock">
        {`${hours > 9 ? hours : "0" + hours}:${
          minutes > 9 ? minutes : "0" + minutes
        }`}
      </div>
    </>
  );
};
const ApiTime = (props) => {
  const { datetime } = props.content;
  let information = datetime;
  let hours = "hours";
  if (information === undefined) {
  } else {
    console.log(information);
    hours = information.substring(11, 16);
  }

  return (
    <>
      <p>
        Api Time <small>(server speed: slow)</small>
      </p>
      <div className="clock">{props.ready ? hours : "loading..."}</div>
    </>
  );
};

class Time extends React.Component {
  state = {
    userTime: this.getUserTime(),
    apiTime: [],
    isApiReady: false,
  };

  getUserTime() {
    const time = new Date();
    return {
      hours: time.getHours(),
      minutes: time.getMinutes(),
    };
  }
  setUserTime = () => {
    const userTime = this.getUserTime();

    this.setState({ userTime });
  };
  setApiTime = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://worldtimeapi.org/api/timezone/Europe/Madrid", true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const apiTime = JSON.parse(xhr.response);
        this.setState({
          apiTime,
          isApiReady: true,
        });
      }
    };
    xhr.send();
  };
  componentDidMount() {
    setInterval(this.setUserTime, 1000);
    setTimeout(setInterval(this.setApiTime, 1000), 3000);
  }

  render() {
    return (
      <>
        <UserTime content={this.state.userTime} />
        <ApiTime content={this.state.apiTime} ready={this.state.isApiReady} />
      </>
    );
  }
}

ReactDOM.render(<Time />, document.getElementById("root"));
