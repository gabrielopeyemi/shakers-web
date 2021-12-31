import { server } from "../server-call/server";

export interface PropsArgs {
  token?: string;
}
export const getGameThrows = async (gameId: string, token: string) => {
  try {
    const data: any = await server.post({
      url: `/games/get-throws/${gameId}`,
      token,
    });
    return data;
  } catch (error: any) {
    throw error;
  }
};
