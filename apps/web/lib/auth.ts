import { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      [key: string]: string;
    };
  }
}

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    // Credentials({
    //   name: "Credentials",
    //   credentials: {
    //     username: {},
    //     password: {},
    //   },
    //   async authorize(credentials) {
    //     // check to see if email and password is there
    //     if (!credentials?.username || !credentials?.password) {
    //       throw new Error("Please enter an email and password");
    //     }
    //
    //     // check to see if user exists
    //
    //     const user = await db.user.findFirst({
    //       where: {
    //         username: credentials.username,
    //       },
    //     });
    //
    //     // if no user was found
    //     if (!user || !user?.password) {
    //       throw new Error("No user found");
    //     }
    //
    //     // check to see if password matches
    //     const passwordMatch = await bcrypt.compare(
    //       credentials.password,
    //       user.password,
    //     );
    //
    //     // if password does not match
    //     if (!passwordMatch) {
    //       throw new Error("Incorrect password");
    //     }
    //
    //     return user;
    //   },
    // }),
  ],
  callbacks: {
    async session({ session, token }) {
      return { ...session, user: { ...session.user, id: token.sub } };
    },
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/wizard",
  },
  secret: process.env.SECRET,
};

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
