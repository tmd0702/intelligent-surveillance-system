import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import StoreInfo from "./components/StoreInfo";

import * as StoreServices from 'services/StoreServices';
import * as StoreCategoryServices from 'services/StoreCategoryServices';
import { useState, useEffect } from "react";

function ViewStore({store, handleClickUpdate}) {
  const [categories, setCategories] = useState([]);
  

  useEffect(() => {
    const getCategoriesPromise = StoreCategoryServices.getStoreCategories();

    Promise.all([getCategoriesPromise]).then(results => {
      if (results[0]?.success) {
        setCategories(results[0].data);
      }
    })

  }, []);

  return (
                <MDBox>
                  <StoreInfo categories={categories} store={store}/>
                  <MDBox
                    mt={3}
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                  >
                   
                    <MDButton
                      variant="gradient"
                      color="dark"
                      onClick={(e) => handleClickUpdate(store)}
                    >
                      {"update"}
                    </MDButton>
                  </MDBox>
                </MDBox>
               
  );
}

export default ViewStore;
