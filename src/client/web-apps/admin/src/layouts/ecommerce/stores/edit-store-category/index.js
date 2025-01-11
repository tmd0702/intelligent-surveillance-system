import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import StoreInfo from "./components/Info";

import * as StoreCategoryServices from 'services/StoreCategoryServices';
import { useState, useEffect , useContext} from "react";
import { DataContext } from "App";
function UpdateStoreCategory({storeCategory, handleClickView}) {
  const [detail, setDetail] = useState(storeCategory);
  const {setContentAlert, setOpenAlert, setStatusAlert} = useContext(DataContext);

  const handleSubmit = () => {
    const details = {...detail};
    StoreCategoryServices.updateStoreCategory(details.id, details).then(result => {
      if (result?.success) {
        setContentAlert(result.message);
        setStatusAlert('success');
        setOpenAlert(true);
        handleClickView({...result.data[0]});
      } else {
        setContentAlert(result.message);
        setStatusAlert('error');
        setOpenAlert(true);
      }
    })
  }
  const handleCancel = () => {
    handleClickView(storeCategory);
  }

  return (
                <MDBox>
                  <StoreInfo setStoreCategory={setDetail} storeCategory={detail}/>
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

export default UpdateStoreCategory;
