import { useEffect, useState } from "react";

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = (e) => {
      window.requestAnimationFrame(function () {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };
    const body = document.querySelector("body");

    body.addEventListener("mousemove", setFromEvent);

    return () => {
      body.removeEventListener("mousemove", setFromEvent);
    };
  }, []);

  return position;
};

export default useMousePosition;
