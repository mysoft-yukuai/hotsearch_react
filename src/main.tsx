import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "./index.css";

dayjs.locale("zh-cn");
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
