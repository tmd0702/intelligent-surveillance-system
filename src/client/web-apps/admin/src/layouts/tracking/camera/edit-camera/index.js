import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import Info from "./components/Info";

import * as CameraServices from "services/CameraServices";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "App";
function Edit({locations, info, handleClickView}) {
  const [detail, setDetail] = useState(info);
  const {setContentAlert, setOpenAlert, setStatusAlert} = useContext(DataContext);
  const handleSubmit = () => {
    const details = {...detail};
    details['location_id'] = detail.location_id.id;
    delete details['location'];
    delete details['floor_number'];
    CameraServices.updateCamera(details.id, details).then(result => {
      if (result?.success) {
        setContentAlert(result.message);
        setStatusAlert('success');
        setOpenAlert(true);
        handleClickView({...result.data[0], location: detail.location_id.label || detail.location}); //, category: detail.category_id.label || detail.category
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
                  <Info locations={locations} setInfo={setDetail} info={detail}/>
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
