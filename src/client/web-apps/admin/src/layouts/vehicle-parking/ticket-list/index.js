import { useState } from "react";
import DModal from "components/DModal";
import { useEffect } from "react";
import * as ParkingTicketServices from 'services/ParkingTicketsServices';
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import Loading from 'components/Loading';

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";


import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

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
function TicketList() {
  const [menu, setMenu] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalPage, setModalPage] = useState();
  const [openModal, setOpenModal] = useState(false);
  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  useEffect(() => {
    const getTicketsPromise = ParkingTicketServices.getParkingTickets();
    Promise.all([getTicketsPromise]).then(results => {
      // console.log('results', results)
      if (results[0]?.success) {
        setTickets(results[0].data);
      
        dataTableData.rows = results[0].data;
      }
      setLoading(false);
    })

  }, [])
  const handleClick = (details) => {
    // console.log('details', details)
    const faceByteArray = new Uint8Array(details.face_checkin_byte_data.data);
    const faceBlob = new Blob([faceByteArray], { type: "image/jpeg" }); // Adjust MIME type if needed
    const faceUrl = URL.createObjectURL(faceBlob);

    const plateByteArray = new Uint8Array(details.plate_checkin_byte_data.data);
    const plateBlob = new Blob([plateByteArray], { type: "image/jpeg" }); // Adjust MIME type if needed
    const plateUrl = URL.createObjectURL(plateBlob);

    let coFaceUrl;
    let coPlateUrl;
    if (details.face_checkout_byte_data) {
      const coFaceByteArray = new Uint8Array(details.face_checkout_byte_data.data);
      const coFaceBlob = new Blob([coFaceByteArray], { type: "image/jpeg" }); // Adjust MIME type if needed
      coFaceUrl = URL.createObjectURL(coFaceBlob);

      const coPlateByteArray = new Uint8Array(details.plate_checkout_byte_data.data);
      const coPlateBlob = new Blob([coPlateByteArray], { type: "image/jpeg" }); // Adjust MIME type if needed
      coPlateUrl = URL.createObjectURL(coPlateBlob);
    }

    setModalPage(<div>
      <div style={{fontWeight: 'bold'}}>
        
      <div style={{display: 'flex'}}>
        <div style={{width: '40%', marginRight: 20}}>
        <p style={{fontWeight: 'bold', fontWeight: 'bold', fontSize: 14, marginBottom: 16}}>General</p>
        <div style={{fontSize: 12 }}>
          <div style={{display: 'flex', marginBottom: 10}}>
              <p style={{fontWeight: 'bold'}}>Ticket:</p>
              <p style={{marginLeft: 10, fontWeight: 'normal'}}>{details.id}</p>            
          </div>
          <div style={{display: 'flex', marginBottom: 10}}>
              <p style={{fontWeight: 'bold'}}>Full Name:</p>
              <p style={{marginLeft: 10, fontWeight: 'normal'}}>{details.first_name? details.first_name + " " + details.last_name : 'Guest'}</p>            
          </div>
          <div style={{display: 'flex', marginBottom: 10}}>
              <p style={{fontWeight: 'bold'}}>Email:</p>
              <p style={{marginLeft: 10, fontWeight: 'normal'}}>{details.email || 'Guest'}</p>            
          </div>
          <div style={{display: 'flex', marginBottom: 10}}>
              <p style={{fontWeight: 'bold'}}>Phone Number:</p>
              <p style={{marginLeft: 10, fontWeight: 'normal'}}>{details.phone_number || 'Guest'}</p>            
          </div>
          
          <div style={{display: 'flex',  marginBottom: 10}}>
              <p style={{fontWeight: 'bold'}}>Check-in:</p>
              <p style={{marginLeft: 10, fontWeight: 'normal'}}>{formatDateTimeVN(details.check_in)}</p>            
          </div>
          <div style={{display: 'flex',  marginBottom: 10}}>
              <p style={{fontWeight: 'bold'}}>Check-out:</p>
              <p style={{marginLeft: 10, fontWeight: 'normal'}}>{details.check_out && formatDateTimeVN(details.check_out)}</p>            
          </div>
          </div>
        </div>
        <div style={{width: '30%', marginRight: 20}}>
          <p style={{fontWeight: 'bold', fontSize: 14, marginBottom: 16}}>Check-in</p>
          <img width={'100%'} src={faceUrl} alt="" />
          <img width={'100%'} src={plateUrl} alt="" />
        </div>
        <div style={{width: '30%', marginRight: 20}}>
          <p style={{fontWeight: 'bold', fontSize: 14, marginBottom: 16}}>Check-out</p>
          <img width={'100%'} src={coFaceUrl} alt="" />
          <img width={'100%'} src={coPlateUrl} alt="" />
        </div>
        
        
      </div>
      </div>
      
    </div>)
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
          {/* <MDButton variant="gradient" color="info">
            new camera
          </MDButton> */}
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
          <DataTable handleClick={handleClick} table={dataTableData} entriesPerPage={false} canSearch />
        </Card>
      </MDBox>
      
    </DashboardLayout>
  );
  else return <Loading />
}

export default TicketList;
