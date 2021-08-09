import client from "./client";
import qs from "qs";

export const writePost = ({ title, body, tags }) => {
  return client.post("/api/post", { title, body, tags });
};

export const readPost = (id) => client.get(`/api/post/${id}`);

export const listPosts = ({ page, username, tag }) => {
  const queryString = qs.stringify({ page, username, tag });
  return client.get(`/api/post?${queryString}`);
};

export const updatePost = ({ id, title, body, tags }) => {
  client.patch(`/api/post/${id}`, { title, body, tags });
};

export const removePost = (id) => client.delete(`/api/post/${id}`);
