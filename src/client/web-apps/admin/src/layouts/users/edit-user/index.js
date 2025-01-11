import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import Info from "./components/Info";
import * as UserServices from "services/UserServices";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "App";
function Edit({info, handleClickView}) {
  const [detail, setDetail] = useState(info);
  const { setContentAlert, setStatusAlert, setOpenAlert } = useContext(DataContext)
 
  const handleSubmit = () => {
    const details = {...detail};
    UserServices.updateUser(details.id, details).then(result => {
      if (result?.success) {
        setContentAlert(result.message);
        setStatusAlert('success');
        setOpenAlert(true);
        handleClickView({...result.data[0]}); //, category: detail.category_id.label || detail.category
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
                  <Info setInfo={setDetail} info={detail}/>
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
