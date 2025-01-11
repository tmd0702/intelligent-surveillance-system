import { useState } from "react";

import { useEffect } from "react";
import * as StoreCategoryServices from 'services/StoreCategoryServices';
import * as StoreServices from 'services/StoreServices';

// @mui material components
import Card from "@mui/material/Card";
import DModal from "components/DModal";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import UpdateStoreCategory from "../edit-store-category";
import ViewStoreCategory from "../view-store-category";
import NewStoreCategory from "../new-store-category";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";


import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import Loading from "components/Loading";
// Data
import dataTableData from "layouts/ecommerce/stores/store-category-list/data/dataTableData";

function StoreCategoryList() {
  const [modalPage, setModalPage] = useState();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);
  useEffect(() => {
    const getCategoriesPromise = StoreCategoryServices.getStoreCategories();
    Promise.all([getCategoriesPromise]).then(results => {
      if (results[0]?.success) {
        setCategories(results[0].data);
        dataTableData.rows = results[0].data;
      }
      setLoading(false);
    })

  }, [])
  const handleClickAdd = () => {
    setModalPage(<NewStoreCategory categories={categories} setCategories={setCategories} handleClickView={handleClickView}/>)
    setOpenModal(true);
  }
  const handleClickUpdate = (detail) => {
    setModalPage(<UpdateStoreCategory storeCategory={detail} handleClickView={handleClickView}/>)
    setOpenModal(true);
  }
  const handleClickView = (detail) => {
    setModalPage(<ViewStoreCategory storeCategory={detail} handleClickUpdate={handleClickUpdate}/>)
    setOpenModal(true);
  }
  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      <MenuItem onClick={closeMenu}>Status: Paid</MenuItem>
      <MenuItem onClick={closeMenu}>Status: Refunded</MenuItem>
      <MenuItem onClick={closeMenu}>Status: Canceled</MenuItem>
      <Divider sx={{ margin: "0.5rem 0" }} />
      <MenuItem onClick={closeMenu}>
        <MDTypography variant="button" color="error" fontWeight="regular">
          Remove Filter
        </MDTypography>
      </MenuItem>
    </Menu>
  );

  if (!loading) return (
    <DashboardLayout>
      <DModal open={openModal} setOpen={setOpenModal} pageContent={modalPage}/>
      <DashboardNavbar />
      <MDBox my={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <MDButton variant="gradient" color="info" onClick={handleClickAdd}>
            new store category
          </MDButton>
          <MDBox display="flex">
            <MDButton variant={menu ? "contained" : "outlined"} color="dark" onClick={openMenu}>
              filters&nbsp;
              <Icon>keyboard_arrow_down</Icon>
            </MDButton>
            {renderMenu}
            <MDBox ml={1}>
              <MDButton variant="outlined" color="dark">
                <Icon>description</Icon>
                &nbsp;export csv
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
        <Card>
          <DataTable handleClick={handleClickView} table={dataTableData} entriesPerPage={false} canSearch />
        </Card>
      </MDBox>
      
    </DashboardLayout>
  );
  else return <Loading />
}

export default StoreCategoryList;
