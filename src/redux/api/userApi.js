import { api } from "./index";

const usersApi = api.injectEndpoints({
   endpoints: (build) => ({
      user: build.query({
         query: () => ({
            url: "users?page=2",
            method: "GET"
         }),
      }),
      userDelete: build.mutation({
         query: (id) => ({
            url: `users/${id}`,
            method: "DELETE",
         }),
      }),
      userCreate: build.mutation({
         query: (body) => ({
            url: "users",
            method: "POST",
            body,
         }),
      }),
         details: build.query({
            query: (id) => ({
               url: `users/${id}`,
               method: "GET",
            }),
         }),
   }),
});

export const { useUserQuery , useUserDeleteMutation , useUserCreateMutation, useDetailsQuery} = usersApi