
import IdCell from "layouts/ecommerce/orders/order-list/components/IdCell";
import DefaultCell from "layouts/ecommerce/orders/order-list/components/DefaultCell";
import StatusCell from "layouts/ecommerce/orders/order-list/components/StatusCell";
import CustomerCell from "layouts/ecommerce/orders/order-list/components/CustomerCell";

const dataTableData = {
  columns: [
    //{ Header: "id", accessor: "id", Cell: ({ value }) => <IdCell id={value} /> },
    {
      Header: "code",
      accessor: "employee_code",
      Cell: ({ value }) => {
                return (
          <DefaultCell
            value={value}
          />
        );
      },
    },
    {
      Header: "department",
      accessor: "department",
      Cell: ({ value }) => {

        return (
          <DefaultCell
            value={value}
          />
        );
      },
    },
    {
      Header: "first name",
      accessor: "first_name",
      Cell: ({ value }) => {
                return (
          <DefaultCell
            value={value}
          />
        );
      },
    },
    {
      Header: "last name",
      accessor: "last_name",
      Cell: ({ value }) => {
                return (
          <DefaultCell
            value={value}
          />
        );
      },
    },
    {
      Header: "position",
      accessor: "position",
      Cell: ({ value }) => {
        const [name, data] = value;
        return (
          <DefaultCell
            value={typeof value === "string" ? value : name}
            suffix={data.suffix || false}
          />
        );
      },
    },
    {
      Header: "phone number",
      accessor: "phone_number",
      Cell: ({ value }) => {
                return (
          <DefaultCell
            value={value}
          />
        );
      },
    },
    {
      Header: "dob",
      accessor: "dob",
      Cell: ({ value }) => {
                return (
          <DefaultCell
            value={value}
          />
        );
      },
    },
    {
      Header: "gender",
      accessor: "gender",
      Cell: ({ value }) => {
        const [name, data] = value;
        return (
          <DefaultCell
            value={typeof value === "string" ? value : name}
            suffix={data && data.suffix || false}
          />
        );
      },
    },
    {
      Header: "email",
      accessor: "email",
      Cell: ({ value }) => {
                return (
          <DefaultCell
            value={value}
          />
        );
      },
    },
    {
      Header: "address",
      accessor: "address",
      Cell: ({ value }) => {
                return (
          <DefaultCell
            value={value}
          />
        );
      },
    },
    
    //{ Header: "stock", accessor: "stock", Cell: ({ value }) => <DefaultCell value={value} /> },
  ],

  rows: [
    // {
    //   id: "#10421",
    //   date: "1 Nov, 10:20 AM",
    //   status: "paid",
    //   customer: "Orlando Imieto",
    //   product: "Nike Sport V2",
    //   revenue: "$140,20",
    // },
  ],
};

export default dataTableData;
