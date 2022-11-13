import { Helmet, HelmetProvider } from "react-helmet-async";
import PropTypes from "prop-types";

const Page = ({ children, title, description }) => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{`${process.env.SITE_TITLE}: ${title}`}</title>
          <meta name="description" content={description} />
        </Helmet>
        {children}
      </HelmetProvider>
    </>
  );
};

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Page;
