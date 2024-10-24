import { useState, useRef } from "react";
import "./styles.css";

const images = [
  "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

export default function App() {
  const [logs, setLogs] = useState([]);
  const dragStartRef = useRef(null);
  const handleDragStart = (evt, index) => {
    dragStartRef.current = {
      x: evt.clientX,
      y: evt.clientY,
    };
  };
  const handleDragEnd = (evt, index) => {
    const { clientX, clientY } = evt;
    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;
    let direction = "";
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        direction = "right";
      } else {
        direction = "left";
      }
    } else {
      if (deltaY > 0) {
        direction = "down";
      } else {
        direction = "up";
      }
    }
    const log = {
      index,
      from: dragStartRef.current,
      to: { x: clientX, y: clientY },
      message: `swiped image ${direction} on ${index}`,
    };
    setLogs((logs) => [...logs, log]);
    dragStartRef.current = null;
  };
  return (
    <div className="App">
      <h1>Swiper Example</h1>
      <div className="flex align-center">
        {images.map((image, index) => (
          <div
            key={index}
            onDragStart={(evt) => handleDragStart(evt, index)}
            onDragEnd={(evt) => handleDragEnd(evt, index)}
          >
            <img src={image} className="w-200px" />
          </div>
        ))}
      </div>
      <div>
        {logs.map((log, index) => (
          <div key={index}>{log.message}</div>
        ))}
      </div>
    </div>
  );
}
