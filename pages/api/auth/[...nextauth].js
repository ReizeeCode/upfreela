import axios from "axios";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  // Configure um ou mais fornecedores de autenticação (facebook, github, etc)
  providers: [
    Providers.Credentials({
      name: "Credentials",
      // a função authorize faz uma request para a API, mandando as
      // credentials(usuario e senha), a API busca o usuário no database, se
      // encontrar, vai retornar 'true' e vai logar o usuário, se retornar 'false'
      // vai dar "null" e login inválido
      async authorize(credentials) {
        const res = await axios.post(
          "http://localhost:3000/api/auth/signin",
          credentials
        );

        const user = res.data;

        if (user) {
          return user;
        } else {
          throw "/auth/signin?i=1"; //lançar um erro com o endereço que vai direcionar o user
        }
      },
    }),
  ],

  session: {
    jwt: true, //JWT: JSON Web Token - mais um fator de segurança para a sessão
  },

  jwt: {
    secret: process.env.JWT_TOKEN, // (JWT_TOKEN) - conjunto de caracteres
  },

  callbacks: {
    // assim que faz o login esse callback é executado
    async jwt(token, user) {
      if (user) {
        token.uid = user.id ? user.id : user._id;
        console.log("token: " + token.uid);
      }
      return Promise.resolve(token);
    },

    async session(session, user) {
      session.userId = user.uid;
      // session.userId = token.uid
      return session;
    },
  },

  database: process.env.MONGODB_URI,
});
