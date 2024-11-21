import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import d3cloud from "d3-cloud";
import * as d3ScaleChromatic from "d3-scale-chromatic";
import "./WordCloud.css";
interface Word {
  text: string;
  value: number;
}
interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
export interface WordCloudProps {
  words: Word[];
  margin?: Margin;
  fontSize?: number[];
}

const getRotation = () => {
  const multiplier = (Math.abs(-60) + Math.abs(60)) / (5 - 1) || 1;
  return { a: 5, b: -60 / multiplier, c: multiplier };
};
const WordCloud: React.FC<WordCloudProps> = ({
  words,
  margin = {
    top: 15,
    right: 15,
    bottom: 15,
    left: 15,
  },
  fontSize = [10, 20],
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleResize = () => {
    if (ref.current) {
      setDimensions({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (ref.current) d3.select(ref.current).select("svg").remove();

    const svgWidth = dimensions.width;
    const svgHeight = dimensions.height;
    if (svgWidth && svgHeight) {
      const fontSizeScale = d3.scaleSqrt().range(fontSize);

      if (words.length) {
        const maxValue = d3.max(words, (d) => d.value) || 1;
        const minValue = d3.min(words, (d) => d.value) || 1;

        fontSizeScale.domain([minValue, maxValue]);
      }

      const width = svgWidth - margin.left - margin.right;
      const height = svgHeight - margin.top - margin.bottom;

      const chart = d3
        .select(ref.current)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .append("g")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "chart")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const { a, b, c } = getRotation();

      const draw = (data: any[]) => {
        const fill = d3.scaleOrdinal(d3ScaleChromatic.schemeCategory10);

        chart
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
          .selectAll("text")
          .data(data)
          .enter()
          .append("text")
          .style("font-size", (d) => d.size + "px")
          .style("font-family", (d) => d.font)
          .style("fill", (_d, i) => fill(i.toString()))
          .attr("class", "text")
          .attr("text-anchor", "middle")
          .transition()
          .attr(
            "transform",
            (d) => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"
          )
          .text((d) => d.text);
      };

      d3cloud()
        .size([width, height])
        .words(words.map((word) => ({ text: word.text, size: word.value })))
        .fontSize((d) => fontSizeScale(d.size || 0))
        .text((d) => d.text || "")
        .font("impact")
        .padding(3)
        .rotate(() => (~~(Math.random() * a) + b) * c)
        .spiral("archimedean")
        .on("end", draw)
        .start();
    }
  }, [dimensions, words]);

  return <div className="wordCloud" ref={ref}></div>;
};

export default WordCloud;
