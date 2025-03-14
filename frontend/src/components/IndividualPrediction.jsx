import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";

const IndividualPrediction = ({ features, onPredict }) => {
  const [form] = Form.useForm();

  const handlePredict = () => {
    form
      .validateFields()
      .then((values) => {
        onPredict(values);
      })
      .catch(() => {
        message.error("Please fill all fields!");
      });
  };

  return (
    <Card title="Predict CKD for an Individual Record">
      <Form form={form} layout="vertical">
        {features.map((feature) => (
          <Form.Item
            key={feature}
            name={feature}
            label={feature}
            rules={[{ required: true, message: `Please input ${feature}!` }]}
          >
            <Input />
          </Form.Item>
        ))}
        <Button type="primary" onClick={handlePredict}>
          Predict CKD
        </Button>
      </Form>
    </Card>
  );
};

export default IndividualPrediction;