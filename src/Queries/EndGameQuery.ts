import { server } from "../server-call/server";

export interface PropsArgs {
  gameId: string;
  token?: string;
}
export const EndGameQuery = async (props: PropsArgs) => {
  const { token, gameId } = props;
  try {
    const data: any = await server.post({
      url: `/games/stop/${gameId}`,
      token,
    });
    return data;
  } catch (error: any) {
    throw error;
  }
};
