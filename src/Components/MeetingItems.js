import React from "react";
import { Col } from "react-bootstrap/";

function MeetingItems(props) {
  return (
    <Col sm={4} className="meeting-item">
      <div>
        {props.meetingInfo.StartTime} - {props.meetingInfo.EndTime}
      </div>
      <div>{props.meetingInfo.Subject}</div>
      <div>{props.meetingInfo.Organizer}</div>
    </Col>
  );
}
export default MeetingItems;
