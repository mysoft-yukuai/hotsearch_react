import { Card } from "antd";
import { useEffect, useState } from "react";
import { queryWordCloud } from "@/api/apiService";
import type { WordCloudType } from "@/api/apiService";
import WordCloud from "./WordCloud";
import type { WordCloudProps } from "./WordCloud";

export default () => {
  const [words, setWords] = useState<WordCloudProps["words"]>([]);

  useEffect(() => {
    queryWordCloud().then((res) => {
      const data = res.map((item: WordCloudType) => ({
        text: item.word,
        value: item.rate,
      }));
      setWords(data);
    });
  }, []);

  return (
    <Card>
      <WordCloud words={words} />
    </Card>
  );
};
