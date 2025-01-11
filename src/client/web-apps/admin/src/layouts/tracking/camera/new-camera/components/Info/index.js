
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

function Info({locations, setInfo, info}) {
  return (
    <MDBox>
      <MDTypography variant="h5">Create Camera</MDTypography>
      <MDBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Name" value={info.name} onChange={(e) => {setInfo({...info, name: e.target.value})}}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Description" value={info.description} onChange={(e) => setInfo({...info, description: e.target.value})}/>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="IP Address" value={info.ip_address} onChange={(e) => {setInfo({...info, ip_address: e.target.value})}}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Description" value={info.description} onChange={(e) => setInfo({...info, description: e.target.value})}/>
          </Grid>
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
                  Location
                </MDTypography>
              </MDBox>
              <Autocomplete
                //defaultValue="Clothing"
                value={info.location_id}
                options={locations.map(item => {
                  return {
                    id: item.id,
                    label: item.name
                  }
                })}
                onChange={(e, newValue) => {
                  setInfo({
                    ...info,
                    location_id: newValue
                  })
                }}
                renderInput={(params) => <MDInput {...params} variant="standard" />}
              />
            </MDBox>
          </Grid>
      </MDBox>
      
    </MDBox>
  );
}

export default Info;
