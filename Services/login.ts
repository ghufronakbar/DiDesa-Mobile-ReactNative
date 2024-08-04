import axiosInstance from "utils/axiosInstance";

const login = async (nik: string, password: string) => {
  const response = await axiosInstance.post("/account/login", {
    nik,
    password,
  });
  return response.data;
};

export { login };
