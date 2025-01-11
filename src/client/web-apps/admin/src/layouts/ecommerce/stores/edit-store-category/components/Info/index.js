
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

function StoreInfo({setStoreCategory, storeCategory}) {

  return (
    <MDBox>
      <MDTypography variant="h5">Update Store Category</MDTypography>
      <MDBox mt={3}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <FormField type="text" label="id" value={storeCategory.id} disabled={true}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Name" value={storeCategory.name} onChange={(e) => setStoreCategory({...storeCategory, name: e.target.value})}/>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Description
              </MDTypography>
            </MDBox>
            <FormField type="text" label="Description" value={storeCategory.description} onChange={(e) => setStoreCategory({...storeCategory, description: e.target.value})}/>
          </Grid>
          
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default StoreInfo;
