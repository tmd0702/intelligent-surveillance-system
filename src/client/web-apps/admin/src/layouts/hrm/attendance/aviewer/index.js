import { useMemo, useState } from "react";
import { Autocomplete } from "@mui/material";
import {registerOnLoggerCallback, registerOnAttendCallback} from 'services/WebSocketServices';
import { useEffect } from "react";
import * as CamerasServices from 'services/CameraServices';
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import FormField from "layouts/applications/wizard/components/FormField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import * as AttendanceServices from 'services/AttendanceServices';

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";


import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDInput from "components/MDInput";
// Data
import dataTableData from "./data/dataTableData";
function formatDateTimeVN(isoString) {
  try {
      const date = new Date(isoString);

      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
      const year = date.getFullYear();
      const formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  
      return formattedDate;
  } catch(error) {
      return isoString;
  }
  
}
function AViewer() {
  const [tableData, setTableData] = useState(dataTableData);
  const [menu, setMenu] = useState(null);
  const [newAttendance, setNewAttendance] = useState();
  const [cameraB64Data, setCameraB64Data] = useState();
  const [loading, setLoading] = useState(true);
  const [attendances, setAttendances] = useState([]);
  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);
  useEffect(() => {
    AttendanceServices.getAttendances().then(result => {
      if (result?.success) {
        setAttendances(result.data.map((att => {
          const byteArray = new Uint8Array(att.byte_data.data);
          const blob = new Blob([byteArray], { type: "image/jpeg" });
          const url = URL.createObjectURL(blob);
          return url;
        })))
      }
    })
  }, []);
  const onLoggerMessageReceived = (receivedData) => {
    setCameraB64Data('data:image/jpeg;base64,' + receivedData.data);
  }
  const onViewerMessageReceived = (receivedData) => {
    const byteArray = new Uint8Array(receivedData.data.byte_data.data);
    const blob = new Blob([byteArray], { type: "image/jpeg" }); // Adjust MIME type if needed
    const url = URL.createObjectURL(blob);
    setAttendances(attendances => [url, ...attendances]);
    receivedData.data.byte_data = url;
    const eByteArray = new Uint8Array(receivedData.data.employee.byte_data.data);
    const eBlob = new Blob([eByteArray], { type: "image/jpeg" }); // Adjust MIME type if needed
    const eUrl = URL.createObjectURL(eBlob);
    receivedData.data.employee.byte_data = eUrl;
    setNewAttendance(receivedData.data);
  }
  useEffect(() => {
    registerOnAttendCallback(receivedData => onViewerMessageReceived(receivedData));
    registerOnLoggerCallback(receivedData => onLoggerMessageReceived(receivedData));
    return () => {
      registerOnLoggerCallback();
      registerOnAttendCallback();
    };
  }, [])
  return <DashboardLayout>
    <DashboardNavbar />
    <MDBox my={3} style={{display: 'flex', justifyContent: 'space-between'}}>
        <MDBox style={{border: '3px solid black', justifyContent: 'center', alignItems: 'center'}}>
        <img src={cameraB64Data}/>
        </MDBox>
        {newAttendance && <MDBox>
          <MDBox style={{width: 420, display: 'flex', justifyContent: 'space-between'}}>
          <img width='49%' src={newAttendance.employee.byte_data}></img>
          <img width="49% " src={newAttendance.byte_data}></img>
          
          </MDBox>
          <MDBox>
          <div style={{display: 'flex', marginBottom: 10}}>
              <p style={{fontWeight: 'bold'}}>Employee Code:</p>
              <p style={{marginLeft: 10}}>{newAttendance.employee.employee_code}</p>            
          </div>
          <div style={{display: 'flex', marginBottom: 10}}>
              <p style={{fontWeight: 'bold'}}>Full Name:</p>
              <p style={{marginLeft: 10}}>{newAttendance.employee.first_name + " " + newAttendance.employee.last_name}</p>            
          </div>
          <div style={{display: 'flex', marginBottom: 10}}>
              <p style={{fontWeight: 'bold'}}>Email:</p>
              <p style={{marginLeft: 10}}>{newAttendance.employee.email}</p>            
          </div>
          <div style={{display: 'flex', marginBottom: 10}}>
              <p style={{fontWeight: 'bold'}}>Phone Number:</p>
              <p style={{marginLeft: 10}}>{newAttendance.employee.phone_number}</p>            
          </div>
          <div style={{display: 'flex', marginBottom: 10}}>
              <p style={{fontWeight: 'bold'}}>Confidence:</p>
              <p style={{marginLeft: 10}}>{Math.round(newAttendance.confidence_score * 100) / 100}</p>            
          </div>
          <div style={{display: 'flex'}}>
              <p style={{fontWeight: 'bold'}}>Timestamp:</p>
              <p style={{marginLeft: 10}}>{formatDateTimeVN(newAttendance.created_at)}</p>            
          </div>
          </MDBox>
        </MDBox>}
        
    </MDBox>
    <MDBox style={{display: 'flex', overflow: 'hidden'}}>
      {attendances && attendances.map(((url, index) => {
        if (index > 5) return;
        return <img style={{border: !index && '5px solid lime', marginRight: 10}} width={200} src={url}></img>
      }))}
    </MDBox>
  </DashboardLayout>
}

export default AViewer;
