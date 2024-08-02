import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

type AdityaReturn = {
  status: string;
  message: string;
  time_taken: string;
};

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ profile, user }) {
      console.log(user.image);

      const userExists = (
        await fetch(`${process.env.BASE_URL}/api/user/email/${profile?.email}`)
      ).status;

      if (userExists != 200) {
        const userId = Math.floor(Date.now() / 100000);
        const userAuth: AdityaReturn = await (
          await fetch(`${process.env.BASE_URL}/api/create_userauth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: userId,
              username: profile?.name,
              email: profile?.email,
              password_hash: "thambiithanpasswordpathuko",
            }),
          })
        ).json();

        if (userAuth.status === "success") {
          await (
            await fetch(`${process.env.BASE_URL}/api/create_user`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: userId,
                username: profile?.name,
                email: profile?.email,
                handle: profile?.email?.split("@")[0].toLowerCase(),
                is_private: false,
                bio: "Ijboling",
                profile_pic: user?.image,
                date_created: new Date(),
                date_updated: new Date(),
              }),
            })
          ).json();
        }
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
