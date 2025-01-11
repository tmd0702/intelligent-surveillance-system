
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

function Info({info}) {
  // const []
  return (
    <MDBox>
      <MDTypography variant="h5">View Product</MDTypography>
      <MDBox mt={3}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                ID
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{info.id}</MDTypography>
          </Grid>
        <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Name
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{info.name}</MDTypography>
          </Grid>
          
          
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                SKU
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{info.sku}</MDTypography>
          </Grid>
        <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Description
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{info.description}</MDTypography>
          </Grid>
          
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Price
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{info.price}</MDTypography>
          </Grid>
        <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Sale Price
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{info.sale_price}</MDTypography>
          </Grid>
          
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Store
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{info.store}</MDTypography>
          </Grid>
        <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Category
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{info.category}</MDTypography>
          </Grid>
          
        </Grid>
      </MDBox>
      
    </MDBox>
  );
}

export default Info;
