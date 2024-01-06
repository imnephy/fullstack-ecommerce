import { StoreSchemaType } from "@/shared/schemas";
import axios from "axios";

export const postStore = async (params: StoreSchemaType) => {
  const { data } = await axios.post("/api/stores", params);
  console.log("[new store data]", data);

  return data;
};
