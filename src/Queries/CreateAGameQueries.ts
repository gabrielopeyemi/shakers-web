import { server } from "../server-call/server";
import {
  depositNativeToken,
} from "zebecprotocol-sdk";
import { transferSOL, wrappedLocalStorage } from "../functions";
export interface PropsArgs {
  amount: number;
  token?: string;
}

const userPublicKey = wrappedLocalStorage('PUBLIC_KEY').get();



export const CreateAGameQuery = async (props: PropsArgs) => {
  const { token, amount } = props;

  const sent = await transferSOL(amount);

  if (!sent) {
    throw ("An error occured while sending the token");
  }

  try {
    const data: any = await server.post({
      url: `/games/start/${amount.toString()}`,
      data: {
        amount,
      },
      token,
    });
    return data;
  } catch (error: any) {
    throw error;
  }
};
