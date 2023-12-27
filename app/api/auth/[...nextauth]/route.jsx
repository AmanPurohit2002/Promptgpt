import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import connectedToDb from "@utils/db";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // get the data of user every time to run the session
      // making sure which user is currently online
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectedToDb();

        //check if a user exists or not
        const userExists = await User.findOne({
          email: profile.email,
        });

        // create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);

        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
