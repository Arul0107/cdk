import { useState } from "react";
import { Form, Input, Select, Button, Modal } from "antd";
import axios from "axios";

export default function PredictPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict/", values);
      setResult(response.data.prediction);
    } catch (error) {
      setResult("Error making prediction");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Predict Chronic Kidney Disease</h2>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item name="age" label="Age"><Input type="number" /></Form.Item>
        <Form.Item name="bp" label="Blood Pressure"><Input type="number" /></Form.Item>
        <Form.Item name="sg" label="Specific Gravity"><Input type="number" step="0.01" /></Form.Item>
        <Form.Item name="rbc" label="Red Blood Cells">
          <Select options={[{ label: "Normal", value: "normal" }, { label: "Abnormal", value: "abnormal" }]} />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>Predict</Button>
      </Form>
      {result && (
        <Modal title="Prediction Result" visible={!!result} onCancel={() => setResult(null)} footer={null}>
          <p>{result}</p>
        </Modal>
      )}
    </div>
  );
}
