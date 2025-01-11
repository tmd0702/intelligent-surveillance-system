import React, { useRef, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Button } from "@mui/material";
import * as ParkingTicketServices from 'services/ParkingTicketsServices';

let stream, canvas;
function getImageDataBinaryBase64(imageData) {
  const tempCanvas = document.createElement('canvas');
  const tempContext = tempCanvas.getContext('2d');
  tempCanvas.width = imageData.width;
  tempCanvas.height = imageData.height;
  tempContext.putImageData(imageData, 0, 0);

  const base64String = tempCanvas.toDataURL('image/jpeg').split(',')[1];

  return base64String;
}
const Client = () => {
  const [camType, setCamType] = useState();
  const [faceImage, setFaceImage] = useState(null);
  const [plateImage, setPlateImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [currImageData, setCurrImageData] = useState();
  const [cameraActive, setCameraActive] = useState(false);
  const [type, setType] = useState({id: 'checkin', label: 'Check-in'});
  const handleOpenCamera = async () => {
    try {
      setCameraActive(true);
      
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      // if (canvasRef.current) {

      
      canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = 400;
      canvas.height = 400;
      // requestAnimationFrame(processFrame);
      // }
      
      const processFrame = () => {
        // console.log('abc123')
        // console.log('check', videoRef.current, canvasRef.current)
        if (videoRef.current && canvasRef.current) {
          const offscreenCanvas = document.createElement('canvas');
          const offscreenContext = offscreenCanvas.getContext('2d');
          offscreenCanvas.width = videoRef.current.videoWidth;
          offscreenCanvas.height = videoRef.current.videoHeight;
          offscreenContext.translate(offscreenCanvas.width, 0);
          offscreenContext.scale(-1, 1);
          offscreenContext.drawImage(videoRef.current, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
          offscreenContext.setTransform(1, 0, 0, 1, 0, 0);
          if (offscreenCanvas.width) {
              context.drawImage(offscreenCanvas , 0, 0, canvas.width, canvas.height);
  
            }
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          setCurrImageData(imageData);
          requestAnimationFrame(processFrame);
        }
      };

      requestAnimationFrame(processFrame);
    } catch (err) {
      console.error("Error accessing the camera: ", err);
      alert("Unable to access camera. Please check your permissions and ensure you are on a secure (HTTPS) site.");
    }
  }
  const handleCapture = () => {
    const base64Frame = getImageDataBinaryBase64(currImageData);
    if (camType == 'face') {
      setFaceImage('data:image/jpeg;base64,' + base64Frame);
    } else if (camType == 'plate') {
      setPlateImage('data:image/jpeg;base64,' + base64Frame)
    }
    handleStopCamera();
  }
  const handleStopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };
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
  const handlePlateImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPlateImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = () => {
    const data = {
      plate_b64: plateImage ? plateImage.split(",")[1] : "",
      face_b64: faceImage ? faceImage.split(",")[1] : "",
    }
    if (type.id == 'checkin') {
      ParkingTicketServices.checkIn(data).then(result => {
        console.log('checkin', result);
        if (result?.success) {

        } else {
          console.log(result.message)
        }
      })
    } else if (type.id == 'checkout') {
      ParkingTicketServices.checkOut(data).then(result => {
        console.log('checkout', result);
        if (result?.success) {

        }
      })
    }
  }


  return  <DashboardLayout>
  <DashboardNavbar />
  <Autocomplete
                //defaultValue="Clothing"
                value={type}
                options={[{id: 'checkin', label: 'Check-in'}, {id: 'checkout', label: 'Check-out'}]}
                onChange={(e, newValue) => {
                  setType(newValue);
                }}
                renderInput={(params) => <MDInput {...params} variant="standard" />}
              />
  <MDBox my={3} style={{display: 'flex', justifyContent: 'space-between'}}>
  
    <MDBox style={{width: '49%'}}>
    <MDTypography variant="h5" gutterBottom>
        Face
      </MDTypography>
      <MDBox style={{display: 'flex'}}>
        <input
          accept="image/*"
          id="face-upload"
          type="file"
          style={{ display: "none", marginRight: 20 }}
          onChange={handleFaceImageUpload}
        />
        <label htmlFor="face-upload">
          <Button
            variant="contained"
            color="primary"
            component="span"
            style={{color: "white", marginRight: 12 }}
          >
            Upload Image
          </Button>
        </label>
          <Button
              variant="contained"
              color="primary"
              component="span"
              style={{color: "white"}}
              onClick={(e) => {
                if (!cameraActive) {
                  setCamType('face');
                  handleOpenCamera();
                } else {
                  setCamType();
                  setCameraActive(false);
                  handleStopCamera();
                }
                
              }}
            >
              {!cameraActive? 'Open Camera' : 'Stop Camera'}
            </Button>
      </MDBox>
      {(!cameraActive || camType != 'face') && faceImage && (
        <Box sx={{ mt: 2 }}>
          <MDTypography variant="body1" gutterBottom>
            Preview:
          </MDTypography>
          <img
            src={faceImage}
            alt="Preview"
            style={{
              // objectFit: 'contain',
              maxWidth: "100%",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
        </Box>
      )}
      {cameraActive && camType=='face' && <div style={{justifyContent: 'center', justifyItems: 'center', marginTop: '16px', marginRight: '12%'}}>
          <video ref={videoRef} style={{ transform: 'rotateY(180deg)' }} hidden autoPlay playsInline />
            <canvas
              ref={canvasRef}
              style={{
                // backgroundColor: 'black',
                backgroundImage: 'url(https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/camera-512.png)',
                backgroundSize: '30% 30%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%',
                border: '3px solid black',
                borderRadius: '50%',
                display: cameraActive? 'block' : 'none'
              }}
            />
            {cameraActive && <MDButton
              variant="gradient"
              color="dark"
              width='100%'
              onClick={handleCapture}
            >
              {"Capture"}
          </MDButton>}
      </div>}
      
    </MDBox>
    <MDBox style={{width: '49%'}}>
      <MDTypography variant="h5" gutterBottom>
        Plate
      </MDTypography>
      <MDBox style={{display: 'flex',}}>
      <input
        accept="image/*"
        id="plate-upload"
        type="file"
        style={{ display: "none", marginRight: 20 }}
        onChange={handlePlateImageUpload}
      />
      <label htmlFor="plate-upload">
        <Button
          variant="contained"
          color="primary"
          component="span"
          style={{color: "white", marginRight: 12 }}
        >
          Upload Image
        </Button>
      </label>
      <Button
          variant="contained"
          color="primary"
          component="span"
          style={{color: "white"}}
          onClick={(e) => {
            if (!cameraActive) {
              setCamType('plate');
              handleOpenCamera();
            } else {
              setCamType();
              handleStopCamera();
              setCameraActive(false);
            }
            
          }}
        >
          {!cameraActive? 'Open Camera' : 'Stop Camera'}
        </Button>
        </MDBox>
        {(!cameraActive || camType != 'plate') && plateImage && (
        <Box sx={{ mt: 2 }}>
          <MDTypography variant="body1" gutterBottom>
            Preview:
          </MDTypography>
          <img
            src={plateImage}
            alt="Preview"
            style={{
              maxWidth: "100%",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
        </Box>
      )}
      {cameraActive && camType=='plate' && <div style={{justifyContent: 'center', justifyItems: 'center', marginTop: '16px', marginLeft: '12%'}}>
          <video ref={videoRef} style={{ transform: 'rotateY(180deg)' }} hidden autoPlay playsInline />
            <canvas
              ref={canvasRef}
              style={{
                // backgroundColor: 'black',
                backgroundImage: 'url(https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/camera-512.png)',
                backgroundSize: '30% 30%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%',
                border: '3px solid black',
                borderRadius: '50%',
                display: cameraActive? 'block' : 'none'
              }}
            />
            {cameraActive && <MDButton
              variant="gradient"
              color="dark"
              width='100%'
              onClick={handleCapture}
            >
              {"Capture"}
          </MDButton>}
      </div>}
    </MDBox>
    
      </MDBox>
      {faceImage && plateImage && <Button
          variant="contained"
          color="primary"
          component="span"
          style={{color: "white"}}
          onClick={handleSubmit}
        >
          Submit
        </Button>}
</DashboardLayout>
};

export default Client;
