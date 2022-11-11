import Countdown, { zeroPad } from "react-countdown";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

/*
                <span style={{ fontFamily: "monospace" }}>
          {zeroPad(days)}D {zeroPad(hours)}H {zeroPad(minutes)}M{" "}
                    {zeroPad(seconds)}S
        </span>
* */
/**
 *
 * @param date{Number} - unix datetime in seconds
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CountdownTimer = ({ date, ...props }) => {
  return (
    <Countdown
      renderer={({ hours, minutes, seconds, days }) => (
        <CountDownComponent
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          days={days}
        />
      )}
      date={new Date(Number(date) * 1000)}
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
