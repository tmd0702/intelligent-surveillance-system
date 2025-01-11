import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import StoreInfo from "./components/StoreInfo";

import * as StoreServices from 'services/StoreServices';
import * as StoreCategoryServices from 'services/StoreCategoryServices';
import { useState, useEffect, useContext } from "react";
import { DataContext } from "App";
function NewStore({handleClickView, stores, setStores}) {
  const [newStore, setNewStore] = useState({});
  const [categories, setCategories] = useState([]);
  const {setContentAlert, setOpenAlert, setStatusAlert} = useContext(DataContext);

  useEffect(() => {
    const getCategoriesPromise = StoreCategoryServices.getStoreCategories();
    Promise.all([getCategoriesPromise]).then(results => {

      if (results[0]?.success) {
        setCategories(results[0].data);
      }
    })

  }, []);

  const handleSubmit = () => {
    const details = {...newStore};
    details['category_id'] = newStore.category_id.id;
    
    StoreServices.addStore(details).then(result => {
      if (result?.success) {
        setStores([...stores, result.data[0]]);
        setContentAlert(result.message);
        setStatusAlert('success');
        setOpenAlert(true);
        handleClickView(newStore);
      } else {
        setContentAlert(result.message);
        setStatusAlert('error');
        setOpenAlert(true);
      }
    })
  }

  return (
                <MDBox>
                  <StoreInfo categories={categories} setNewStore={setNewStore} newStore={newStore}/>
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

export default NewStore;
