import React, { useState } from "react";
import { Upload, Button, message, Table, Typography, Card, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import axios from "axios";
import * as Papa from "papaparse"; // For parsing CSV files
import uploadImage from "../assets/images/upload.png";

const { Title, Paragraph } = Typography;

const DataUploader = ({ onFileUpload }) => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);

  // Handle file upload
  const handleUpload = async (file) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (result) => {
        if (result.errors.length > 0) {
          message.error("Error parsing CSV file");
          console.error("CSV Parsing Errors:", result.errors);
          return;
        }

        if (result.data.length === 0) {
          message.error("The CSV file is empty");
          return;
        }

        setTableData(result.data);

        const tableColumns = Object.keys(result.data[0]).map((key) => ({
          title: key,
          dataIndex: key,
          key: key,
        }));
        setColumns(tableColumns);

        sendFileToBackend(file);
      },
    });
  };

  // Send file to backend
  const sendFileToBackend = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onFileUpload(response.data.data);
      message.success("File uploaded and processed successfully");
    } catch (error) {
      message.error("Failed to upload file");
      console.error("Upload Error:", error);
    }
  };

  return (
    <div className="predict" style={{ padding: "40px", textAlign: "center" }}>
      {/* Section: Unlock Your Health Insights */}
      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card
            style={{
              textAlign: "center",
              padding: "30px",
              backgroundColor: "#f0f2f5",
              borderRadius: "15px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Title level={2} style={{ color: "#1890ff", fontWeight: "bold" }}>
              Unlock Your Health Insights
            </Title>
            <Paragraph style={{ fontSize: "16px", color: "#555" }}>
              Experience the future of CKD risk assessment with AI-driven technology.
            </Paragraph>

            {/* Highlighted Upload Button */}
            <Row justify="center" style={{ marginTop: "20px" }}>
              <Col xs={24} sm={20} md={16} lg={12}>
                <Upload
                  name="file"
                  beforeUpload={(file) => {
                    if (file.type !== "text/csv") {
                      message.error("You can only upload CSV files!");
                      return false;
                    }
                    return true;
                  }}
                  customRequest={({ file, onSuccess }) => {
                    handleUpload(file);
                    onSuccess("ok");
                  }}
                  showUploadList={false}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      icon={<UploadOutlined />}
                      type="primary"
                      size="large"
                      style={{
                        backgroundColor: "#1890ff",
                        borderColor: "#1890ff",
                        color: "#fff",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        padding: "10px 20px",
                      }}
                    >
                      Upload CSV Dataset
                    </Button>
                  </motion.div>
                </Upload>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Upload Image Section */}
        <Col xs={24} md={12}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              style={{
                borderRadius: "15px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                padding: "15px",
              }}
            >
              <img
                src={uploadImage}
                alt="Upload Illustration"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                }}
              />
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Display Uploaded CSV Data */}
      {tableData.length > 0 && (
        <Row justify="center" style={{ marginTop: "30px" }}>
          <Col xs={24} sm={20} md={16} lg={12}>
            <Card
              style={{
                borderRadius: "15px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                padding: "20px",
              }}
            >
              <Title level={4} style={{ color: "#1890ff", fontWeight: "bold" }}>
                Uploaded Data
              </Title>
              <Table
                dataSource={tableData}
                columns={columns}
                pagination={{ pageSize: 5 }}
                scroll={{ x: true }}
                style={{ marginTop: "15px" }}
              />
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default DataUploader;
