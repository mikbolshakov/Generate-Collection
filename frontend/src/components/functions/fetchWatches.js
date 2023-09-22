import axios from "axios";

export const fetchWatches = async () => {
  try {
    const response = await axios.get("http://localhost:3500/all");
    return response.data;
  } catch (error) {
    console.error(error);
    alert("Watches display error");
  }
};
