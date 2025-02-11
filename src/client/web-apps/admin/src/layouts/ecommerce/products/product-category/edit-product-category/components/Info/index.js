
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

function Info({setInfo, info}) {

  return (
    <MDBox>
      <MDTypography variant="h5">Update Location</MDTypography>
      <MDBox mt={3}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <FormField type="text" label="ID" value={info.id} disabled={true}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Name" value={info.name} onChange={(e) => setInfo({...info, name: e.target.value})}/>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <FormField type="text" label="Description" value={info.description} onChange={(e) => setInfo({...info, description: e.target.value})}/>
          </Grid>
          
        </Grid>
      </MDBox>
      
      
    </MDBox>
  );
}

export default Info;
