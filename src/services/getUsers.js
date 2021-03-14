import axios from "axios";

export const getUsers = async () => {
  const response = await axios.get(
    "https://dummyapi.io/data/api/user?limit=10",
    {
      headers: {
        asd: 123,
        "app-id": "60349db146ff8b0837d18351",
      },
    }
  );
  return response.data;
};
