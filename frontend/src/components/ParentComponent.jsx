import React, { useState } from "react";
import { Row, Col, Card, Button, Table } from "antd";
import ModelComparison from "./ModelComparison";

const ParentComponent = () => {
  const [rfAccuracy, setRfAccuracy] = useState(0.85);
  const [xgbAccuracy, setXgbAccuracy] = useState(0.87);
  const [rfConfusionMatrix, setRfConfusionMatrix] = useState([
    [52, 0],
    [28, 20],
  ]);
  const [xgbConfusionMatrix, setXgbConfusionMatrix] = useState([
    [50, 2],
    [30, 18],
  ]);

  // Mock prediction function
  const handlePredict = async () => {
    // Replace this with your actual prediction logic
    return [
      { feature: "Age", value: 55, prediction: "No CKD" },
      { feature: "Blood Pressure", value: 80, prediction: "No CKD" },
      { feature: "Specific Gravity", value: 1.02, prediction: "No CKD" },
    ];
  };

  return (
    <div style={{ padding: "24px" }}>
      <ModelComparison
        rfAccuracy={rfAccuracy}
        xgbAccuracy={xgbAccuracy}
        rfConfusionMatrix={rfConfusionMatrix}
        xgbConfusionMatrix={xgbConfusionMatrix}
        onPredict={handlePredict} // Pass the prediction function
      />
    </div>
  );
};

export default ParentComponent;