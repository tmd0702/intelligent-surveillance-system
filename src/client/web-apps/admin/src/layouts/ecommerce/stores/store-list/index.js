import { useState } from "react";

import { useEffect } from "react";
import * as StoreCategoryServices from 'services/StoreCategoryServices';
import * as StoreServices from 'services/StoreServices';
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";


import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";


import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import DModal from "components/DModal";
import UpdateStore from "../edit-store";
import NewStore from "../new-store";
import ViewStore from "../view-store";
import Loading from 'components/Loading';
// Data
import dataTableData from "layouts/ecommerce/stores/store-list/data/dataTableData";

function StoreList() {
  const [menu, setMenu] = useState(null);
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalPage, setModalPage] = useState();
  const [openModal, setOpenModal] = useState(false);
  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  useEffect(() => {
    const getStoresPromise = StoreServices.getStores();
    Promise.all([getStoresPromise]).then(results => {
      if (results[0]?.success) {
        setStores(results[0].data);
        dataTableData.rows = results[0].data;
      }
      setLoading(false);
    })

  }, [])
  const handleClickAdd = () => {
    setModalPage(<NewStore handleClickView={handleClickView} stores={stores} setStores={setStores}/>)
    setOpenModal(true);
  }
  const handleClickUpdate = (detail) => {
    setModalPage(<UpdateStore store={detail} handleClickView={handleClickView}/>)
    setOpenModal(true);
  }
  const handleClickView = (detail) => {
    console.log('detail', detail);
    setModalPage(<ViewStore store={detail} handleClickUpdate={handleClickUpdate}/>)
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
            new store
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

export default StoreList;
