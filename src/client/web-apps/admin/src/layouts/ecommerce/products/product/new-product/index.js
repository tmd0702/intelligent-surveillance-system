import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import Info from "./components/Info";
import * as ItemServices from 'services/ItemServices';
import { useContext } from "react";
import { DataContext } from "App";
import { useState, useEffect } from "react";

function New({handleClickView, list, setList, stores, categories}) {
  const [info, setInfo] = useState({});
  const {setOpenAlert, setContentAlert, setStatusAlert} = useContext(DataContext);

  const handleSubmit = () => {
    const details = {...info};
    console.log('info:', info)
    details['category_id'] = info.category_id.id;
    details['store_id'] = info.store_id.id;
    console.log('new:', details)
    ItemServices.addItem(details).then(result => {
      if (result?.success) {
        setContentAlert(result.message);
        setStatusAlert('success');
        setOpenAlert(true);
        setList([...list, {...result.data[0], store: info.store_id && info.store_id.label, category: info.category_id && info.category_id.label}]);
        handleClickView({...result.data[0], store: info.store_id && info.store_id.label, category: info.category_id && info.category_id.label});
      } else {
        setContentAlert(result.message);
        setStatusAlert('error');
        setOpenAlert(true);
      }
    })
  }

  return (
                <MDBox>
                  <Info stores={stores} setInfo={setInfo} categories={categories} info={info}/>
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
