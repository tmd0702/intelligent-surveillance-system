
import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";


import { useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDEditor from "components/MDEditor";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import * as ItemsServices from 'services/ItemServices'; 
// NewProduct page components
import FormField from "../FormField";

function Info({stores, setInfo, info, selectedItems, setSelectedItems}) {
  const [items, setItems] = useState([]);
  const [currentSelectedItem, setCurrentSelectedItem] = useState();
  const [currentQuantity, setCurrentQuantity] = useState(0);

  const getItems = async (storeId) => {
    ItemsServices.getItemByStoreId(storeId).then(result => {
      
      if (result?.success) {
        setItems(result.data);
      }
    })
  }
  const handleAdd = () => {
    if (currentSelectedItem && currentQuantity) {
        setInfo({...info, total_amount: info.total_amount + Number(items.filter(item => item.id == currentSelectedItem.id)[0].sale_price) * Number(currentQuantity)});
        const isItemExists = selectedItems.filter(item => item.item.id == currentSelectedItem.id).length > 0;
        if (!isItemExists) setSelectedItems([...selectedItems, {quantity: Number(currentQuantity), item: currentSelectedItem, price: currentSelectedItem.price}]);
        else {
          setSelectedItems(selectedItems.map(item => {
            if (item.item.id == currentSelectedItem.id) {
              item.quantity += Number(currentQuantity);
            }
            return item;
          }));
        }
        setCurrentSelectedItem();
        setCurrentQuantity(0);
        
    }
  }

  return (
    <MDBox>
      <MDTypography variant="h5">Create Order</MDTypography>
      <MDBox mt={3}>
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
                  Store
                </MDTypography>
              </MDBox>
              <Autocomplete
                options={stores.map(item => {
                  return {
                    id: item.id,
                    label: item.name
                  }
                })}
                onChange={(e, newValue) => {
                  setInfo({
                    ...info,
                    store_id: newValue
                  });
                  getItems(newValue.id);
                  // setSelectedItems([...selectedItems, newValue.id]);
                }}
                renderInput={(params) => <MDInput {...params} variant="standard" />}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Total Amount
              </MDTypography>
            </MDBox>
            <MDTypography type="text">{info.total_amount}</MDTypography>
          </Grid>
        </Grid>
      </MDBox>
      {selectedItems.map((item, index) => {
        return <MDBox mt={2}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            {index == 0 && <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Item
              </MDTypography>
            </MDBox>}
            <MDTypography type="text">{item.item.label}</MDTypography>
          </Grid>
        <Grid item xs={12} sm={6}>
            {index == 0 && <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Quantity
              </MDTypography>
            </MDBox>}
            <MDTypography type="text">{item.quantity}</MDTypography>
          </Grid>
          
          
        </Grid>
      </MDBox>
      })}
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
                  Item
                </MDTypography>
              </MDBox>
              <Autocomplete
                //defaultValue="Clothing"
                value={currentSelectedItem}
                options={items.map(item => {
                  return {
                    id: item.id,
                    label: item.name,
                    price: item.price
                  }
                })}
                onChange={(e, newValue) => {
                  if (currentQuantity == undefined) setCurrentQuantity(0);
                  setCurrentSelectedItem(newValue);
                  // setSelectedItems([...selectedItems, newValue.id]);
                }}
                renderInput={(params) => <MDInput {...params} variant="standard" />}
              />
              
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDBox mb={3}>
              <MDBox mb={0} display="inline-block">
                <MDTypography
                  component="label"
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  textTransform="capitalize"
                >
                  Quantity
                </MDTypography>
              </MDBox>
              <FormField type="text" label="Quantity" value={currentQuantity} onChange={(e) => setCurrentQuantity(e.target.value)}/>
              
            </MDBox>
          </Grid>
       
          <MDButton
            variant="gradient"
            color="dark"
            onClick={handleAdd}
          >
            {"add"}
          </MDButton>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default Info;
