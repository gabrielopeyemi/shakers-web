import { server } from "../server-call/server";

export interface PropsArgs {
  userName?: string;
  firstName?: string;
  lastName?: string;
  password?: string;

}
export const CreateQueries = async (props: PropsArgs) => {
  const { userName, lastName, firstName, password } = props;
  try {
    const data: any = await server.post({
      url: `/users/create`,
      data: {
        userName,
        password,
      },
    });
    return data;
  } catch (error: any) {
    throw error;
  }
};
