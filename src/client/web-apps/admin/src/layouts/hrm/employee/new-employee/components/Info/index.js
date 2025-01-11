
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

function Info({setInfo, info, departments}) {
  return (
    <MDBox>
      <MDTypography variant="h5">Create Employee</MDTypography>
      <MDBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Code" value={info.employee_code} onChange={(e) => {setInfo({...info, employee_code: e.target.value})}}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Position" value={info.position} onChange={(e) => setInfo({...info, position: e.target.value})}/>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="First Name" value={info.first_name} onChange={(e) => {setInfo({...info, first_name: e.target.value})}}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Last Name" value={info.last_name} onChange={(e) => setInfo({...info, last_name: e.target.value})}/>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Phone Number" value={info.phone_number} onChange={(e) => {setInfo({...info, phone_number: e.target.value})}}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="date" label="DOB" value={info.dob} onChange={(e) => {setInfo({...info, dob: e.target.value})}}/>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Gender" value={info.gender} onChange={(e) => {setInfo({...info, gender: e.target.value})}}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Email" value={info.email} onChange={(e) => {setInfo({...info, email: e.target.value})}}/>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Address" value={info.address} onChange={(e) => {setInfo({...info, address: e.target.value})}}/>
          </Grid>
          <Grid item xs={12} sm={6}>
          <MDTypography
            component="label"
            variant="button"
            fontWeight="regular"
            color="text"
            textTransform="capitalize"
          >
            Department
          </MDTypography>
              
          <Autocomplete
                //defaultValue="Clothing"
                value={info.department_id}
                options={departments.map(item => {
                  return {
                    id: item.id,
                    label: item.name
                  }
                })}
                onChange={(e, newValue) => {
                  setInfo({
                    ...info,
                    department_id: newValue
                  })
                }}
                renderInput={(params) => <MDInput {...params} variant="standard" />}
              />
          </Grid>
          
        </Grid>
      </MDBox>
      
    </MDBox>
  );
}

export default Info;
