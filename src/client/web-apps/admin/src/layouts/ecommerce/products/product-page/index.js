
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";


import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";


import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// ProductPage page components
import ProductImages from "layouts/ecommerce/products/product-page/components/ProductImages";
import ProductInfo from "layouts/ecommerce/products/product-page/components/ProductInfo";

// Data
import dataTableData from "layouts/ecommerce/products/product-page/data/dataTableData";
import { useState, useEffect } from "react";
import * as StoreServices from '../../../../services/StoreServices';
import * as ItemCategoryServices from '../../../../services/ItemCategoryServices';
import * as ItemServices from '../../../../services/ItemServices';

function ProductPage({details}) {
  useEffect(() => {
    const getCategoriesPromise = ItemCategoryServices.getItemCategories();
    const getStoresPromise = StoreServices.getStores();

    Promise.all([getCategoriesPromise, getStoresPromise]).then(results => {
      if (results[0]?.success) {
        details.category = results[0].data.filter(item => item.id == details.category_id).name;
      }
      if (results[1]?.success) {
        details.stores = results[1].data.filter(item => item.id == details.store_id).name;
      }

    })

  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Card sx={{ overflow: "visible" }}>
          <MDBox p={3}>
            <MDBox mb={3}>
              <MDTypography variant="h5" fontWeight="medium">
                Product Details
              </MDTypography>
            </MDBox>

            <Grid container spacing={3}>
              <Grid item xs={12} lg={6} xl={5}>
                <ProductImages details={details}/>
              </Grid>
              <Grid item xs={12} lg={5} sx={{ mx: "auto" }}>
                <ProductInfo details={details}/>
              </Grid>
            </Grid>

            {/* <MDBox mt={8} mb={2}>
              <MDBox mb={1} ml={2}>
                <MDTypography variant="h5" fontWeight="medium">
                  Other Products
                </MDTypography>
              </MDBox>
              <DataTable
                table={dataTableData}
                entriesPerPage={false}
                showTotalEntries={false}
                isSorted={false}
              />
            </MDBox> */}
          </MDBox>
        </Card>
      </MDBox>
      
    </DashboardLayout>
  );
}

export default ProductPage;
