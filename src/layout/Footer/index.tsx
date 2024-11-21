import { Layout } from "antd";
import { getSentence } from "@/api/apiService";
import "./index.css";
import { useEffect, useState } from "react";

const { Footer } = Layout;

export default () => {
  const [sentence, setSentence] = useState("");

  useEffect(() => {
    getSentence().then((res) => setSentence(res));
  }, []);

  return (
    <Footer className="footer">
      <span>{sentence}</span>
    </Footer>
  );
};
