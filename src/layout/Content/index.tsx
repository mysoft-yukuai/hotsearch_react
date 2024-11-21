import { Layout, Row, Col, Space } from "antd";
import Board from "@/components/Board";
import Visitor from "@/components/Visitor";
import HolidayCalendar from "@/components/HolidayCalendar";
import WordCloud from "@/components/WordCloud";
import Poetry from "@/components/Poetry";
import CameraPlayer from "@/components/CameraPlayer";
import { hotSearchType } from "@/utils/enums";

const { Content } = Layout;

export default () => {
  return (
    <Content style={{ padding: "10px" }}>
      <Row gutter={10}>
        <Col span={20}>
          <Row gutter={10}>
            {hotSearchType.map((item) => {
              return (
                <Col span={6} key={item.type}>
                  <Board title={item.title} icon={item.icon} type={item.type} />
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col span={4}>
          <Space direction="vertical">
            <Visitor />
            <HolidayCalendar />
            <WordCloud />
            <Poetry />
            <CameraPlayer />
          </Space>
        </Col>
      </Row>
    </Content>
  );
};
