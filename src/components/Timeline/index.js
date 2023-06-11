import { EventsData } from "../../data/eventsData";
import VerticalTimeline from "../VerticalTimeline";
import "./Timeline.scss";

const Timeline = () => {
  EventsData.map((el, index) => {
    return index % 2 === 0 ? (el.classname = "left") : (el.classname = "right");
  });

  return (
    <main className="timeline">
      <div className="timeline__header">
        <label className="timeline__header-label">Events</label>
      </div>
      <div className="timeline__body">
        {EventsData && <VerticalTimeline events={EventsData} />}
      </div>
      <div className="timeline__footer"></div>
    </main>
  );
};

export default Timeline;
