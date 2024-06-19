import React, { useState, useEffect } from "react";
import { Upload, message, Button } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { config } from "../../../config";

const ImageUpload = ({ name, handleFinish, status }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setImageUrl("");
  }, [status]);

  const handleChange = (info) => {
    // console.log("$:/handler/upload ", info);
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      console.log("info.file.response.url", info.file.response.url);
      setImageUrl(info.file.response.url);
      setLoading(false);
      message.success(`${info.file.name} file uploaded successfully`);
      // console.log(info.file.response);
      handleFinish({
        [name]: info.file.response.url,
        // [name]: info.file.response.url,
      });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <Upload
      name="image"
      listType="picture"
      className="image-uploader"
      multiple={false}
      showUploadList={false}
      action={config.BACKEND_URL + "/api/" + config.APP_VERSION + "/upload"}
      onChange={handleChange}
      accept=".png, .jpg, .jpeg"
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          style={{ height: "150px", width: "150px" }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default ImageUpload;
