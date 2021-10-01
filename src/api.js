import { message } from "antd";
import axios from "axios";
const baseUrl = "https://us-central1-timer-app-81306.cloudfunctions.net/app/";
export const getTasks = () =>
  axios.get(`${baseUrl}tasks`).then((res) => res.data);

export const getRoommates = () =>
  axios.get(`${baseUrl}roommates`).then((res) => res.data);
