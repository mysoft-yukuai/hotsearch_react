import { Button, Card, Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { RefreshIcon, cameraIcon } from "@/assets/icons";
import { queryCamera } from "@/api/apiService";
import type { CameraType } from "@/api/apiService";
import "./index.css";

const { Link } = Typography;
export default () => {
  const [cameras, setCameras] = useState<CameraType[]>([]);
  const refreshCameras = () => {
    queryCamera().then((res) => {
      setCameras(res);
    });
  };

  useEffect(() => {
    refreshCameras();
  }, []);
  return (
    <Card
      className="camera-card"
      title={
        <div className="card-header">
          <span>随机全球高清实况摄像头</span>
          <Button
            className="refresh-button"
            shape="circle"
            ghost
            onClick={refreshCameras}
            icon={<RefreshIcon />}
          />
        </div>
      }
    >
      <Row gutter={10}>
        <Col span={24}>
          <div className="camera-list">
            {cameras &&
              cameras.map((item) => {
                return (
                  <div key={item.name} className="camera-item">
                    <img src={cameraIcon} className="camera-icon" />
                    <Link
                      href={item.url}
                      target="_blank"
                      className="camera-name"
                    >
                      {item.name}
                    </Link>
                  </div>
                );
              })}
          </div>
        </Col>
      </Row>
    </Card>
  );
};
