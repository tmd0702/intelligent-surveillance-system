
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

function Info({setInfo, info, stores, categories}) {

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
            <FormField type="text" label="Price" value={info.price} onChange={(e) => {setInfo({...info, price: e.target.value})}}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Sale Price" value={info.sale_price} onChange={(e) => setInfo({...info, sale_price: e.target.value})}/>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Stock" value={info.stock} onChange={(e) => {setInfo({...info, stock: e.target.value})}}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Description" value={info.description} onChange={(e) => {setInfo({...info, description: e.target.value})}}/>
          </Grid>
        </Grid>
      </MDBox>
      
      <MDBox mt={2}>
        <Grid container spacing={3}>
          
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
                value={info.category_id.id? info.category_id : info.category}
                options={categories.map(item => {
                  return {
                    id: item.id,
                    label: item.name
                  }
                })}
                onChange={(e, newValue) => {
                  setInfo({
                    ...info,
                    category_id: newValue
                  })
                }}
                renderInput={(params) => <MDInput {...params} variant="standard" />}
              />
            </MDBox>
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
                  Store
                </MDTypography>
              </MDBox>
              <Autocomplete
                //defaultValue="Clothing"
                value={info.store_id.id? info.store_id : info.store}
                options={stores.map(item => {
                  return {
                    id: item.id,
                    label: item.name
                  }
                })}
                onChange={(e, newValue) => {
                  setInfo({
                    ...info,
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

export default Info;
