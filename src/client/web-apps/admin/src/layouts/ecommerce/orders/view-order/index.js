
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";


import MDBox from "components/MDBox";


import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import * as OrderServices from 'services/OrderServices';
import * as UserServices from 'services/UserServices';
import * as StoreServices from 'services/StoreServices';
import { useEffect, useState } from "react";
import Header from "layouts/ecommerce/orders/order-details/components/Header";
import OrderInfo from "layouts/ecommerce/orders/order-details/components/OrderInfo";
import TrackOrder from "layouts/ecommerce/orders/order-details/components/TrackOrder";
import PaymentDetails from "layouts/ecommerce/orders/order-details/components/PaymentDetails";
import BillingInformation from "layouts/ecommerce/orders/order-details/components/BillingInformation";
import OrderSummary from "layouts/ecommerce/orders/order-details/components/OrderSummary";

function View({rdetail}) {
  const [detail, setDetail] = useState(rdetail);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState();
  const [store, setStore] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getUserPromise = UserServices.getUserById(detail.user_id);
    const getStorePromise = StoreServices.getStoreById(detail.store_id);
    const getItemsPromise = OrderServices.getOrderItemsByOrderId(detail.id);
    Promise.all([getUserPromise, getStorePromise, getItemsPromise]).then(results => {
      if (results[0]?.success) {
        setUser(results[0].data);
      }
      if (results[1]?.success) {
        setStore(results[1].data[0]);
      }
      if (results[2]?.success) {
        setItems(results[2].data);
        setLoading(false);
      }
      
    })
  }, []);
  if (!loading) return (
      <MDBox my={6}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox pt={2} px={2}>
                <Header detail={detail} store={store}/>
              </MDBox>
              <Divider />
              <MDBox pt={1} pb={3} px={2}>
                <MDBox mb={3}>
                  <OrderInfo items={items} detail={detail}/>
                </MDBox>
                <Divider />
                <MDBox mt={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={6}>
                      {/* <TrackOrder /> */}
                      <BillingInformation setDetail={setDetail} detail={detail} user={user} setUser={setUser} />
                      {/* <PaymentDetails /> */}
                    </Grid>
                    
                    <Grid item xs={12} lg={3} sx={{ ml: "auto" }}>
                      <OrderSummary detail={detail} items={items}/>
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
  );
}

export default View;
