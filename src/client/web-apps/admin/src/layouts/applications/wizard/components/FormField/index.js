
// prop-type is a library for typechecking of props
import PropTypes from "prop-types";


import MDInput from "components/MDInput";

function FormField({ label, ...rest }) {
  return <MDInput variant="standard" label={label} fullWidth {...rest} />;
}

// typechecking props for FormField
FormField.propTypes = {
  label: PropTypes.string.isRequired,
};

export default FormField;
