
// @mui material components
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import { Divider } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";


import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import BookingCard from "examples/Cards/BookingCard";

// Anaytics dashboard components
import AnalyticsTable from "layouts/dashboards/analytics/components/AnalyticsTable";

// Data
import reportsBarChartData from "layouts/dashboards/analytics/data/reportsBarChartData";
import { useState, useEffect } from "react";
// Images
import booking1 from "assets/images/products/product-1-min.jpg";
import booking2 from "assets/images/products/product-2-min.jpg";
import booking3 from "assets/images/products/product-3-min.jpg";
import * as PaymentServices from 'services/PaymentServices';
import * as UserServices from 'services/UserServices';
import * as FinderServices from 'services/FinderServices';
import * as EmployeeServices from 'services/EmployeeServices';
import * as DepartmentServices from 'services/DepartmentServices';
import * as AttendanceServices from 'services/AttendanceServices';
import { Payment } from "@mui/icons-material";
import Loading from "components/Loading";

function Analytics() {
  const [userCount, setUserCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [todayVisitors, setTodayVisitors] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [storeAnalytics, setStoreAnalytics] = useState();
  const [departmentAnalytics, setDepartmentAnalytics] = useState();
  const [todayAttendance, setTodayAttendance] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState({
    labels: [],
    datasets: { label: "Total revenue", data: [] },
  });
  const [sales, setSales] = useState({
    labels: [],
    datasets: { label: "Total sales", data: [] },
  })
  const [monthlyVisitors, setMonthlyVisitors] = useState({
    labels: [],
    datasets: { label: "Visitors", data: [] },
  });
  useEffect(() => {
    const getAnalyticsData = () => {
      const countSalesPromise = PaymentServices.countSales();
      const monthlyVisitorsPromise = FinderServices.monthlyVisitors();
      const countUserPromise = UserServices.count();
      const todayRevenuePromise = PaymentServices.todayRevenue();
      const todayVisitorsPromise = FinderServices.todayVisitors();
      const storeAnalyticsPromise = PaymentServices.storeAnalytics();
      const countEmployeePromise = EmployeeServices.countEmployees();
      const countDepartmentPromise = DepartmentServices.countDepartments();
      const departmentAnalyticsPromise = EmployeeServices.countEmployeesByDepartment();
      const todayAttendancesPromise = AttendanceServices.countTodayAttendances();
      const monthlyRevenuePromise = PaymentServices.monthlyRevenue();
      Promise.all([countSalesPromise, countUserPromise, todayRevenuePromise, todayVisitorsPromise, monthlyVisitorsPromise, storeAnalyticsPromise, countEmployeePromise, countDepartmentPromise, departmentAnalyticsPromise, todayAttendancesPromise, monthlyRevenuePromise]).then(results => {
        if (results[0]?.success) {
          setSales({labels: results[0].data.map(sale => sale.month), datasets: {label: "Total sales", data: results[0].data.map(sale => sale.total_payments)}})
        }
        if (results[1]?.success) {
          setUserCount(results[1].data[0].total);
        }
        if (results[2]?.success) {
          setTodayRevenue(results[2].data[0].total_revenue);
        }
        if (results[3]?.success) {
          setTodayVisitors(results[3].data[0].visitors);
        }
        if (results[4]?.success) {
          setMonthlyVisitors({labels: results[4].data.map(visitors => visitors.month), datasets: {label: "Visitors", data: results[4].data.map(visitors => visitors.visitors)}})
        }
        if (results[5]?.success) {
          setStoreAnalytics(results[5].data);
        }
        if (results[6]?.success) {
          setEmployeeCount(results[6].data[0].total);
        }
        if (results[7]?.success) {
          setDepartmentCount(results[7].data[0].total);
        }
        if (results[8]?.success) {
          setDepartmentAnalytics(results[8].data);
        }
        if (results[9]?.success) {
          setTodayAttendance(results[9].data[0].total);
        }
        if (results[10]?.success) {
          setMonthlyRevenue({labels: results[10].data.map(revenue => revenue.month), datasets: {label: "Total revenue", data: results[10].data.map(revenue => revenue.total_revenue)}});
        }
        setLoading(false);
      })
    }
    getAnalyticsData();
    // const getDataInterval = setInterval(() => {
    //   getAnalyticsData();
    // }, [4000])
    // return () => clearInterval(getDataInterval);
  }, [])
  // Action buttons for the BookingCard
  const actionButtons = (
    <>
      <Tooltip title="Refresh" placement="bottom">
        <MDTypography
          variant="body1"
          color="primary"
          lineHeight={1}
          sx={{ cursor: "pointer", mx: 3 }}
        >
          <Icon color="inherit">refresh</Icon>
        </MDTypography>
      </Tooltip>
      <Tooltip title="Edit" placement="bottom">
        <MDTypography
          variant="body1"
          color="info"
          lineHeight={1}
          sx={{ cursor: "pointer", mx: 3 }}
        >
          <Icon color="inherit">edit</Icon>
        </MDTypography>
      </Tooltip>
    </>
  );

  if (!loading) return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pb={3}>
        <MDBox mb={3} ml={1}>
          <MDTypography variant="h4" fontWeight="bold">
            Analytics
          </MDTypography>
          <MDTypography
            variant="button"
            fontWeight="regular"
            sx={{ fontSize: "16px", color: "#737373" }}
          >
            Check the mall's analytics.
          </MDTypography>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="success"
                  title="monthly visitors"
                  description="Number of visitors over months"
                  chart={monthlyVisitors}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="monthly sales"
                  description={"Number of sales over months"}
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="monthly revenue"
                  description="Total revenue over months"
                  chart={monthlyRevenue}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox>
                <ComplexStatisticsCard
                  icon="weekend"
                  title="Current Parking Count"
                  count={281}
                  
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox>
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="Total Users"
                  count={Number(userCount).toLocaleString('en-US')}
                  
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox>
                <ComplexStatisticsCard
                  icon="store"
                  title="Today's Revenue"
                  count={Number(todayRevenue).toLocaleString('en-US')}
                  
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox>
                <ComplexStatisticsCard
                  icon="person_add"
                  title="Today's Visitors"
                  count={Number(todayVisitors).toLocaleString('en-US')}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        
        <Grid container mt={3}>
          <AnalyticsTable data={storeAnalytics}/>
        </Grid>
        <Divider mt={3} mb={3}/>
        <MDTypography mb={2} variant="h5" fontWeight="bold">
            HR
          </MDTypography>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox>
                <ComplexStatisticsCard
                  icon="weekend"
                  title="Total Departments"
                  count={Number(departmentCount).toLocaleString('en-US')}
                  
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox>
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="Total Employees"
                  count={Number(employeeCount).toLocaleString('en-US')}
                  
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox>
                <ComplexStatisticsCard
                  icon="person"
                  title="Today's Attendance"
                  count={Number(todayAttendance).toLocaleString('en-US')}
                  
                />
              </MDBox>
            </Grid>
          </Grid>
          <Grid container mt={3}>
          <AnalyticsTable title="Department Analytics" description="Check the number of employees by department." data={departmentAnalytics}/>
        </Grid>
      </MDBox>
      
    </DashboardLayout>
  );
  else if (loading) return <Loading />
}

export default Analytics;
