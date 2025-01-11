
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
      Header: "description",
      accessor: "description",
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
