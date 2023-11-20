import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/db";
import bycrpt from "bcrypt";

// Como fazer a autentificação
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Digite o email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const userFound = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!userFound) throw new Error("Usuário não foi encontrado");

        const matchPassword = await bycrpt.compare(
          credentials.password,
          userFound.password
        );

        if (!matchPassword) throw new Error("Senha incorreta");

        return {
          id: userFound.id,
          name: userFound.username,
          email: userFound.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
