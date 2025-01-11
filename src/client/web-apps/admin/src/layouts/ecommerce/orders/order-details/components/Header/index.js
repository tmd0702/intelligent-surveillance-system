

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function Header({detail, store}) {
  return (
    <MDBox display="flex" justifyContent="space-between" alignItems="center">
      <MDBox>
        <MDBox style={{display: 'flex', justifyContent: 'space-between'}} mb={1}>
          <MDTypography variant="h6" fontWeight="medium">
            Order Details
          </MDTypography>
        </MDBox>
        <MDTypography component="p" variant="button" color="text">
          Order no. <b>{detail.id}</b> 
        </MDTypography>
        <MDTypography component="p" variant="button" fontWeight="regular" color="text">
        from <b>{detail.created_at}</b>
        </MDTypography>
      </MDBox>
      <MDTypography fontStyle="italic" variant="h6" fontWeight="0">
          {store.name}
        </MDTypography>
      {/* <MDButton variant="gradient" color="dark">
        invoice
      </MDButton> */}
    </MDBox>
  );
}

export default Header;
