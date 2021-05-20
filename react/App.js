//component shwoing times
const Clock = (props) => {
  const { hours, minutes } = props.content;
  return (
    <>
      <p>{props.name} Time</p>
      <div className="clock">
        {props.ready
          ? `${hours > 9 ? hours : "0" + hours}:${
              minutes > 9 ? minutes : "0" + minutes
            }`
          : "loading..."}
      </div>
    </>
  );
};
//component showing time difference
const TimeDiff = (props) => {
  const { api, user, ready } = props;

  if (ready) {
    let diff = (api.getTime() - user.getTime()) / 1000;
    diff /= 60;
    diff = Math.abs(Math.round(diff));
    return (
      <>
        <p>Time difference</p>
        <div className="clock">{diff} Minutes</div>
      </>
    );
  } else {
    return (
      <>
        <p>Time difference</p>
        <div className="clock">loading...</div>
      </>
    );
  }
};
//main class component
class Time extends React.Component {
  state = {
    userDate: [],
    userTime: this.getUserTime(),
    apiDate: [],
    apiTime: {},
    isApiReady: false,
  };
  //user
  setUserDate = () => {
    const userDate = new Date();
    this.setState({
      userDate,
    });
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
  //api
  setApiDate = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://worldtimeapi.org/api/timezone/Europe/Madrid", true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const apiDate = JSON.parse(xhr.response);
        this.setState({
          apiDate: new Date(apiDate.datetime),
          isApiReady: true,
        });
      }
    };
    xhr.send();
  };
  setApiTime = () => {
    if (this.state.isApiReady) {
      const time = this.state.apiDate;
      this.setState({
        apiTime: {
          hours: time.getHours(),
          minutes: time.getMinutes(),
        },
      });
    }
  };

  componentDidMount() {
    setInterval(this.setUserDate, 1000);
    setInterval(this.setUserTime, 1000);
    setInterval(this.setApiDate, 1000);
    setInterval(this.setApiTime, 1000);
  }
  render() {
    const { apiDate, userDate, userTime, apiTime, isApiReady } = this.state;
    return (
      <>
        <Clock content={userTime} name="User" ready={true} />
        <Clock content={apiTime} name="Api" ready={isApiReady} />
        <TimeDiff api={apiDate} user={userDate} ready={isApiReady} />
      </>
    );
  }
}

ReactDOM.render(<Time />, document.getElementById("root"));
