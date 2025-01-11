
import IdCell from "layouts/ecommerce/orders/order-list/components/IdCell";
import DefaultCell from "layouts/ecommerce/orders/order-list/components/DefaultCell";
import StatusCell from "layouts/ecommerce/orders/order-list/components/StatusCell";
import CustomerCell from "layouts/ecommerce/orders/order-list/components/CustomerCell";

const dataTableData = {
  columns: [
    //{ Header: "id", accessor: "id", Cell: ({ value }) => <IdCell id={value} /> },
    {
      Header: "email",
      accessor: "email",
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
      Header: "Phone Number",
      accessor: "phone_number",
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
      Header: "Confidence",
      accessor: "confidence_score",
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
      Header: "Camera",
      accessor: "camera",
      Cell: ({ value }) => {
        const [name, data] = value;

        return (
          <DefaultCell
            value={typeof value === "string" ? value : name}
            suffix={data?.suffix || false}
          />
        );
      },
    },
    {
      Header: "Recognized At",
      accessor: "recognized_at",
      Cell: ({ value }) => {
        const [name, data] = value;

        return (
          <DefaultCell
            value={typeof value === "string" ? value : name}
            suffix={data?.suffix || false}
          />
        );
      },
    },
    //{ Header: "stock", accessor: "stock", Cell: ({ value }) => <DefaultCell value={value} /> },
  ],

  rows: [
    // {
    //   camera: "Camera 07 Shopping A 01",
    //   camera_id: "4f499685-0a4a-4b3e-bae1-491c562b52f2",
    //   confidence_score: "1.00",
    //   email: "kltntestuser0008@gmail.com",
    //   face_id: "732993ec-2fe1-4450-8a2b-9953c8868e61",
    //   frame_id: "bccbd5da-03c2-4ff6-9abb-64cfb10126cf",
    //   id: "0d306bb1-5a11-4c5d-a066-e014e3723176",
    //   phone_number: "0992597841",
    //   recognized_at: "2024-10-10T04:02:14.159Z"
    // }
  ],
};

export default dataTableData;
