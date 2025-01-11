import Analytics from "layouts/dashboards/analytics";
import ProfileOverview from "layouts/pages/profile/profile-overview";

import AViewer from "layouts/hrm/attendance/aviewer";
import Viewer from "layouts/tracking/viewer";
import Client from "layouts/vehicle-parking/client";
import UserList from "layouts/users/user-list";
import OrderList from "layouts/ecommerce/orders/order-list";
import ProductCategoryList from "layouts/ecommerce/products/product-category/product-category-list";
import ProductList from "layouts/ecommerce/products/product/product-list";
import DepartmentList from "layouts/hrm/department/department-list";
import AttendanceList from "layouts/hrm/attendance/attendance-list";
import EmployeeList from "layouts/hrm/employee/employee-list";
import Finder from "layouts/tracking/finder";
import CameraList from "layouts/tracking/camera/camera-list";
import LocationList from "layouts/tracking/location/location-list";
import StoreList from "layouts/ecommerce/stores/store-list";
import StoreCategoryList from "layouts/ecommerce/stores/store-category-list";
import TicketList from "layouts/vehicle-parking/ticket-list";
import SignInCover from "layouts/authentication/sign-in/cover";


import MDAvatar from "components/MDAvatar";

// @mui icons
import Icon from "@mui/material/Icon";

// Images
import profilePicture from "assets/images/team-3.jpg";

const routes = [
  {
    type: "collapse",
    name: localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).first_name + " " +  JSON.parse(localStorage.getItem('user_info')).last_name: null,
    key: "brooklyn-alice",
    icon: <MDAvatar src={''} size="sm" />,
    collapse: [
      {
        name: "My Profile",
        key: "my-profile",
        route: "/pages/profile/profile-overview",
        component: <ProfileOverview />,
      },
      // {
      //   name: "Settings",
      //   key: "profile-settings",
      //   route: "/pages/account/settings",
      //   component: <Settings />,
      // },
      {
        name: "Logout",
        key: "logout",
        route: "/users/login",
        component: <SignInCover />,
      },
    ],
  },
  { type: "divider", key: "divider-0" },
  
  { type: "title", title: "Admin", key: "admin" },
  {
    type: "collapse",
    name: "Dashboards",
    key: "dashboards",
    //icon: <Icon fontSize="small">dashboard</Icon>,
    collapse: [
      {
        name: "Analytics",
        key: "analytics",
        route: "/dashboards/analytics",
        component: <Analytics />,
      },

    ],
  },
  {
    type: "collapse",
    name: "User Management",
    key: "user-management",
    //icon: <Icon fontSize="small">dashboard</Icon>,
    collapse: [
      {
        name: "User",
        key: "user",
        route: "/user-management/users",
        component: <UserList />,
      },
    ],
  },
  
  { type: "title", title: "Smart Payment", key: "smart-payment" },
  {
    type: "collapse",
    name: "Store Management",
    key: "store-management",
    //icon: <Icon fontSize="small">dashboard</Icon>,
    collapse: [
      {
        name: "Store",
        key: "store",
        route: "/smart-payment/stores",
        component: <StoreList />,
      },
      {
        name: "Store Category",
        key: "store-category",
        route: "/smart-payment/store-categories",
        component: <StoreCategoryList />,
      },

    ],
  },
  {
    type: "collapse",
    name: "Order Management",
    key: "order-management",
    //icon: <Icon fontSize="small">dashboard</Icon>,
    collapse: [
      {
        name: "Order List",
        key: "order-list",
        route: "/ecommerce/orders/order-list",
        component: <OrderList />,
      },
      
    ],
  },
  {
    type: "collapse",
    name: "Product Management",
    key: "product-management",
    //icon: <Icon fontSize="small">dashboard</Icon>,
    collapse: [
      {
        name: "Product",
        key: "product",
        route: "/smart-payment/products/product-list",
        component: <ProductList />,
      },
      {
        name: "Product Category",
        key: "product-category",
        route: "/smart-payment/product-categories/product-category-list",
        component: <ProductCategoryList />,
      },
      
    ],
  },
  { type: "title", title: "Attendance", key: "attendance" },
  {
    type: "collapse",
    name: "Department",
    key: "department-management",
    //icon: <Icon fontSize="small">dashboard</Icon>,
    collapse: [
      {
        name: "Department List",
        key: "department-list",
        route: "/attendance/department-management/department-list",
        component: <DepartmentList />,
      },
      
    ],
  },
  {
    type: "collapse",
    name: "Employee",
    key: "employee-management",
    //icon: <Icon fontSize="small">dashboard</Icon>,
    collapse: [
      {
        name: "Employee List",
        key: "employee-list",
        route: "/attendance/employee-management/employee-list",
        component: <EmployeeList />,
      },
      
    ],
  },
  {
    type: "collapse",
    name: "Attendance List",
    key: "attendance-list",
    route: "/attendance/attendance-list",
    component: <AttendanceList />,
    noCollapse: true
  },
  {
    type: "collapse",
    name: "Attendance Viewer",
    key: "attendance-viewer",
    route: "/attendance/attendance-viewer",
    component: <AViewer />,
    noCollapse: true
  },
  { type: "title", title: "Tracking", key: "tracking" },
  {
    type: "collapse",
    name: "Camera Management",
    key: "camera-management",
    //icon: <Icon fontSize="small">dashboard</Icon>,
    collapse: [
      {
        name: "Camera List",
        key: "camera-list",
        route: "/tracking/camera-management/camera-list",
        component: <CameraList />,
      },
      {
        name: "Location List",
        key: "location-list",
        route: "/tracking/location-management/location-list",
        component: <LocationList />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Person Finder",
    key: "finder",
    route: "/tracking/finder",
    component: <Finder />,
    noCollapse: true
  },
  {
    type: "collapse",
    name: "Camera Viewer",
    key: "finder",
    route: "/tracking/viewer",
    component: <Viewer />,
    noCollapse: true
  },
  { type: "title", title: "Vehicle Parking", key: "vehicle-parking" },
  {
    type: "collapse",
    name: "Parking Tickets",
    key: "parking-tickets",
    //icon: <Icon fontSize="small">dashboard</Icon>,
    collapse: [
      {
        name: "Ticket List",
        key: "ticket-list",
        route: "/vehicle-tracking/parking-tickets/ticket-list",
        component: <TicketList />,
      },
      
    ],
  },
  {
    type: "collapse",
    name: "Client",
    key: "client",
    route: "/vehicle-parking/client",
    component: <Client />,
    noCollapse: true
  },
  
  
];

export default routes;
