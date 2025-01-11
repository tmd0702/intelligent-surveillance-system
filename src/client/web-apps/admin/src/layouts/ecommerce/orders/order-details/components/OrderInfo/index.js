
// @mui material components
import Grid from "@mui/material/Grid";


import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

function OrderInfo({items, detail}) {
  console.log('items', items)
  return (

    <div style={{maxHeight: '100px', width: '100%', overflowY: 'scroll', backgroundColor: '#eee', paddingLeft: 10, paddingRight: 10}}>
      {items.map(item => <Grid container spacing={3} alignItems='center'>
      <Grid mt={2} item xs={12} md={6}>
        <MDBox display="flex" alignItems="center">
          <MDBox lineHeight={1}>
            <MDTypography variant="h6" fontWeight="medium">
              {item.name}
            </MDTypography>
            {/* <MDBadge
              mb={2}
              variant="gradient"
              color="success"
              size="xs"
              badgeContent={detail.status}
              container
            /> */}
          </MDBox>
        </MDBox>
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
        <MDButton variant="gradient" color="dark" size="small">
          ${item.price}
        </MDButton>
        <MDTypography ml={2} variant="button" color="text">
            x {item.quantity}
          </MDTypography>
      </Grid>
      </Grid>)}
      
    </div>
    
  );
}

export default OrderInfo;
