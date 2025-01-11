import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
import { useEffect } from "react";
import Switch from "@mui/material/Switch";

import * as AuthenticationServices from '../../../../services/AuthenticationServices';


import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import { useContext } from "react";
import { DataContext } from "App";
import bgImage from "assets/images/bg-sign-in-cover.jpeg";



function Cover() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const {setContentAlert, setStatusAlert, setOpenAlert} = useContext(DataContext);
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();
  const handleSignIn = async () => {
    AuthenticationServices.signIn(email, password).then(result => {
      if (result?.success) {
        setContentAlert(result.message);
        setStatusAlert('success');
        setOpenAlert(true);
        localStorage.setItem('user_info', JSON.stringify(result.data));
        setTimeout(() => navigate("/"), 300);
      } else {
        setContentAlert("Invalid username or password.");
        setStatusAlert('error');
        setOpenAlert(true);
      }
    })
  }
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    if (userInfo) {
      AuthenticationServices.signOut(userInfo.id).then((result) => {
        window.location.href = "#/users/login";
    })
        .catch((err) => {
            console.log(err);
        });
    }
    
  }, [])
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          mx={2}
          mt={2}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to Sign In
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                placeholder="Your email here"
                InputLabelProps={{ shrink: true }}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                placeholder="************"
                InputLabelProps={{ shrink: true }}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={handleSignIn} variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up/cover"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
