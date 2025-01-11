
import IdCell from "layouts/ecommerce/orders/order-list/components/IdCell";
import DefaultCell from "layouts/ecommerce/orders/order-list/components/DefaultCell";
import StatusCell from "layouts/ecommerce/orders/order-list/components/StatusCell";
import CustomerCell from "layouts/ecommerce/orders/order-list/components/CustomerCell";

const dataTableData = {
  columns: [
    //{ Header: "id", accessor: "id", Cell: ({ value }) => <IdCell id={value} /> },
    {
      Header: "id",
      accessor: "id",
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
      Header: "Plate Number",
      accessor: "plate_number",
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
      Header: "User",
      accessor: "email",
      Cell: ({ value }) => {

        return (
          <DefaultCell
            value={value? value : "Guest"}
          />
        );
      },
    },
    {
      Header: "Check-in",
      accessor: "check_in",
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
      Header: "Check-out",
      accessor: "check_out",
      Cell: ({ value }) => {

        return (
          <DefaultCell
            value={value}
            suffix={value || false}
          />
        );
      },
    },
    {
      Header: "Status",
      accessor: "status",
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
