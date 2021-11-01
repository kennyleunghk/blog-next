import axios from 'axios';

export const useHttp: (method: string, path: string, payload: any) => any =
  async (method: string, path: string, payload: any) => {
    // check if method is correct
    if (
      method.trim().toLowerCase() !== 'get' &&
      method.trim().toLowerCase() !== 'post' &&
      method.trim().toLowerCase() !== 'patch' &&
      method.trim().toLowerCase() !== 'put' &&
      method.trim().toLowerCase() !== 'delete'
    ) {
      throw new Error('Request method is not allowed');
    } else {
      // check if path is correct
      if (path.trim().length === 0) {
        throw new Error('Request path is not specified');
      } else {
        // when method is get, nothing to check
        if (method.trim().toLowerCase() === 'get') {
          const result = await axios.get(path);
          return result.data;
        } else {
          // other method would need to check the payload
          if (typeof payload !== 'object' || payload === {}) {
            throw new Error('Request body/header incorrect');
          } else {
            switch (method.trim().toLowerCase()) {
              case 'post': {
                console.log(payload.body);
                const result = await axios.post(
                  path,
                  payload.body,
                  payload.header,
                );
                return await result.data;
              }
              case 'put': {
                const result = axios.put(path, payload.body, payload.header);
                return result;
              }
              case 'patch': {
                const result = axios.patch(path, payload.body, payload.header);
                return result;
              }
              case 'delete': {
                const result = axios.delete(path, payload.body);
                return result;
              }
            }
          }
        }
      }
    }
  };
