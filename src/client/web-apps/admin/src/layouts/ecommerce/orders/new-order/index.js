import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import Info from "./components/Info";
import * as ItemServices from 'services/ItemServices';
import * as OrderServices from 'services/OrderServices';

import { useState, useEffect } from "react";
import { DataContext } from "App";
import { useContext } from "react";

function New({handleClickView, list, setList, stores}) {
  const [info, setInfo] = useState({store_id: '', total_amount: 0});
  const [selectedItems, setSelectedItems] = useState([]);
  const {setOpenAlert, setContentAlert, setStatusAlert} = useContext(DataContext);


  const handleSubmit = () => {
    console.log('selected', selectedItems)
    console.log('info', info)
    const detail = {...info};
    detail['store_id'] = info['store_id'].id;
    detail['items'] = selectedItems.map(item => {
      return {
        item_id: item.item.id,
        price: item.price,
        quantity: item.quantity
      }
    })
    detail['status'] = 'created';
    OrderServices.addOrder(detail).then(result => {
      if (result?.success) {
        // setList([...list, result.data[0]]);
        setContentAlert(result.message);
        setStatusAlert('success');
        setOpenAlert(true);
        handleClickView(result.data[0]);
      } else {
        setContentAlert(result.message);
        setStatusAlert('error');
        setOpenAlert(true);
      }
    });
    // const details = {...info};
    // console.log('info:', info)
    // details['store_id'] = info.store_id.id;
    // console.log('new:', details)
    // ItemServices.addItem(details).then(result => {
    //   if (result?.success) {
    //     setList([...list, {...result.data[0], store: info.store_id && info.store_id.label, category: info.category_id && info.category_id.label}]);
    //     handleClickView({...result.data[0], store: info.store_id && info.store_id.label, category: info.category_id && info.category_id.label});
    //   } else {

    //   }
    // })
  }

  return (
                <MDBox>
                  <Info stores={stores} selectedItems={selectedItems} setSelectedItems={setSelectedItems} setInfo={setInfo} info={info}/>
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
                      {"submit"}
                    </MDButton>
                  </MDBox>
                </MDBox>
               
  );
}

export default New;
