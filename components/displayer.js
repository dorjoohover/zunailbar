import React from "react";

// ant components
import { Spin } from "antd";

// ant icon
import { LoadingOutlined, CloseCircleOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 32 }} spin />;

// render display based on status
const DataDisplayer = ({ status, data, render, events, error, form }) => {
  // console.log("status", status);
  switch (status) {
    case "success":
      return render({ data, events, form });
    case "error":
      return (
        <div key="02">
          <CloseCircleOutlined
            style={{ color: "red", marginBottom: "12px", fontSize: "24px" }}
          />
          {error}
        </div>
      );
    default:
      return (
        <div key="03">
          <Spin indicator={antIcon} />
        </div>
      );
  }
};

export default DataDisplayer;
