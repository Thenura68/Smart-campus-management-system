import axios from "axios";

const BASE_URL = "http://localhost:8080/api/user/tickets";

export const createTicket = async (formData) => {
  const response = await axios.post(BASE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};