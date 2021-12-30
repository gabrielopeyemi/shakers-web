import { server } from "../server-call/server";

export const GetAllGames = async (props: string) => {
  try {
    const response = await server.get({
      url: `/games/list`,
      token: props,
    });
    console.log({response: response.data.data.data})

    const customerList = response.data.data.data.filter(
      (cutomer: any) => !cutomer.joiner
    );
    return customerList;

  } catch (error) {
    throw error;
  }
};
