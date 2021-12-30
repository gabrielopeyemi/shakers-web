import { server } from "../server-call/server";

export interface PropsArgs {
  token?: string;
}
export const CheckIfUserIsInAGameQuery = async (props: string) => {
  try {
    const data: any = await server.post({
      url: `/users/games`,
      token: props,
    });
    return data;
  } catch (error: any) {
    throw error;
  }
};
