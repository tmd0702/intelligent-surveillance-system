import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import Info from "./components/Info";
import * as UserServices from 'services/UserServices';
import * as EmployeeServices from 'services/EmployeeServices';
import { useContext } from "react";
import { DataContext } from "App";
import { useState, useEffect } from "react";

function New({handleClickView, list, setList, departments}) {
  const [info, setInfo] = useState({});
  const {setContentAlert, setStatusAlert, setOpenAlert} = useContext(DataContext);

  const handleSubmit = () => {
    const details = {...info};
    details['department_id'] = details.department_id.id;
    EmployeeServices.addEmployee(details).then(result => {
      if (result?.success) {
        setContentAlert(result.message);
        setStatusAlert('success');
        setOpenAlert(true);
        setList([...list, result.data[0]]);
        handleClickView({...result.data[0], department: info.department_id.label});
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
                  <Info setInfo={setInfo} departments={departments} info={info}/>
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
