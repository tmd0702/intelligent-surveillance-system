
import IdCell from "layouts/ecommerce/orders/order-list/components/IdCell";
import DefaultCell from "layouts/ecommerce/orders/order-list/components/DefaultCell";
import StatusCell from "layouts/ecommerce/orders/order-list/components/StatusCell";
import CustomerCell from "layouts/ecommerce/orders/order-list/components/CustomerCell";
function formatDateTimeVN(isoString) {
  try {
      const date = new Date(isoString);

      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
      const year = date.getFullYear();
      const formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  
      return formattedDate;
  } catch(error) {
      return isoString;
  }
  
}
const dataTableData = {
  columns: [
    //{ Header: "id", accessor: "id", Cell: ({ value }) => <IdCell id={value} /> },
    {
      Header: "Employee Code",
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
      Header: "Captured At",
      accessor: "created_at",
      Cell: ({ value }) => {
        
        return (
          <DefaultCell
            value={formatDateTimeVN(value)}
          />
        );
      },
    },
    {
      Header: "Confidence",
      accessor: "confidence_score",
      Cell: ({ value }) => {
        
        return (
          <DefaultCell
            value={Math.round(value * 100) / 100}
          />
        );
      },
    },
    {
      Header: "Status",
      accessor: "status",
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
