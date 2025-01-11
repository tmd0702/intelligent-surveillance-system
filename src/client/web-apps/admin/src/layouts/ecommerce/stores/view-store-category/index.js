import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import StoreCategoryInfo from "./components/Info";

function ViewStoreCategory({storeCategory, handleClickUpdate}) {

  return (
                <MDBox>
                  <StoreCategoryInfo storeCategory={storeCategory}/>
                  <MDBox
                    mt={3}
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                  >
                   
                    <MDButton
                      variant="gradient"
                      color="dark"
                      onClick={(e) => handleClickUpdate(storeCategory)}
                    >
                      {"update"}
                    </MDButton>
                  </MDBox>
                </MDBox>
               
  );
}

export default ViewStoreCategory;
