
import { VectorMap } from "@react-jvectormap/core";
import { worldMerc } from "@react-jvectormap/world";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";


import SalesTable from "examples/Tables/SalesTable";

function AnalyticsTable({data, title="Sales by Store", description='Check the sales and revenue by store.'}) {
  return (
    <Card sx={{ width: "100%" }}>
      <MDBox>
        <MDTypography variant="h6" sx={{ mt: 2, ml: 2 }}>
          {title}
        </MDTypography>
        <MDTypography
          variant="body2"
          color="text"
          sx={{ fontSize: "14px", mb: 1, ml: 2 }}
        >
          {description}
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <Grid container>
        <SalesTable rows={data} shadow={false} />
          
        </Grid>
      </MDBox>
    </Card>
  );
}

export default AnalyticsTable;
