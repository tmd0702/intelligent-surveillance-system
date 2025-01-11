
import { useState } from "react";
import { useRef } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import MDButton from "components/MDButton";
import * as FinderServices from 'services/FinderServices';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDEditor from "components/MDEditor";
import MDInput from "components/MDInput";
// NewProduct page components
import FormField from "../FormField";
import * as UserServices from 'services/UserServices';
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

function Info({setInfo, info}) {
  const videoRef = useRef(null);
  const [showImage, setShowImage] = useState();
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [currImageData, setCurrImageData] = useState();
  const handleOpenCamera = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
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
    setShowImage('data:image/jpeg;base64,' + base64Frame);
    UserServices.regisFace(info.id, base64Frame).then(result => {
      console.log('track result', result);
      if (result?.success) {

      } else {

      }
    })
    handleStopCamera();
  }
  const handleStopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    // setCameraActive(false);
  };
  return (
    <MDBox>
      <MDTypography variant="h5">Update User</MDTypography>
      <MDBox mt={3}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <FormField type="text" label="ID" value={info.id} disabled={true}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="date" label="DOB" value={info.dob} onChange={(e) => setInfo({...info, dob: e.target.value})}/>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <FormField type="text" label="First Name" value={info.first_name} onChange={(e) => setInfo({...info, first_name: e.target.value})}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Last Name" value={info.last_name} onChange={(e) => setInfo({...info, last_name: e.target.value})}/>
          </Grid>
          
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <FormField type="text" label="Email" value={info.email} onChange={(e) => setInfo({...info, email: e.target.value})}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Phone Number" value={info.phone_number} onChange={(e) => setInfo({...info, phone_number: e.target.value})}/>
          </Grid>
          
        </Grid>
      </MDBox>
      
      
      {<div style={{maxWidth: '300px', maxHeight: '300px', justifyContent: 'center', justifyItems: 'center', marginTop: '16px', marginLeft: '50%', transform: 'translateX(-50%)'}}>
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
              {"Submit"}
          </MDButton>}
      </div>}
        {!cameraActive && <MDBox width="100%" display="flex" style={{marginTop: '14px'}} flexDirection="column" lineHeight={1}>
          <MDButton
              variant="gradient"
              color="dark"
              onClick={handleOpenCamera}
            >
              {"Update Facial Identity"}
          </MDButton>
        </MDBox>}
        {showImage && <img src={showImage}/>}
    </MDBox>
  );
}

export default Info;
