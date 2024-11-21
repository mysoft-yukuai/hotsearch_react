import { useEffect, useState } from "react";
import { Card, Space } from "antd";
import { queryVisitorCount } from "@/api/apiService";
import type { VisitorCountType } from "@/api/apiService";
import "./index.css";
export default () => {
  const [statsData, setStatsData] = useState<VisitorCountType>({
    todayPv: 0,
    todayUv: 0,
    allPv: 0,
    allUv: 0,
  });

  useEffect(() => {
    queryVisitorCount().then((res) => setStatsData(res));
  }, []);

  return (
    <Card className="stats-card-main">
      <Space direction="vertical" style={{ width: "100%" }}>
        <div className="stats-section">
          <div className="stats-value-main">{statsData.todayPv}</div>
          <div className="stats-label-main">今日访问次数</div>
        </div>
        <div className="stats-section stats-others">
          <div className="stats-item">
            <div className="stats-value-small">{statsData.todayUv}</div>
            <div className="stats-label-small">今日访问量</div>
          </div>
          <div className="stats-item">
            <div className="stats-value-small">{statsData.allPv}</div>
            <div className="stats-label-small">总访问次数</div>
          </div>
          <div className="stats-item">
            <div className="stats-value-small">{statsData.allUv}</div>
            <div className="stats-label-small">总访问量</div>
          </div>
        </div>
      </Space>
    </Card>
  );
};
