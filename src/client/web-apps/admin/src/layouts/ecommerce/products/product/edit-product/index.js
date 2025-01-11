import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import Info from "./components/Info";

import * as ItemServices from "services/ItemServices";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "App";
function Edit({info, handleClickView, stores, categories}) {
  const [detail, setDetail] = useState(info);
  const {setOpenAlert, setContentAlert, setStatusAlert} = useContext(DataContext);
  const handleSubmit = () => {
    const details = {...detail};
    details['category_id'] = info.category_id.id;
    details['store_id'] = info.store_id.id;
    delete details['category'];
    delete details['store'];
    ItemServices.updateItem(details.id, details).then(result => {
      if (result?.success) {
        setContentAlert(result.message);
        setStatusAlert('success');
        setOpenAlert(true);
        handleClickView({...result.data[0], category: detail.category_id.label || detail.category, store: detail.store_id.label || detail.store}); //, category: detail.category_id.label || detail.category
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
                  <Info stores={stores} categories={categories} setInfo={setDetail} info={detail}/>
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
