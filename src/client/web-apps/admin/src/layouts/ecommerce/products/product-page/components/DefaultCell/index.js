
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";


import MDTypography from "components/MDTypography";

function DefaultCell({ children }) {
  return (
    <MDTypography variant="button" color="secondary">
      {children}
    </MDTypography>
  );
}

// Typechecking props for the DefaultCell
DefaultCell.propTypes = {
  children: PropTypes.string.isRequired,
};

export default DefaultCell;
