import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

function UploadPage() {
  const props = {
    customRequest: async ({ file, onSuccess, onError }) => {
      const formData = new FormData();
      formData.append("file", file);
      
      try {
        await axios.post("http://127.0.0.1:8000/upload/", formData);
        message.success("File uploaded successfully");
        onSuccess();
      } catch (error) {
        message.error("Upload failed");
        onError(error);
      }
    }
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Upload CSV</Button>
    </Upload>
  );
}

export default UploadPage;
