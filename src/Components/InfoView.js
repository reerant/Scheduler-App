import React from "react";
import { Row, Col } from "react-bootstrap/";
import timeIcon from "./icons/time.png";
import personIcon from "./icons/person.png";
import descriptionIcon from "./icons/description.png";
import exitIcon from "./icons/exit.png";

//shows more info for meeting that has been clicked in the schedule
function InfoView(props) {
  return (
    <Col sm={4} className="item-open">
      <Row className="info-meeting-name">
        <Col sm={2}>
          {/* user can close the infowindow*/}
          <img
            src={exitIcon}
            onClick={props.click}
            alt="exit-icon"
            style={{ cursor: "pointer" }}
          />
        </Col>
        <Col sm={10} className="info-col-style">
          <h5>{props.meetingInfo.Subject}</h5>
        </Col>
      </Row>
      <Row className="info-meeting">
        <Col sm={2}>
          <img src={timeIcon} alt="time-icon" />
        </Col>
        <Col sm={10} className="info-col-style">
          <h5>{props.date}</h5>
        </Col>
      </Row>
      <Row className="info-meeting">
        <Col sm={2}>
          <img src={timeIcon} alt="time-icon" />
        </Col>
        <Col sm={10} className="info-col-style">
          <h5>
            {props.meetingInfo.StartTime}-{props.meetingInfo.EndTime}
          </h5>
        </Col>
      </Row>
      <Row className="info-meeting">
        <Col sm={2}>
          <img src={personIcon} alt="personicon" />
        </Col>
        <Col sm={10} className="info-col-style">
          {props.meetingInfo.Participants.map((person, i) => (
            <div>
              <h5 key={i}>
                {person.Name},&nbsp;{person.Title}
              </h5>
            </div>
          ))}
        </Col>
      </Row>
      <Row className="info-meeting-description">
        <Col sm={2}>
          <img src={descriptionIcon} alt="description-icon" />
        </Col>
        <Col sm={10} className="info-col-style">
          <h5>{props.meetingInfo.Description}</h5>
        </Col>
      </Row>
    </Col>
  );
}

export default InfoView;
