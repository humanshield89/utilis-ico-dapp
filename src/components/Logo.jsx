import PropTypes from "prop-types";

const logo = new URL("../../public/home-logo.webp", import.meta.url).href;

const Logo = ({ width, height }) => {
  return (
    <img
      src={logo}
      alt="Logo"
      width={width ? width : 164}
      height={height ? height : 48}
    />
  );
};

Logo.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Logo;
