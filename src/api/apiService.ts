import http from "./http";

export const queryHotSearchByKeyword = async (keyword: string | undefined) => {
  return http
    .get(`/hotsearch/QueryHotSearchByKeyword?keyword=${keyword}`)
    .then((res) => res.data);
};

export const getSentence = async () => {
  return http.get(`/welcome/querySentence`).then((res) => res.data);
};

export interface HotSearchType {
  heat: number;
  linkUrl: string;
  sort: number;
  title: string;
}
export const getHotSearch: (
  type: number
) => Promise<{ items: HotSearchType[]; lastUpdate: number }> = async (
  type: number
) => {
  return http
    .get(`/hotSearch/GetHotSearch?searchType=${type}`)
    .then((res) => res.data);
};

export interface VisitorCountType {
  todayPv: number;
  todayUv: number;
  allPv: number;
  allUv: number;
}
export const queryVisitorCount: () => Promise<VisitorCountType> = async () => {
  return http.get(`/welcome/queryVisitorCount`).then((res) => res.data);
};

export interface PoetryType {
  content: string;
  source: string;
  author: string;
}
export const queryPoetry: () => Promise<PoetryType> = async () => {
  return http.get(`/welcome/queryPoetry`).then((res) => res.data);
};

export interface CameraType {
  name: string;
  url: string;
}
export const queryCamera: () => Promise<CameraType[]> = async () => {
  return http.get(`/welcome/QueryCameras`).then((res) => res.data);
};

export interface WordCloudType {
  word: string;
  rate: number;
}
export const queryWordCloud: () => Promise<WordCloudType[]> = async () => {
  return http.get(`/welcome/queryWordCloud`).then((res) => res.data);
};

export const visitor = async () => {
  return http.post(`/welcome/visitor`).then((res) => res.data);
};
