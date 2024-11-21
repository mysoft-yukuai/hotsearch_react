import { Card, Calendar, ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import "./index.css";

export default () => {
  return (
    <Card className="card-calendar">
      <ConfigProvider locale={zhCN}>
        <Calendar fullscreen={false}></Calendar>
      </ConfigProvider>
    </Card>
  );
};
