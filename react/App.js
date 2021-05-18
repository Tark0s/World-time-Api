const UserTime = (props) => {
  return (
    <>
      <p>User Time</p>
      <div className="clock">
        {`${props.content.hours} : ${props.content.minutes} `}
      </div>
    </>
  );
};

class Time extends React.Component {
  state = {
    userTime: this.getUserTime(),
  };

  getUserTime() {
    const time = new Date();
    return {
      hours: time.getHours(),
      minutes: time.getMinutes(),
    };
  }
  setUserTime = () => {
    const userTime = this.getTime();

    this.setState({ userTime });
  };
  componentDidMount() {
    setInterval(this.setTime, 1000);
  }

  render() {
    return (
      <>
        <UserTime content={this.state.userTime} />
      </>
    );
  }
}

ReactDOM.render(<Time />, document.getElementById("root"));
