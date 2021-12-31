import { transferSOL, wrappedLocalStorage } from "../functions";
import { server } from "../server-call/server";

export interface PropsArgs {
  gameId: string;
  token?: string;
  amount: number;
}

const userPublicKey = wrappedLocalStorage('PUBLIC_KEY').get();

export const JoinGameQuery = async (props: PropsArgs) => {
  const { token, gameId, amount } = props;

/**
 *  const sent = await transferSOL(amount);

  if (!sent) {
    throw ("An error occured while sending the token");
  }

 */
 

  try {
    const data: any = await server.post({
      url: `/games/join/${gameId.toString()}/${userPublicKey}`,
      token,
    });
    return data;
  } catch (error: any) {
    throw error;
  }
};
