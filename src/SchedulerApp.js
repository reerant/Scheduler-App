import React from "react";
import "./App.css";
import Scheduler from "./Components/Scheduler.js";
import InfoView from "./Components/InfoView.js";
import MeetingItem from "./Components/MeetingItem.js";
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
      selectedMeeting: null
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

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //user closes meeting infowindow
  closeInfo(event) {
    this.setState({ selectedMeeting: null });
  }
  //user opens meeting infowindow
  getInfo(meetingInfo) {
    this.setState({ selectedMeeting: meetingInfo });
  }

  render() {
    //checks which of the meetings are on-going/up-coming and picks next 3 of those
    //these are shown at the bottom of the UI
    let upComingMeetings = this.state.meetingsData
      .filter(m => m.EndTime > this.state.time)
      .slice(0, 3);

    //array for timeline hours
    const hours = [];
    //creates timeline with clock times in 30 minute periods
    //timeline is dynamic and it shows times between 2 hours ago from current time
    // up till 10 hours later from current time
    let currentMomentTime = moment();
    let remainder = 30 - (currentMomentTime.minute() % 30);
    let twoHoursago = moment()
      .add(remainder, "minutes")
      .subtract(2, "hours");
    let tenHoursLater = moment().add(10, "hours");

    //populates hours-array in 30 minute periods in HH:mm format
    while (twoHoursago < tenHoursLater) {
      hours.push(twoHoursago.format("HH:mm"));
      hours.push(
        twoHoursago
          .clone()
          .add(30, "minutes")
          .format("HH:mm")
      );
      twoHoursago.add(1, "hours");
    }

    // NOTE:this is old solution / hardcoded version
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

    //if !selectedMeeting shows timeline schedule on the right side of the UI
    let schedulerViewElement = <></>;
    if (!this.state.selectedMeeting) {
      schedulerViewElement = (
        <Col sm={4} className="scheduler-view">
          <h4 className="h4-styling">CONFERENCE ROOM</h4>
          <h3 className="h3-styling">
            {currentDate} klo: {currentTime}
          </h3>
          <table id="table">
            <tbody>
              {/* creates timeline from hours-array in the form of table rows*/}
              {hours.map((hour, i) => (
                <tr key={i}>
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

      //if selectedMeeting=true shows meeting's infowindow on the right side of the UI
    } else {
      schedulerViewElement = (
        <InfoView
          date={currentDate}
          meetingInfo={this.state.selectedMeeting}
          click={this.closeInfo.bind(this)}
        />
      );
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
          {/* shows 3 next on-going/up-coming meetings below the current meeting element */}
          <Row className="meeting-items">
            {upComingMeetings.map((meeting, i) => (
              <MeetingItem key={i} meetingInfo={meeting} />
            ))}
          </Row>
        </Col>
        {schedulerViewElement}
      </Row>
    );
  }
}
export default SchedulerApp;
