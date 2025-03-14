import React, { useState } from "react";
import { Row, Col, Card, Button, Table, Modal, message } from "antd";
import { Column } from "@ant-design/charts";
import { Heatmap } from "@ant-design/plots";
import "./modal.css";

const ModelComparison = ({
  rfAccuracy,
  xgbAccuracy,
  rfConfusionMatrix,
  xgbConfusionMatrix,
  onPredict = () => {
    console.warn("onPredict function not provided");
    return [];
  }, // Default prop
}) => {
  // Data for accuracy comparison chart
  const accuracyData = [
    { model: "Random Forest", accuracy: rfAccuracy },
    { model: "XGBoost", accuracy: xgbAccuracy },
  ];

  const accuracyConfig = {
    data: accuracyData,
    xField: "model",
    yField: "accuracy",
    color: ["#1890ff", "#ff4d4f"],
    label: {
      position: "top", // Updated to a valid position
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
  };

  // Convert confusion matrices to heatmap data
  const rfHeatmapData = rfConfusionMatrix.flatMap((row, i) =>
    row.map((value, j) => ({
      x: `Predicted ${j}`,
      y: `Actual ${i}`,
      value,
    }))
  );

  const xgbHeatmapData = xgbConfusionMatrix.flatMap((row, i) =>
    row.map((value, j) => ({
      x: `Predicted ${j}`,
      y: `Actual ${i}`,
      value,
    }))
  );

  const heatmapConfig = {
    data: [],
    xField: "x",
    yField: "y",
    colorField: "value",
    color: ["#ffffff", "#1890ff"], // Customize colors
    legend: { position: "bottom" },
  };

  // State to store prediction results
  const [predictions, setPredictions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  // Handle prediction
  const handlePredict = async () => {
    if (typeof onPredict === "function") {
      try {
        const results = await onPredict(); // Call the prediction function passed as a prop
        setPredictions(results); // Update the state with prediction results
        setIsModalVisible(true); // Show the modal
        message.success("Prediction completed successfully!"); // Show success message
      } catch (error) {
        console.error("Prediction failed:", error);
        message.error("Prediction failed. Please try again."); // Show error message
      }
    } else {
      console.error("onPredict is not a function");
      message.error("Prediction function not available."); // Show error message
    }
  };

  // Close the modal
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  // Columns for the prediction results table
  const predictionColumns = [
    {
      title: "Feature",
      dataIndex: "feature",
      key: "feature",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Prediction",
      dataIndex: "prediction",
      key: "prediction",
    },
  ];

  return (
    <div className="div">
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Model Accuracy Comparison">
            <Column {...accuracyConfig} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Confusion Matrices">
            <Row gutter={16}>
              <Col span={12}>
                <Card title="Random Forest">
                  <Heatmap {...heatmapConfig} data={rfHeatmapData} />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="XGBoost">
                  <Heatmap {...heatmapConfig} data={xgbHeatmapData} />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Prediction Button and Results Table */}
        <Col span={24} style={{ marginTop: "20px" }}>
          <Card title="Predict CKD">
            <Button type="primary" onClick={handlePredict}>
              Predict CKD
            </Button>

            {predictions.length > 0 && (
              <Table
                className="modaltabel"
                dataSource={predictions}
                columns={predictionColumns}
                pagination={{ pageSize: 5 }}
                style={{ marginTop: "20px" }}
              />
            )}
          </Card>
        </Col>

        {/* Modal for Prediction Results */}
        <Modal
          title="Prediction Results"
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Close
            </Button>,
          ]}
        >
          <Table
            dataSource={predictions}
            columns={predictionColumns}
            pagination={{ pageSize: 5 }}
          />
        </Modal>
      </Row>
    </div>
  );
};

export default ModelComparison;
