import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import Info from "./components/Info";
import * as UserServices from 'services/UserServices';

import { useState, useEffect, useContext } from "react";
import { DataContext } from "App";
function New({handleClickView, list, setList}) {
  const [info, setInfo] = useState({});
  const {setContentAlert, setOpenAlert, setStatusAlert} = useContext(DataContext);

  const handleSubmit = () => {
    const details = {...info};
    console.log('new:', details)
    UserServices.addUser(details).then(result => {
      console.log('result', result)
      if (result?.success) {
        setContentAlert(result.message);
        setStatusAlert('success');
        setOpenAlert(true);
        setList([...list, result.data[0]]);
        handleClickView(result.data[0]);
      } else {
        setContentAlert(result.message);
        setStatusAlert('error');
        setOpenAlert(true);
      }
    }).catch(error => {
      console.log(error);
    })
  }

  return (
                <MDBox>
                  <Info setInfo={setInfo} info={info}/>
                  <MDBox
                    mt={3}
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                  >
                   
                    <MDButton
                      variant="gradient"
                      color="dark"
                      onClick={handleSubmit}
                    >
                      {"send"}
                    </MDButton>
                  </MDBox>
                </MDBox>
               
  );
}

export default New;
