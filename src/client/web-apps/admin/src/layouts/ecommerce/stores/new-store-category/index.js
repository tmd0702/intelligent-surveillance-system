import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import StoreInfo from "./components/Info";

import * as StoreServices from 'services/StoreServices';
import * as StoreCategoryServices from 'services/StoreCategoryServices';
import { useState, useEffect, useContext} from "react";
import { DataContext } from "App";
function NewStoreCategory({handleClickView, categories, setCategories}) {
  const [newStoreCategory, setNewStoreCategory] = useState({});
  const {setOpenAlert, setStatusAlert, setContentAlert} = useContext(DataContext);
  const handleSubmit = () => {
    const details = {...newStoreCategory};
   
    StoreCategoryServices.addStoreCategory(details).then(result => {
      if (result?.success) {
        setCategories([...categories, result.data[0]]);
        setContentAlert(result.message);
        setStatusAlert('success');
        setOpenAlert(true);
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
                  <StoreInfo setNewStoreCategory={setNewStoreCategory} newStoreCategory={newStoreCategory}/>
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

export default NewStoreCategory;
