

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { Box } from "@mui/material";
import MDTypography from "components/MDTypography";
import { useRef, useState } from "react";
import * as FinderServices from 'services/FinderServices';
import * as PaymentServices from 'services/PaymentServices';
import * as OrderServices from 'services/OrderServices';
import { useContext } from "react";
import { DataContext } from "App";
// Softzone context
import { useMaterialUIController } from "context";

function getImageDataBinaryBase64(imageData) {
  const tempCanvas = document.createElement('canvas');
  const tempContext = tempCanvas.getContext('2d');
  tempCanvas.width = imageData.width;
  tempCanvas.height = imageData.height;
  tempContext.putImageData(imageData, 0, 0);

  const base64String = tempCanvas.toDataURL('image/jpeg').split(',')[1];

  return base64String;
}


let stream, canvas;
function BillingInformation({setDetail, detail, user, setUser}) {
  const videoRef = useRef(null);
  const {setOpenAlert, setStatusAlert, setContentAlert} = useContext(DataContext);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [controller] = useMaterialUIController();
  const [currImageData, setCurrImageData] = useState();
  const { darkMode } = controller;
  const handlePayment = () => {
    const details = {
      user_id: user.id,
      order_id: detail.id,
      total_amount: detail.total_amount
    }
    PaymentServices.addPayment(details).then(result => {
      if (result?.success) {
        setContentAlert(result.message);
        setStatusAlert('success');
        setOpenAlert(true);
        setDetail({...detail, status: 'complete'});
      } else {
        setContentAlert(result.message);
        setStatusAlert('error');
        setOpenAlert(true);
      }
    })
  }
  
  const handleOpenCamera = async () => {
    try {
      setUser();
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
          // const base64Frame = getImageDataBinaryBase64(imageData);
          // if ( (count % 2) == 0 && ws.readyState === WebSocket.OPEN) {
          //   ws.send(JSON.stringify({
          //     "type": "register",
          //     "user_data": {
          //       id: user.id,
          //       name: user.username
          //     },
          //     "image_bytes": base64Frame
          //   }));


          // } else if (offscreenCanvas.width) {
          //   // context.drawImage(offscreenCanvas , 0, 0, canvas.width, canvas.height);

          // }
          // count += 1
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
    FinderServices.getUserByFaceId(base64Frame).then(result => {
      if (result?.success && result.data) {
        
        OrderServices.updateOrder(detail.id, {user_id: result.data.id}).then(uresult => {
          if (uresult?.success) {
            setContentAlert(`User ${result.data.email} recognized`)
            setStatusAlert('success');
            setOpenAlert(true);
          } else {
            setContentAlert(`${uresult.message}`)
            setStatusAlert('error');
            setOpenAlert(true);
          }
        })
        setUser(result.data);
        handleStopCamera();
      } else {
        setContentAlert(result.message)
        setStatusAlert('error');
        setOpenAlert(true);

      }
    })
    
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
    <>
      <MDTypography variant="h6" fontWeight="medium">
        Billing Information
      </MDTypography>
      <MDBox
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        bgColor={darkMode ? "transparent" : "grey-100"}
        borderRadius="lg"
        p={3}
        mt={2}
      >
        {!user && <div>
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
              {"Check"}
          </MDButton>}
      </div>}
        {!user && !cameraActive && <MDBox width="100%" display="flex" flexDirection="column" lineHeight={1}>
          <MDButton
              variant="gradient"
              color="dark"
              onClick={handleOpenCamera}
            >
              {"open camera"}
          </MDButton>
        </MDBox>}
       {user && <MDBox width="100%" display="flex" flexDirection="column" lineHeight={1}>
          <MDBox style={{display: 'flex', justifyContent: 'space-between'}} mb={2}>
            <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
              {user.first_name + " " + user.last_name}
            </MDTypography>
            {detail.status != 'complete' && <MDButton
              variant="gradient"
              color="dark"
              width='70%'
              onClick={handleOpenCamera}
            >
              {"Change"}
          </MDButton>}
          </MDBox>
          {/* <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" fontWeight="regular" color="text">
              Company Name:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                Viking Burrito
              </MDTypography>
            </MDTypography>
          </MDBox> */}
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" fontWeight="regular" color="text">
              Phone Number:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium">
                {user.phone_number}
              </MDTypography>
            </MDTypography>
          </MDBox>
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" fontWeight="regular" color="text">
              Email Address:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium">
                {user.email}
              </MDTypography>
            </MDTypography>
          </MDBox>
          {/* <MDTypography variant="caption" fontWeight="regular" color="text">
            VAT Number:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              FRB1235476
            </MDTypography>
          </MDTypography> */}
          {detail.status != 'complete' && <MDButton
              variant="gradient"
              color="dark"
              width='70%'
              onClick={handlePayment}
            >
              {"Payment"}
          </MDButton>}
        </MDBox>}
      </MDBox>
    </>
  );
}

export default BillingInformation;
