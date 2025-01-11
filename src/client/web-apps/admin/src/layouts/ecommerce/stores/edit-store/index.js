import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import StoreInfo from "./components/StoreInfo";

import * as StoreServices from 'services/StoreServices';
import * as StoreCategoryServices from 'services/StoreCategoryServices';
import { useState, useEffect, useContext } from "react";
import { DataContext } from "App";
function UpdateStore({store, handleClickView}) {
  const [detail, setDetail] = useState(store);
  const [categories, setCategories] = useState([]);
  const {setOpenAlert, setContentAlert, setStatusAlert} = useContext(DataContext);

  useEffect(() => {
    const getCategoriesPromise = StoreCategoryServices.getStoreCategories();

    Promise.all([getCategoriesPromise]).then(results => {
      if (results[0]?.success) {
        setCategories(results[0].data);
      }
    })

  }, []);

  const handleSubmit = () => {
    const details = {...detail};
    details['category_id'] = detail.category_id.id;
    delete details['category'];
    StoreServices.updateStore(details.id, details).then(result => {
      if (result?.success) {
        setContentAlert(result.message);
        setStatusAlert('success');
        setOpenAlert(true);
        handleClickView({...result.data[0], category: detail.category_id.label || detail.category});
      } else {
        setContentAlert(result.message);
        setStatusAlert('error');
        setOpenAlert(true);
      }
    })
  }
  const handleCancel = () => {
    handleClickView(store);
  }

  return (
                <MDBox>
                  <StoreInfo categories={categories} setStore={setDetail} store={detail}/>
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

export default UpdateStore;
