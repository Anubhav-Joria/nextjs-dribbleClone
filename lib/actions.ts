import { createUserMutation, getUserQuery } from "@/graphQl";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NEXTAUTH_URL === "production";

const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "anything";
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL || ""
  : "http://localhost:8080";
const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables: any = {}) => {
  try {
    return await client.request(query, variables);
  } catch (err) {
    console.log(err);
  }
};

export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);
  const variables = {
    input: {
      name,
      email,
      avatarUrl,
    },
  };
  return makeGraphQLRequest(createUserMutation, variables);
};
