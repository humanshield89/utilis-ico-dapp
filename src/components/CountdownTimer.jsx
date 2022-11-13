import { zeroPad } from "react-countdown";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export function getFormattedTimePeriod(timeInMillis) {
  const timeInSeconds = timeInMillis / 1000;
  const months = Math.floor(timeInSeconds / 3600 / 24 / 30);
  const days = Math.floor(
    (timeInSeconds - months * 30 * 24 * 3600) / 3600 / 24
  );
  const hours = Math.floor(
    (timeInSeconds - days * 24 * 3600 - months * 30 * 24 * 3600) / 3600
  );
  const minutes = Math.floor(
    (timeInSeconds -
      hours * 3600 -
      days * 24 * 3600 -
      months * 30 * 24 * 3600) /
      60
  );
  const seconds = Math.floor(
    timeInSeconds -
      months * 3600 * 30 * 24 -
      days * 3600 * 24 -
      hours * 3600 -
      minutes * 60
  );

  return {
    months,
    days,
    hours,
    minutes,
    seconds,
  };
}

/**
 *
 * @param date{Number} - unix datetime in seconds
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CountdownTimer = ({ date, ...props }) => {
  const [{ days, hours, minutes, seconds }, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // print every second with cleanup
    const interval = setInterval(() => {
      setTime(getFormattedTimePeriod(date * 1000 - Date.now()));
    }, 1000);
    return () => clearInterval(interval);
  }, [date]);
  return (
    <CountDownComponent
      hours={hours}
      minutes={minutes}
      seconds={seconds}
      days={days}
      {...props}
    />
  );
};

CountdownTimer.propTypes = {
  date: PropTypes.number.isRequired,
};

export default CountdownTimer;

const CountDownComponent = ({ hours, minutes, seconds, days }) => {
  days = days ? days : 0;
  hours = hours ? hours : 0;
  minutes = minutes ? minutes : 0;
  seconds = seconds ? seconds : 0;
  return (
    <Box
      sx={{
        mt: 2,
        mb: 2,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <TimeBox text={days} unit={"D"} />
      <TwoDots />
      <TimeBox text={hours} unit={"H"} />
      <TwoDots />
      <TimeBox text={minutes} unit={"M"} />
      <TwoDots />
      <TimeBox text={seconds} unit={"S"} />
    </Box>
  );
};

CountDownComponent.propTypes = {
  hours: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  days: PropTypes.number.isRequired,
};

const TwoDots = () => {
  return (
    <Typography
      variant={"h2"}
      sx={{
        textAlign: "center",
        p: 1,
        pt: 2,
        pb: 2,
        lineHeight: 1,
        borderRadius: "8px",
        fontFamily: "monospace",
      }}
    >
      :
    </Typography>
  );
};

const TimeBox = ({ text, unit }) => {
  return (
    <Box>
      <Typography
        variant={"h2"}
        sx={{
          textAlign: "center",
          fontSize: "1em!important",
          p: 2,
          lineHeight: 1,
          borderRadius: "8px",
          fontFamily: "monospace",
          backgroundColor: (theme) => theme.palette.background.paper + "ff",
        }}
      >
        {zeroPad(text)}
      </Typography>
      <Typography variant={"h6"}>{unit ? unit : "days"}</Typography>
    </Box>
  );
};

TimeBox.propTypes = {
  text: PropTypes.number.isRequired,
  unit: PropTypes.string,
};
