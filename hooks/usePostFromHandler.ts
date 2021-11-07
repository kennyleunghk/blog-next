import axios, { AxiosResponse } from 'axios';
import { BACKEND } from '../config';
import { useHttp } from './useHttp';

interface HandlerProps {
  type: string;
  payload: any;
}

const usePostFromHandler = async (type: string, payload: any) => {
  switch (type) {
    case 'new': {
      try {
        const result = await useHttp('put', `${BACKEND}`, payload);
        if (result) {
          return result.data;
        }
      } catch (error) {
        console.log(error);
      }
    }
    case 'update': {
      try {
        const result = await useHttp('patch', `${BACKEND}`, payload);
        if (result) {
          return result.data;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export default usePostFromHandler;
