import { useState } from "react";
import { Layout, Select, Form, Spin, Space } from "antd";
import type { SelectProps } from "antd";
import { SearchIcon } from "@/assets/icons";
import { queryHotSearchByKeyword } from "@/api/apiService";
import { hotSearchType } from "@/utils/enums";
import "./index.css";
const { Header } = Layout;

const getResourceInfo = (resourceType: Number) => {
  const resource = hotSearchType.find((board) => board.type === resourceType);
  return resource || { icon: "", title: "" };
};

export default () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [options, setOptions] = useState<SelectProps["options"]>([]);

  const handleSearch = async (query: string) => {
    if (!query) {
      setOptions([]);
      return;
    }
    setSearchQuery(query);
    setLoading(true);
    try {
      const data = await queryHotSearchByKeyword(query);
      setOptions(data);
    } finally {
      setLoading(false);
    }
  };

  const redirect = (_name: any, option: any) => {
    if (option.key) window.open(option.key, "_blank");
  };

  return (
    <Header>
      <div className="header-container">
        <Form className="search-form">
          <Select
            className="search-input"
            showSearch
            searchValue={searchQuery}
            filterOption={false}
            placeholder="努力上班，从不摸鱼！"
            suffixIcon={<SearchIcon />}
            notFoundContent={loading ? <Spin size="small" /> : null}
            onSearch={handleSearch}
            onFocus={(e: any) => handleSearch(e.target.value)}
            onSelect={redirect}
          >
            {options?.map((item) => (
              <Select.Option key={item.linkUrl} value={item.title}>
                <div className="search-option">
                  <span className="search-option-title">{item.title}</span>
                  <span className="search-option-icon">
                    <Space>
                      {
                        <img
                          src={getResourceInfo(item.type).icon}
                          style={{
                            width: "16px",
                            height: "16px",
                            verticalAlign: "middle",
                          }}
                        />
                      }
                      {<span>{getResourceInfo(item.type).title}</span>}
                    </Space>
                  </span>
                </div>
              </Select.Option>
            ))}
          </Select>
        </Form>
      </div>
    </Header>
  );
};
