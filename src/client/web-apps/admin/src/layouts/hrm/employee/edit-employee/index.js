import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import Info from "./components/Info";

import * as EmployeeServices from "services/EmployeeServices";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "App";

function Edit({info, handleClickView, departments}) {
  const [detail, setDetail] = useState(info);
  const {setOpenAlert, setStatusAlert, setContentAlert} = useContext(DataContext);

  const handleSubmit = () => {
    const details = {...detail};
    details['department_id'] = detail.department_id.id;
    delete details['department'];
    EmployeeServices.updateEmployee(details.id, details).then(result => {
      if (result?.success) {
        setContentAlert(result.message);
        setStatusAlert('success');
        setOpenAlert(true);
        handleClickView({...result.data[0], department: detail.department_id.label || detail.department}); //, category: detail.category_id.label || detail.category
      } else {
        setContentAlert(result.message);
        setStatusAlert('error');
        setOpenAlert(true);
      }
    })
  }
  const handleCancel = () => {
    handleClickView(info);
  }

  return (
                <MDBox>
                  <Info setInfo={setDetail} departments={departments} info={detail}/>
                  <MDBox
                    mt={3}
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                  >
                   <MDButton
                      variant="gradient"
                      color="dark"
                      onClick={handleCancel}
                    >
                      {"cancel"}
                    </MDButton>
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

export default Edit;
