import { useState, useEffect, useRef } from "react";
import "./VerticalTimeline.scss";
import User from "../User";

const VerticalTimeline = ({ events }) => {
  const [thumbPosition, setThumbPosition] = useState(0);
  const [activeChild, setActiveChild] = useState(0);
  const timelineRef = useRef(null);

  const handleThumbDrag = (event) => {
    const timeline = timelineRef.current;
    const timelineHeight = timeline.offsetHeight;
    const contentHeight = timeline.scrollHeight;
    const scrollableHeight = contentHeight - timelineHeight;
    const thumbOffset = timelineHeight / 2;
    const newPosition = event.clientY - timeline.offsetTop - thumbOffset;

    setThumbPosition(newPosition);
    timeline.scrollTop = (newPosition / timelineHeight) * scrollableHeight;

    const children = Array.from(timeline.children);
    const activeIndex = children.findIndex((child) => {
      const childTop = child.offsetTop;
      const childBottom = childTop + child.offsetHeight;
      return newPosition >= childTop && newPosition <= childBottom;
    });

    if (activeIndex !== -1) {
      setActiveChild(activeIndex);
    }
  };

  // const scrollToNextChild = () => {
  //   const timeline = timelineRef.current;
  //   const children = Array.from(timeline.children);
  //   const nextChild = children[activeChild + 1];

  //   if (nextChild) {
  //     const newPosition = nextChild.offsetTop;
  //     setThumbPosition(newPosition);
  //     timeline.scrollTop = newPosition;
  //     setActiveChild(activeChild + 1);
  //   }
  // };

  const handleContainerClick = (event) => {
    const timeline = timelineRef.current;
    const container = event.target;
    const containerTop = container.offsetTop;
    const containerHeight = container.offsetHeight;
    const timelineHeight = timeline.offsetHeight;
    const scrollableHeight = timeline.scrollHeight - timelineHeight;

    const newPosition = containerTop - (timelineHeight - containerHeight) / 2;
    setThumbPosition(newPosition);
    timeline.scrollTop = (newPosition / scrollableHeight) * timelineHeight;
  };

  useEffect(() => {
    const timeline = timelineRef.current;
    const timelineHeight = timeline.offsetHeight;
    const contentHeight = timeline.scrollHeight;
    const scrollableHeight = contentHeight - timelineHeight;

    setThumbPosition((timeline.scrollTop / scrollableHeight) * timelineHeight);
  }, []);

  return (
    <div className="verticaltimeline__event">
      <div
        // key={0}
        className="timeline-thumb"
        style={{ top: thumbPosition + "px" }}
        // onMouseDown={() => {
        //   document.addEventListener("mousemove", handleThumbDrag);
        //   document.addEventListener("mouseup", () => {
        //     document.removeEventListener("mousemove", handleThumbDrag);
        //   });
        // }}
      />
      {events.map((event, index) => (
        <div
          key={index}
          className={
            event.classname === "left"
              ? "verticaltimeline__event-left"
              : "verticaltimeline__event-right"
          }
          ref={timelineRef}
          onClick={handleContainerClick}
        >
          <div className="verticaltimeline__event-overlay"></div>
          <User data={event} />
        </div>
      ))}
      <div></div>
    </div>
  );
};

export default VerticalTimeline;
