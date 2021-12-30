import { server } from "../server-call/server";

export interface PropsArgs {
  username?: string;
  password?: string;
}
export const LoginQuery = async (props: PropsArgs) => {
  const { username, password } = props;
  try {
    const data: any = await server.post({
      url: `/auth/login`,
      data: {
        username,
        password,
      },
    });
    return data;
  } catch (error: any) {
    throw error;
  }
};
