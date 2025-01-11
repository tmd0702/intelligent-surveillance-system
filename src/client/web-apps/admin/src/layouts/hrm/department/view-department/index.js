import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import Info from "./components/StoreInfo";

import * as StoreServices from 'services/StoreServices';
import * as StoreCategoryServices from 'services/StoreCategoryServices';
import { useState, useEffect } from "react";

function View({info, handleClickUpdate}) {
  return (
                <MDBox>
                  <Info info={info}/>
                  <MDBox
                    mt={3}
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                  >
                   
                    <MDButton
                      variant="gradient"
                      color="dark"
                      onClick={(e) => handleClickUpdate(info)}
                    >
                      {"update"}
                    </MDButton>
                  </MDBox>
                </MDBox>
               
  );
}

export default View;
