import React from "react";
import { Row, Col, Collapse, Card } from "antd";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";

const { Panel } = Collapse;

const VedioAcc = () => {
  return (
    <div
      style={{
        background:"#252525",
        padding: "40px",
        color: "white",
      }}
    >
      <Row gutter={[24, 24]} align="middle">
        {/* Left Column: AI-Styled Accordion */}
        <Col xs={24} md={12}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              style={{
               
                borderRadius: "12px",
              }}
            >
              <Collapse
                defaultActiveKey={["1"]}
                accordion
                ghost
                expandIconPosition="right"
              >
                <Panel
                  header="🧠 Chronic Kidney Disease Prediction"
                  key="1"
                  style={{ fontWeight: "bold", fontSize: "16px" }}
                >
                  <p>
                    Chronic Kidney Disease (CKD) is a progressive condition where kidneys 
                    lose function over time. Early detection and treatment are crucial.
                  </p>
                </Panel>
                <Panel
                  header="🔬 Causes & Symptoms"
                  key="2"
                  style={{ fontWeight: "bold", fontSize: "16px" }}
                >
                  <p>
                    CKD can be caused by high blood pressure, diabetes, and more. Symptoms 
                    include swelling, fatigue, and difficulty concentrating.
                  </p>
                </Panel>
                <Panel
                  header="🤖 How AI Helps in Prediction?"
                  key="3"
                  style={{ fontWeight: "bold", fontSize: "16px" }}
                >
                  <p>
                    AI models analyze medical data to predict CKD risk early, 
                    improving diagnosis and treatment planning.
                  </p>
                </Panel>
              </Collapse>
            </Card>
          </motion.div>
        </Col>

        {/* Right Column: AI-Themed Video Player */}
        <Col xs={24} md={12}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              style={{
                background: "#",
                borderRadius: "12px",
                padding: "10px",
              }}
            >
             <ReactPlayer
  url="https://youtu.be/raPiApqSJPc?si=GO-qIAWYfAbEr0dt"
  width="100%"
  height="300px"
  controls={true}
/>

            </Card>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
};

export default VedioAcc;
