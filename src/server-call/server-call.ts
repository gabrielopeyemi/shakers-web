import {
  ServerCallProps,
  ServerCallVerbs,
  handleServerError,
  ServerResponse,
} from '.';
import { store } from '../../store';
import { server, ServerGetArgs } from './server';

export const serverCall = async (
  serverCallProps: ServerCallProps,
  verb?: ServerCallVerbs,
  authorized = false,
  onSuccess?: (data: any) => void,
  run = true,
  defaultError = 'Something Unusual Happened, please try again'
): Promise<ServerResponse | any> => {
  try {
    if (!run) {
      return;
    }
    verb = verb || ServerCallVerbs.Get;
    const props: ServerGetArgs<any> = serverCallProps;
    props.token = authorized ? store.getState().tokenReducer : undefined;
    const response: any = await server[verb](props);
    const { success, data: dataReturned } = response.data.data;
    if (success && onSuccess) {
      onSuccess(dataReturned);
    }
    return { success, dataReturned };
  } catch (error: any) {
    throw error
  }
};
