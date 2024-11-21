import { Layout } from "antd";
import Header from "./layout/Header";
import Content from "./layout/Content";
import Footer from "./layout/Footer";
import { visitor } from "./api/apiService";
import { useEffect, useRef } from "react";

export default () => {
  const ref = useRef(false);

  useEffect(() => {
    if (!ref.current) {
      visitor();
      ref.current = true;
    }
  }, []);
  return (
    <Layout>
      <Header />
      <Content />
      <Footer />
    </Layout>
  );
};
