import React from "react";
import "./App.css";
import Scheduler from "./Components/Scheduler.js";
import InfoView from "./Components/InfoView.js";
import MeetingItems from "./Components/MeetingItems.js";
import CurrentMeeting from "./Components/CurrentMeeting.js";
import { Row, Col } from "react-bootstrap/";
import data from "./Components/meetings.json";
import moment from "moment";

class SchedulerApp extends React.Component {
  constructor() {
    super();

    this.state = {
      meetingsData: data,
      time: moment().format("HH:mm"),
      date: moment().format("DD.MM.YYYY"),
      infoWindowOpen: false
    };
    this.getInfo = this.getInfo.bind(this);
    this.closeInfo = this.closeInfo.bind(this);
  }

  //checks current time every 3 second and updates app's time
  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ time: moment().format("HH:mm") }),
      3000
    );
  }

  //TARVIIKO??
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  //user closes meeting infowindow
  closeInfo(event) {
    this.setState({ infoWindowOpen: false });
  }
  //user opens meeting infowindow
  getInfo(event) {
    this.setState({ infoWindowOpen: true });
  }

  render() {
    //array for timeline hours
    const hours = [];
    //creates timeline with clock times in 30 minute periods
    //timeline is dynamic and it shows times between 1 hour ago from current time
    // up till 10 hours later from current time
    let currentMomentTime = moment();
    let remainder = 30 - (currentMomentTime.minute() % 30);
    let oneHourAgo = moment()
      .add(remainder, "minutes")
      .subtract(1, "hours");
    let tenHoursLater = moment().add(10, "hours");

    //populates hours-array in 30 minute periods in HH:mm format
    while (oneHourAgo < tenHoursLater) {
      hours.push(oneHourAgo.format("HH:mm"));
      hours.push(
        oneHourAgo
          .clone()
          .add(30, "minutes")
          .format("HH:mm")
      );
      oneHourAgo.add(1, "hours");
    }

    // NOTE:this old solution / hardcoded version
    //let currentTime = "09:40"
    // const hours = [];
    // for (let hour = 7; hour < 17; hour++) {
    //   hours.push(moment({ hour }).format("HH:mm"));
    //   hours.push(
    //     moment({
    //       hour,
    //       minute: 30
    //     }).format("HH:mm")
    //   );
    // }

    //finds if there is meeting currently going on
    //by checking if current time >= meeting's starttime and current time < meeting's endtime
    let currentTime = this.state.time;
    let currentDate = this.state.date;
    let currentMeeting = this.state.meetingsData.find(
      m => currentTime >= m.StartTime && currentTime < m.EndTime
    );
    let currentMeetingElement = <></>;
    // if match is found, shows current meeting info
    if (currentMeeting) {
      currentMeetingElement = (
        <CurrentMeeting meetingInfo={currentMeeting} time={currentTime} />
      );
    } else {
      // otherwise no meetings available
      currentMeetingElement = (
        <div>
          <h1>No meeting at the moment.</h1>
        </div>
      );
    }

    //if !infowindow shows timeline schedule on the right side of the UI
    let schedulerViewElement = <></>;
    if (!this.state.infoWindowOpen) {
      schedulerViewElement = (
        <Col sm={4} className="scheduler-view">
          <h4>CONFERENCE ROOM</h4>
          <h3>{currentDate} klo:{currentTime}</h3>
          <table id="table">
            <tbody>
              {/* creates timeline from hours-array in the form of table rows*/}
              {hours.map(hour => (
                <tr>
                  <td className="td-hour">{hour}</td>
                  {/* goes through meetings from meetingdata.json */}
                  {this.state.meetingsData.map(meeting => (
                    //adds onclick to every meeting
                    <Scheduler
                      click={this.getInfo.bind(this)}
                      key={meeting.id}
                      meetingInfo={meeting}
                      time={hour}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      );
      //if infowindow=true shows meeting's infowindow on the right side of the UI
    } else {
      schedulerViewElement = <InfoView click={this.closeInfo.bind(this)} />;
    }

    return (
      <Row className="start-view">
        <Col sm={8} className="current-meeting">
          <Row>
            <Col sm={12}>
              <div>
                <h6>CURRENT MEETING</h6>
                <hr width="2%" color="white"></hr>
              </div>
              <div className="current-meeting-name">
                {currentMeetingElement}
              </div>
            </Col>
          </Row>
          {/* show meetings also below the current meeting element */}
          <Row className="meeting-items">
            {this.state.meetingsData.map((meeting, i) => (
              <MeetingItems key={i} meetingInfo={meeting} />
            ))}
          </Row>
        </Col>
        {schedulerViewElement}
      </Row>
    );
  }
}
export default SchedulerApp;
