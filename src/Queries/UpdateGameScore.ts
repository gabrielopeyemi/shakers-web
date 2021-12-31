import { server } from "../server-call/server";

export interface PropsArgs {
  gameId?: string;
  value1?: number;
  value2?: number;
  token?: string;
}
export const updateGameScore = async (props: PropsArgs) => {
  const { gameId, value1, value2, token } = props;
  try {
    const data: any = await server.post({
      url: `/games/updateThrows/${gameId}/${value1?.toString()}/${value2?.toString()}`,
      token,
    });
    return data;
  } catch (error: any) {
    throw error;
  }
};
