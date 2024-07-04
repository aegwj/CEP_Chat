// utils/api.ts
import axios, { AxiosResponse } from "axios";

export const registerUser = async (
  username: string,
  avatar: string,
  email: string,
  password: string
): Promise<AxiosResponse> => {
  return axios.post("http://localhost:3001/register", {
    username,
    avatar,
    email,
    password,
  });
};

export const loginUser = async (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  return axios.post("http://localhost:3001/login", {
    email,
    password,
  });
};

