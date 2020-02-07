import React from "react";

//creates more rows with rowspan depending on how long the meeting is going to last
function getRowSpan(duration) {
  let rowSpan = duration / 30;
  return rowSpan;
}

function Scheduler(props) {
  //checks that meetings start time matches to the right timerow
  //and shows the meeting info on that row
  if (props.meetingInfo.StartTime === props.time) {
    return (
      <td
        onClick={() => props.click(props.meetingInfo)}
        className="td-info"
        rowSpan={getRowSpan(props.meetingInfo.Duration)}
      >
        <div style={{ cursor: "pointer" }}>
          {props.meetingInfo.Subject}, {props.meetingInfo.Organizer}
        </div>
      </td>
    ); //otherwise just empty row
  } else return <></>;
}

export default Scheduler;
