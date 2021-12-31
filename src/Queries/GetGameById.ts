import { server } from "../server-call/server";

export interface PropsArgs {
  token?: string;
}
export const getGameByIdQuery = async (token: string, id: string) => {
  try {
    const data: any = await server.get({
      url: `/games/${id}`,
      token,
    });
    return data;
  } catch (error: any) {
    throw error;
  }
};
