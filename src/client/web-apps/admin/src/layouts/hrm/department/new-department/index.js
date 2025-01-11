import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import Info from "./components/Info";
import * as DepartmentServices from 'services/DepartmentServices';
import { useState, useEffect } from "react";
import { DataContext } from "App";
import { useContext } from "react";
function New({handleClickView, list, setList}) {
  const [info, setInfo] = useState({});
  const {setContentAlert, setOpenAlert, setStatusAlert} = useContext(DataContext);

  const handleSubmit = () => {
    const details = {...info};
    console.log('new:', details)
    DepartmentServices.addDepartment(details).then(result => {
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
