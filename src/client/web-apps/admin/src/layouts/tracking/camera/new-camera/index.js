import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import Info from "./components/Info";
import * as CameraServices from 'services/CameraServices';
import { useState, useContext, useEffect } from "react";
import { DataContext } from "App";
function New({handleClickView, list, setList, locations}) {
  const [info, setInfo] = useState({});
  const {setOpenAlert, setContentAlert, setStatusAlert} = useContext(DataContext);

  const handleSubmit = () => {
    const details = {...info};
    details['location_id'] = info.location_id.id;
    delete details['location'];
    CameraServices.addCamera(details).then(result => {
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
                  <Info locations={locations} setInfo={setInfo} info={info}/>
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
