import { useMemo, useState } from "react";
import { Autocomplete } from "@mui/material";
import { useEffect } from "react";
import * as CamerasServices from 'services/CameraServices';
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import FormField from "layouts/applications/wizard/components/FormField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import * as FinderServices from 'services/FinderServices';

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import {registerOnViewerCallback} from 'services/WebSocketServices';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDInput from "components/MDInput";
// Data
import dataTableData from "./data/dataTableData";

function Viewer() {
  const [tableData, setTableData] = useState(dataTableData);
  const [menu, setMenu] = useState(null);
  const [selected, setSelected] = useState();
  const [cameras, setCameras] = useState([]);
  const [frame, setFrame] = useState();
  const [loading, setLoading] = useState(true);
  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);
  const onMessageReceived = (receivedData) => {
    if (selected !== undefined && `camera.streaming.${selected?.floor_number.toLowerCase()}` == receivedData.event) {
      setFrame('data:image/jpeg;base64,' + receivedData.data)
    }
  }
  useEffect(() => {
    registerOnViewerCallback((receivedData) => onMessageReceived(receivedData));
  }, [selected])
  useEffect(() => {
    
    
    CamerasServices.getCameras().then(result => {
      if (result?.success) {
        setCameras(result.data);
      }
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
  return <DashboardLayout>
    <DashboardNavbar />
    <MDBox my={3}>
      <MDBox>
          <Autocomplete
          variant="outlined"
          value={selected?.id}
          onChange={(e, newValue) => setSelected(newValue)}
          style={{width: "50%"}}
              options={cameras.map((camera) => {return {id: camera.id, label: camera.name, floor_number: camera.floor_number}})}
              renderInput={(params) => (
              <FormField
                  {...params}
                  label="Pick a Camera"
                  InputLabelProps={{ shrink: true }}
              />
              )}
          />
      </MDBox>
      <img style={{marginTop: 20, border: '2px solid black'}} width={'90%'} src={frame}></img>
    </MDBox>
    
  </DashboardLayout>
}

export default Viewer;
