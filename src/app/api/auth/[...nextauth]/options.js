import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Your Username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials) {
        const user = { id: 4, name: "mostafa", password: "123" };
        if (
          credentials?.username == user.name &&
          credentials?.password == user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
