import buk from "../../utils/buk";
import { serverAPI } from "../Config/APIKEYS";


export const handleServerError = (
  error: any,
  serverTag: string,
  defaultError: string
) => {
  const errorMessage = error?.response?.data?.error;
  const status = error?.response?.status;
  buk.log({ errorMessage, status }, serverTag);

  if (status === 401) {
    window.location.href = '/logout?silent=1';
  }

  if (typeof errorMessage !== 'string' && !serverAPI) {
    buk.log({ error }, serverTag);
    //window.location.href = '/error';
    return { success: false, error: defaultError };
  }
  return { success: false, error: errorMessage };
};
