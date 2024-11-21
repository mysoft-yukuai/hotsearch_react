import { useEffect, useState } from "react";
import { Card } from "antd";
import { getHotSearch } from "@/api/apiService";
import type { HotSearchType } from "@/api/apiService";
import "./index.css";

interface BoardProps {
  title: string;
  icon: string;
  type: number;
}

const getRankingClass = (sort: number) => {
  if (sort === 1) return "top-ranking-1";
  if (sort === 2) return "top-ranking-2";
  if (sort === 3) return "top-ranking-3";
  return "";
};

const formatHeat = (number: number) => {
  if (number < 1000) {
    return number.toString();
  }
  if (number >= 1000 && number < 10000) {
    return (number / 1000).toFixed(1) + "k";
  }
  if (number >= 10000) {
    return (number / 10000).toFixed(1) + " ";
  }
};
export default ({ type, icon, title }: BoardProps) => {
  const [lastupdate, setLastupdate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<HotSearchType[]>([]);

  useEffect(() => {
    getHotSearch(type)
      .then((res) => {
        setData(res.items);
        setLastupdate(res.lastUpdate);
      })
      .finally(() => setLoading(false));
  }, []);

  const formattedUpdateTime = () => {
    if (!lastupdate) return "";

    const updateDate = new Date(lastupdate).getTime();
    const now = Date.now();

    const timeDiff = now - updateDate;
    const minutesDiff = Math.floor(timeDiff / 1000 / 60);

    if (minutesDiff < 1) {
      return "刚刚更新";
    } else if (minutesDiff < 60) {
      return `${minutesDiff}分钟前更新`;
    } else if (minutesDiff < 1440) {
      return `${Math.floor(minutesDiff / 60)}小时前更新`;
    } else {
      return updateDate.toLocaleString();
    }
  };

  return (
    <Card
      className="card"
      loading={loading}
      title={
        <div className="card-title">
          <img src={icon} className="card-title-icon" />
          {title}热榜
          <span className="update-time">{formattedUpdateTime()}</span>
        </div>
      }
    >
      <div className="cell-group-scrollable">
        {data.map((item) => (
          <div
            key={item.sort}
            className={"cell-wrapper " + getRankingClass(item.sort)}
          >
            <span className="cell-order">{item.sort}</span>
            <span
              className="cell-title hover-effect"
              onClick={() =>
                item.linkUrl && window.open(item.linkUrl, "_blank")
              }
            >
              {item.title}
            </span>
            <span className="cell-heat">{formatHeat(item.heat)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
