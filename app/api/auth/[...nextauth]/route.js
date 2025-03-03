
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import User from "@/models/User";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDB";



const authOptions = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === "github") {
          await connectDB();

          if (!user?.email) {
            console.error("No email provided");
            return false;
          }

          // check if the user already exists in the database
          const existingUser = await User.findOne({ email: user.email });

          // if the user does not exist, create a new user
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              username: user.email.split("@")[0],
              name: user.name || "",
            });
            await newUser.save();
            // console.log("New user created:", newUser);
          } else {
            // console.log("User already exists:", existingUser);
          }
          return true;
        }
        return false;
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },
    async session({ session }) {
      const dbUser = await User.findOne({email: session.user.email});
      // console.log("dbUser: ", dbUser);
      if(dbUser) {
        session.user.username = dbUser.username;
      }
      return session;
    },
    pages: {
      error: "/auth/error",
    },
  },
});

export { authOptions as GET, authOptions as POST };
