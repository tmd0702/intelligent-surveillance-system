import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import Info from "./components/Info";

import * as LocationServices from "services/LocationServices";
import { useState, useEffect } from "react";

function Edit({info, handleClickView}) {
  const [detail, setDetail] = useState(info);

  const handleSubmit = () => {
    const details = {...detail};
    LocationServices.updateLocation(details.id, details).then(result => {
      if (result?.success) {
        handleClickView({...result.data[0]}); //, category: detail.category_id.label || detail.category
      } else {

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
