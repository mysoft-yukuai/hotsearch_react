import { Card, Button } from "antd";
import { useEffect, useState } from "react";
import { queryPoetry } from "@/api/apiService";
import type { PoetryType } from "@/api/apiService";
import { CSSProperties } from "react";
import bg1 from "@/assets/images/bgImg_1.png";
import bg2 from "@/assets/images/bgImg_2.png";
import bg3 from "@/assets/images/bgImg_3.png";
import { RefreshIcon } from "@/assets/icons";
import "./index.css";

const styles: CSSProperties[] = [
  {
    backgroundImage: `url(${bg1})`,
    color: "rgb(250 203 199)",
  },
  {
    backgroundImage: `url(${bg2})`,
    color: "#fff7b5",
  },
  {
    backgroundImage: `url(${bg3})`,
    color: "#FFFFFF",
  },
];
const randomizeStyle = () => styles[Math.floor(Math.random() * styles.length)];
export default () => {
  const [poetry, setPoetry] = useState<PoetryType | undefined>();
  const [currentStyle, setCurrentStyle] = useState<CSSProperties | undefined>();

  useEffect(() => {
    refreshContent();
  }, []);

  const refreshContent = () => {
    setCurrentStyle(randomizeStyle());
    queryPoetry().then((res) => setPoetry(res));
  };

  return (
    <Card className="poetry-excerpt-card" style={currentStyle}>
      {poetry ? (
        <div className="poetry-content">
          <p className="poetry-excerpt">{poetry.content}</p>
          <p className="poetry-meta">《{poetry.source}》</p>
          <p className="poetry-meta">{poetry.author}</p>
        </div>
      ) : (
        <div className="poetry-excerpt-loading">摘要加载中...</div>
      )}
      <Button
        className="refresh-button"
        shape="circle"
        ghost
        onClick={refreshContent}
        icon={<RefreshIcon />}
      />
    </Card>
  );
};
