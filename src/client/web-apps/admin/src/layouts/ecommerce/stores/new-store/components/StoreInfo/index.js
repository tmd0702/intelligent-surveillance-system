
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

function StoreInfo({categories, setNewStore, newStore}) {
  return (
    <MDBox>
      <MDTypography variant="h5">Create Store</MDTypography>
      <MDBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Name" value={newStore.name} onChange={(e) => {setNewStore({...newStore, name: e.target.value})}}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Contact Number" value={newStore.contact_number} onChange={(e) => setNewStore({...newStore, contact_number: e.target.value})}/>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Description&nbsp;&nbsp;
                <MDTypography variant="caption" color="text">
                  (optional)
                </MDTypography>
              </MDTypography>
            </MDBox>
            <FormField type="text" value={newStore.description} onChange={(e) => setNewStore({...newStore, description: e.target.value})}/>
          </Grid> */}
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
              <Autocomplete
                //defaultValue="Clothing"
                value={newStore.category_id}
                options={categories.map(item => {
                  return {
                    id: item.id,
                    label: item.name
                  }
                })}
                onChange={(e, newValue) => {
                  setNewStore({
                    ...newStore,
                    category_id: newValue
                  })
                }}
                renderInput={(params) => <MDInput {...params} variant="standard" />}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default StoreInfo;
