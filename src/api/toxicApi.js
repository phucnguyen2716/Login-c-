import axios from "axios";

export const detectToxic = async (message) => {
  try {
    const res = await axios.post("http://127.0.0.1:5000/predict", {
      message,
    });

    return res.data.toxic; 
  } catch (error) {
    console.error("Toxic API error:", error);
    return false;
  }
};
