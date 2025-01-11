import { useState } from "react";

import { useEffect } from "react";
import * as EmployeeServices from 'services/EmployeeServices';
import * as DepartmentServices from 'services/DepartmentServices';
// @mui material components
import DModal from "components/DModal";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import New from "../new-employee";
import Edit from "../edit-employee";
import Loading from 'components/Loading';
import View from "../view-employee";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";


import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import dataTableData from "./data/dataTableData";

function EmployeeList() {
  const [menu, setMenu] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [modalPage, setModalPage] = useState();
  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);
  const handleClickAdd = () => {
    setModalPage(<New departments={departments} setList={setEmployees} list={employees} handleClickView={handleClickView}/>)
    setOpenModal(true);
  }
  const handleClickUpdate = (detail) => {
    setModalPage(<Edit departments={departments} info={detail} handleClickView={handleClickView}/>)
    setOpenModal(true);
  }
  const handleClickView = (detail) => {
    setModalPage(<View info={detail} handleClickUpdate={handleClickUpdate}/>)
    setOpenModal(true);
  }
  useEffect(() => {
    const getEmployeesPromise = EmployeeServices.getEmployees();
    const getDepartmentsPromise = DepartmentServices.getDepartments();
    Promise.all([getEmployeesPromise, getDepartmentsPromise]).then(results => {
      if (results[0]?.success) {
        setEmployees(results[0].data);
        dataTableData.rows = results[0].data;
      }
      if (results[1]?.success) {
        setDepartments(results[1].data);
      }
      setLoading(false);
    })

  }, [])

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
          <MDButton onClick={handleClickAdd} variant="gradient" color="info">
            new employee
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

export default EmployeeList;
