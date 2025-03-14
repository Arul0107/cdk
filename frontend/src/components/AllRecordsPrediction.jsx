import React from "react";
import { Table } from "antd";

const AllRecordsPrediction = ({ data }) => {
  const columns = [
    ...data.columns.map((col) => ({ title: col, dataIndex: col, key: col })),
    { title: "Prediction", dataIndex: "Prediction", key: "Prediction" },
  ];

  return (
    <Card title="Predict CKD for All Records">
      <Table dataSource={data} columns={columns} />
    </Card>
  );
};

export default AllRecordsPrediction;