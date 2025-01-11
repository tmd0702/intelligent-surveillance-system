
import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";


import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDEditor from "components/MDEditor";
import MDInput from "components/MDInput";
// NewProduct page components
import FormField from "../FormField";

function StoreInfo({categories, store}) {
  // const []
  return (
    <MDBox>
      <MDTypography variant="h5">View Store</MDTypography>
      <MDBox mt={3}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                ID
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{store.id}</MDTypography>
          </Grid>
        <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Name
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{store.name}</MDTypography>
          </Grid>
          
          
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Contact Number
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{store.contact_number}</MDTypography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDBox mb={3}>
              <MDBox mb={2} display="inline-block">
                <MDTypography
                  component="label"
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  textTransform="capitalize"
                >
                  Category
                </MDTypography>
              </MDBox>
              <MDTypography type="text">{store.category}</MDTypography>
              
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default StoreInfo;
