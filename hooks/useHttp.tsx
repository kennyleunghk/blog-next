import axios from "axios";

export const useHttp = async (method: string, path: string, payload: any) => {
  switch (method.trim().toLowerCase()) {
    case "get": {
      const result = await axios.get(path);
      return result.data;
    }
    case "post": {
      if (path.trim().length !== 0) {
        if (payload === undefined || payload.typeof !== "object") {
        }
        const result = await axios.post(path, payload);
        return await result.data;
      }
    }
    case "put": {
      return "put";
    }
    case "patch": {
      return "patch";
    }
    case "delete": {
      return "delete";
    }
  }
};
