import { server } from "../server-call/server";

export interface PropsArgs {
  amount: number;
  token?: string;
}
export const CreateAGameQuery = async (props: PropsArgs) => {
  const { token, amount } = props;
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
