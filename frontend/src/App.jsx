import React, { useState } from "react";
import { Row, Col, Divider } from "antd";
import DataUploader from "./components/DataUploader";
import ModelComparison from "./components/ModelComparison";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VedioAcc from "./components/VedioAcc";
const App = () => {
  const [data, setData] = useState(null);

  const handleFileUpload = (processedData) => {
    setData(processedData);
  };

  return (  
< >  <Navbar/>
<Hero/>
    
      <div >
      <Row gutter={16}>
        <Col span={24}>
          <DataUploader onFileUpload={handleFileUpload} />
        </Col>
      </Row>
      {data && (
        <ModelComparison
          rfAccuracy={0.85} // Replace with actual accuracy
          xgbAccuracy={0.87} // Replace with actual accuracy
          rfConfusionMatrix={[[50, 5], [3, 42]]} // Replace with actual matrix
          xgbConfusionMatrix={[[52, 3], [4, 41]]} // Replace with actual matrix
        />
      )}
      
    </div>
    <Divider/>
    <VedioAcc/>
    </>
  );
};

export default App;