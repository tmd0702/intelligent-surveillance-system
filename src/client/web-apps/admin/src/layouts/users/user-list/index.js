import { useState, useRef } from "react";

import { useEffect } from "react";
import * as ItemServices from 'services/ItemServices';
import * as ItemCategoryServices from 'services/ItemCategoryServices';
import * as StoreServices from 'services/StoreServices';
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import {CSVLink, CSVDownload} from 'react-csv';

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import New from "../new-user";
import Edit from "../edit-user";
import View from "../view-user";
import DModal from "components/DModal";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import * as UserServices from 'services/UserServices';
import Loading from 'components/Loading';
// Data
import dataTableData from "./data/dataTableData";

function UserList() {
  const [menu, setMenu] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [modalPage, setModalPage] = useState();
  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);
  const [csvData, setCsvData] = useState([]);
  const csvLink = useRef(null);
  const exportCsv = (event) => {
    UserServices.getUsers().then(result => {
      if (result.success) {
        setCsvData(result.data);
        setTimeout(() => {csvLink.current?.link.click();}, 0)
      }
    })
  }
  useEffect(() => {
    const getUsersPromise = UserServices.getUsers();  
    Promise.all([getUsersPromise]).then(results => {
      if (results[0]?.success) {
        setUsers(results[0].data);
        dataTableData.rows = results[0].data;
      }
      
      setLoading(false);
    })

  }, [])
  const handleClickAdd = () => {
    setModalPage(<New setList={setUsers} list={users} handleClickView={handleClickView}/>)
    setOpenModal(true);
  }
  const handleClickUpdate = (detail) => {
    setModalPage(<Edit info={detail} handleClickView={handleClickView}/>)
    setOpenModal(true);
  }
  const handleClickView = (detail) => {
    setModalPage(<View info={detail} handleClickUpdate={handleClickUpdate}/>)
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
            new user
          </MDButton>
          <MDBox display="flex">
            <MDButton variant={menu ? "contained" : "outlined"} color="dark" onClick={openMenu}>
              filters&nbsp;
              <Icon>keyboard_arrow_down</Icon>
            </MDButton>
            {renderMenu}
            <MDBox ml={1}>
              <MDButton onClick={exportCsv} variant="outlined" color="dark">
                <Icon>description</Icon>
                &nbsp;export csv
              </MDButton>
              <CSVLink
                data={csvData}
                filename="users.csv"
                className="hidden"
                ref={csvLink}
                target="_blank"
              />
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

export default UserList;
