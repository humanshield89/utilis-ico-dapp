import React, { useEffect } from "react";
import useMousePosition from "../hooks/useMousePosition";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

const MouseRotatedCard = ({ children, denominator, maxAngle, ...rest }) => {
  const cardRef = React.useRef(null);
  const position = useMousePosition();
  const element = cardRef.current;

  function transformElement(x, y) {
    const element = cardRef.current;
    let box = element.getBoundingClientRect();
    let calcX = -(y - box.y - box.height / 2) / denominator;
    let calcY = (x - box.x - box.width / 2) / denominator;
    maxAngle = maxAngle ? maxAngle : 3.5;
    if (Math.abs(calcX) > maxAngle)
      calcX = (maxAngle * calcX) / Math.abs(calcX);
    if (Math.abs(calcY) > maxAngle)
      calcY = (maxAngle * calcY) / Math.abs(calcY);

    element.style.transform =
      "perspective(1200px)" +
      "rotateX(" +
      calcX +
      "deg) " +
      "rotateY(" +
      calcY +
      "deg)" +
      " scale3d(1, 1, 1)";
  }

  useEffect(() => {
    transformElement(position.x, position.y);
  }, [position]);

  useEffect(() => {
    window.addEventListener("mouseleave", () => {
      window.requestAnimationFrame(function () {
        element.style.transform = "rotateX(0) rotateY(0)";
      });
    });

    return () => {
      window.removeEventListener("mouseleave", () => {
        window.requestAnimationFrame(function () {
          element.style.transform = "rotateX(0) rotateY(0)";
        });
      });
    };
  }, []);

  return (
    <Box ref={cardRef} {...rest}>
      {children}
    </Box>
  );
};

MouseRotatedCard.propTypes = {
  children: PropTypes.node,
  denominator: PropTypes.number,
  maxAngle: PropTypes.number,
};

export default MouseRotatedCard;
