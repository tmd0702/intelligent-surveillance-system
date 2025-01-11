

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function OrderSummary({detail, items}) {
  return (
    <>
      <MDBox mb={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Order Summary
        </MDTypography>
      </MDBox>
      <MDBox display="flex" justifyContent="space-between" mb={0.5}>
        <MDTypography variant="button" fontWeight="regular" color="text">
          Product Price:
        </MDTypography>
        <MDBox ml={1}>
          <MDTypography variant="body2" fontWeight="medium">
            ${Math.round(detail.total_amount * 100, 2) / 100}
          </MDTypography>
        </MDBox>
      </MDBox>
   
      <MDBox display="flex" justifyContent="space-between" mb={0.5}>
        <MDTypography variant="button" fontWeight="regular" color="text">
          Taxes:
        </MDTypography>
        <MDBox ml={1}>
          <MDTypography variant="body2" fontWeight="medium">
            $0
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" justifyContent="space-between" mt={3}>
        <MDTypography variant="body1" fontWeight="light" color="text">
          Total:
        </MDTypography>
        <MDBox ml={1}>
          <MDTypography variant="body1" fontWeight="medium">
            ${Math.round(detail.total_amount * 100, 2) / 100}
          </MDTypography>
        </MDBox>
      </MDBox>
    </>
  );
}

export default OrderSummary;
