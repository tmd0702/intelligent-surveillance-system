import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import Info from "./components/Info";
import * as LocationServices from 'services/LocationServices';

import { useState, useEffect } from "react";

function New({handleClickView, list, setList}) {
  const [info, setInfo] = useState({});
  

  const handleSubmit = () => {
    const details = {...info};
    console.log('new:', details)
    LocationServices.addLocation(details).then(result => {
      if (result?.success) {
        setList([...list, result.data[0]]);
        handleClickView(result.data[0]);
      } else {

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
