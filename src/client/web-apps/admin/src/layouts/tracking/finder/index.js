import { useMemo, useState } from "react";
import { Autocomplete } from "@mui/material";
import { Buffer } from "buffer";
import { useEffect } from "react";
import * as LocationServices from 'services/LocationServices';
// @mui material components
import {Button} from "@mui/material";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import FormField from "layouts/applications/wizard/components/FormField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import DModal from "components/DModal";
import * as FinderServices from 'services/FinderServices';

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
function Finder() {
  const [tableData, setTableData] = useState(dataTableData);
  const [menu, setMenu] = useState(null);
  const [query, setQuery] = useState('');
  const [queryType, setQueryType] = useState('email');
  const [loading, setLoading] = useState(true);
  const [faceImage, setFaceImage] = useState();
  const [modalPage, setModalPage] = useState();
  const [openModal, setOpenModal] = useState(false);
  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  const handleClick = (details) => {
    const byteArray = new Uint8Array(details.byte_data.data);
    const blob = new Blob([byteArray], { type: "image/jpeg" }); // Adjust MIME type if needed
    const url = URL.createObjectURL(blob);

    const frameByteArray = new Uint8Array(details.frame_byte_data.data);
    const frameBlob = new Blob([frameByteArray], { type: "image/jpeg" }); // Adjust MIME type if needed
    const frameUrl = URL.createObjectURL(frameBlob);

    setModalPage(<div>
      <div style={{display: 'flex'}}>
        <div style={{width: '50%', marginRight: 20}}>
          <img width={'100%'} src={url} alt="" />
          
        </div>
        <div style={{width: '50%', fontSize: 16}}>
        <img width={'100%'} src={frameUrl} alt="" />
          <div style={{display: 'flex', marginBottom: 10}}>
              <p style={{fontWeight: 'bold'}}>Full Name:</p>
              <p style={{marginLeft: 10}}>{details.first_name + " " + details.last_name}</p>            
          </div>
          <div style={{display: 'flex', marginBottom: 10}}>
              <p style={{fontWeight: 'bold'}}>Email:</p>
              <p style={{marginLeft: 10}}>{details.email}</p>            
          </div>
          <div style={{display: 'flex', marginBottom: 10}}>
              <p style={{fontWeight: 'bold'}}>Phone Number:</p>
              <p style={{marginLeft: 10}}>{details.phone_number}</p>            
          </div>
          <div style={{display: 'flex', marginBottom: 10}}>
              <p style={{fontWeight: 'bold'}}>Confidence:</p>
              <p style={{marginLeft: 10}}>{details.confidence_score}</p>            
          </div>
          <div style={{display: 'flex', marginBottom: 10}}>
              <p style={{fontWeight: 'bold'}}>Camera:</p>
              <p style={{marginLeft: 10}}>{details.camera}</p>            
          </div>
          <div style={{display: 'flex'}}>
              <p style={{fontWeight: 'bold'}}>Timestamp:</p>
              <p style={{marginLeft: 10}}>{formatDateTimeVN(details.recognized_at)}</p>            
          </div>
        </div>
      </div>
    </div>)
    setOpenModal(true);
  }
  const handleSubmit = () => {
    if (queryType == 'email') {
      FinderServices.getByEmail(query).then(result => {
        if (result?.success) {
          setTableData({...tableData, rows: result.data});
        }
      })
    } else if (queryType == 'phone') {
      FinderServices.getByPhoneNumber(query).then(result => {
        if (result?.success) {
          setTableData({...tableData, rows: result.data});
        }
      })
    } else if (queryType == 'image') {
      FinderServices.getByFaceImage(faceImage ? faceImage.split(",")[1] : "").then(result => {
        if (result?.success) {
          setTableData({...tableData, rows: result.data});
        }
      })
    }
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
  const handleFaceImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFaceImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return <DashboardLayout>
    <DModal open={openModal} setOpen={setOpenModal} pageContent={modalPage}/>
    <DashboardNavbar />
    <MDBox my={3}>
      <MDBox display="flex" justifyContent="space-between" mb={2}>
          {(queryType != 'image') && <MDInput value={query} onChange={(e) => setQuery(e.target.value)} style={{width: "68%"}} label="Search by email or phone number"></MDInput>}
          {queryType == 'image' && <MDBox> 
            <input

          accept="image/*"
          id="face-upload"
          type="file"
          style={{ display: "none", marginRight: 20, width: '100%'}}
          onChange={handleFaceImageUpload}
        />
        <label htmlFor="face-upload">
          <Button
          
            variant="contained"
            color="primary"
            component="span"
            style={{color: "white", width: '54vw'}}
          >
            Upload Image
          </Button>
          {faceImage && <MDTypography style={{fontStyle: 'italic', fontSize: 12}}>image selected</MDTypography>}
        </label>
            </MDBox>}
          <Autocomplete
          variant="outlined"
          value={queryType}
          onChange={(e, newValue) => setQueryType(newValue)}
          style={{width: "15%"}}
              defaultValue="email"
              options={["email", "phone", "image"]}
              renderInput={(params) => (
              <FormField
                  {...params}
                  label="Find By"
                  InputLabelProps={{ shrink: true }}
              />
              )}
          />
          <MDBox ml={1}>
            <MDButton onClick={handleSubmit} style={{width: "20%", paddingLeft: 10, paddingRight: 10}} variant="contained" color="dark">
              <Icon>description</Icon>
              Submit
            </MDButton>
          </MDBox>
      </MDBox>
      <Card>
        <DataTable handleClick={handleClick} table={tableData} entriesPerPage={false} canSearch />
      </Card>
    </MDBox>
    
  </DashboardLayout>
}

export default Finder;
