
import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";


import { useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDEditor from "components/MDEditor";
import MDInput from "components/MDInput";
// NewProduct page components
import FormField from "../FormField";

function StoreInfo({setNewStoreCategory, newStoreCategory}) {
  return (
    <MDBox>
      <MDTypography variant="h5">Create Store Category</MDTypography>
      <MDBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Name" value={newStoreCategory.name} onChange={(e) => {setNewStoreCategory({...newStoreCategory, name: e.target.value})}}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Description" value={newStoreCategory.description} onChange={(e) => setNewStoreCategory({...newStoreCategory, description: e.target.value})}/>
          </Grid>
        </Grid>
      </MDBox>
      
    </MDBox>
  );
}

export default StoreInfo;
