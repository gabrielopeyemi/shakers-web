import { server } from "../server-call/server";

export const getUserDetails = async (id: string) => {
  try {
    const response = await server.get({
      url: `/users/id/${id}`
    });

console.log({a: response.data.data.data});
    return response.data;

  } catch (error) {
    throw error;
  }
};
