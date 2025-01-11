
import IdCell from "layouts/ecommerce/orders/order-list/components/IdCell";
import DefaultCell from "layouts/ecommerce/orders/order-list/components/DefaultCell";
import StatusCell from "layouts/ecommerce/orders/order-list/components/StatusCell";
import CustomerCell from "layouts/ecommerce/orders/order-list/components/CustomerCell";

const dataTableData = {
  columns: [
    //{ Header: "id", accessor: "id", Cell: ({ value }) => <IdCell id={value} /> },
    {
      Header: "name",
      accessor: "name",
      Cell: ({ value }) => {
        return (
          <DefaultCell
            value={value}
          />
        );
      },
    },
    {
      Header: "sku",
      accessor: "sku",
      Cell: ({ value }) => {
        return (
          <DefaultCell
            value={value}
          />
        );
      },
    },
    {
      Header: "category",
      accessor: "category",
      Cell: ({ value }) => {
        return (
          <DefaultCell
            value={value}
          />
        );
      },
    },
    {
      Header: "store",
      accessor: "store",
      Cell: ({ value }) => {
        return (
          <DefaultCell
            value={value}
          />
        );
      },
    },
    {
      Header: "price",
      accessor: "price",
      Cell: ({ value }) => {
        return (
          <DefaultCell
            value={value}
          />
        );
      },
    },
    {
      Header: "sale price",
      accessor: "sale_price",
      Cell: ({ value }) => {
        return (
          <DefaultCell
            value={value}
          />
        );
      },
    },
    { Header: "stock", accessor: "stock", Cell: ({ value }) => <DefaultCell value={value} /> },
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
