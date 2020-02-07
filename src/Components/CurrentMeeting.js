import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Row, Col } from "react-bootstrap/";
import moment from "moment";

function CurrentMeeting(props) {
  //time calculations for dynamic progress bar
  let currentTime = props.time;
  let startTime = props.meetingInfo.StartTime;
  let endTime = props.meetingInfo.EndTime;

  // start time and end time
  let start = moment(startTime, "HH:mm");
  let current = moment(currentTime, "HH:mm");

  // calculate diff between current and start time
  let duration = moment.duration(current.diff(start));

  // calculates duration in minutes
  let minutes = parseInt(duration.asMinutes());
  // calculates the right number for progressbar that shows how far the current meeting is going
  let progress = (minutes / props.meetingInfo.Duration) * 100;

  return (
    <>
      <h1 className="meeting-name">{props.meetingInfo.Subject}</h1>
      <div>
        <Row>
          <Col sm={4} className="meeting-start">
            {startTime}
          </Col>
          <Col className="progressBar" sm={4}>
            <ProgressBar now={progress} />
          </Col>
          <Col sm={4} className="meeting-end">
            {endTime}
          </Col>
        </Row>
      </div>
      <div className="hostName">
        <h6>{props.meetingInfo.Organizer}</h6>
      </div>
    </>
  );
}
export default CurrentMeeting;
