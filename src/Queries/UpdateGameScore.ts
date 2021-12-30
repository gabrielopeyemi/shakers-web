import { server } from "../server-call/server";

export interface PropsArgs {
  gameId?: string;
  value?: number;
  token?: string;
}
export const UpdateGameScoreQuery = async (props: PropsArgs) => {
  const { gameId, value, token } = props;
  try {
    const data: any = await server.post({
      url: `/games/updateThrows/${gameId}/${value?.toString()}`,
      token,
    });
    return data;
  } catch (error: any) {
    throw error;
  }
};
