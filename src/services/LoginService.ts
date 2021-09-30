import axios from "axios";
import { ConfigService } from "./ConfigService";

const apiClient = axios.create({
  baseURL: ConfigService.baseURL,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

export default {
  AutenticaInterno(usuario: string, password: string): Promise<any> {
    const params = {
      usuario: usuario,
      password: password,
    };

    return apiClient.post("/Login", params);
  },
};