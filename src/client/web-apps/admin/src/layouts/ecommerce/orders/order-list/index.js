import { useState } from "react";

import { useEffect } from "react";
import * as UserServices from 'services/UserServices';
import * as OrderServices from 'services/OrderServices';
import * as StoreServices from 'services/StoreServices';

import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";


import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DModal from "components/DModal";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import New from "../new-order";
import View from "../view-order";
import Loading from 'components/Loading';
// Data
import * as ItemsServices from 'services/ItemServices';
import dataTableData from "./data/dataTableData";

function OrderList() {
  const [menu, setMenu] = useState(null);
  const [stores, setStores] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalPage, setModalPage] = useState();
  const [openModal, setOpenModal] = useState(false);
  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  useEffect(() => {
      const getOrdersPromise = OrderServices.getOrders();
      const getStoresPromise = StoreServices.getStores();
      Promise.all([getOrdersPromise, getStoresPromise]).then(async (results) => { 
        if (results[0]?.success) {
          const mappedOrder = results[0].data;
          // const mapUserPromise = results[0].data.map(async (order) => {
          //   const user = order.user_id? await UserServices.getUserById(order.user_id).data[0] : {};
          //   return {
          //     ...order,
          //     user
          //   }
            
          // })
          // const mappedOrder = await Promise.all(mapUserPromise);
          setOrders(mappedOrder);
          dataTableData.rows = mappedOrder;
        }
        if (results[1]?.success) {
          setStores(results[1].data);
        }
        setLoading(false);
      })
  }, []);
  const handleClickAdd = () => {
    setModalPage(<New handleClickView={handleClickView} stores={stores} list={orders} setList={setOrders}/>)
    setOpenModal(true);
  }
  const handleClickView = (detail) => {
    console.log('detail', detail);
    setModalPage(<View rdetail={detail} handleClickUpdate={handleClickUpdate}/>)
    setOpenModal(true);
  }
  const handleClickUpdate = (detail) => {

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
            new order
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
  else if (loading) return <Loading />;
}

export default OrderList;
