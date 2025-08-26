
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import connectDB from "@/db/connectDB";
import User from "@/models/User";
import bcrypt from 'bcryptjs';


export const authOptions = ({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
          await connectDB();
          const user = await User.findOne({ email: credentials.email });
          console.log("USER",user)

          if (!user) {
            console.log("User not found");
            return null;
          }
        //   If user found but entered incorrect password then console invalid password
          const isMatch = await bcrypt.compare(credentials.password, user.password);

                if (!isMatch) {
                    console.log("Invalid password");
                    return null;
                }

          return {
            id: user._id.toString(),
            email: user.email,
            name:user.userName,
            role:user.role
          };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/Users/Login",
    error: "/Users/Login", 
  },
//   Must add secrete for authontication
  secret: process.env.NEXTAUTH_SECRET,
  
 callbacks: {
  async redirect({url, baseUrl}){
    console.log("URL", url)
    console.log("BASEURL", baseUrl)
    if(url.startsWith(baseUrl)) return url;
    return baseUrl+'/home'
  },
  async jwt({ token, user }) {
    if (user) {
      token.role = user.role; 
    }
    return token;
  },
  async session({ session, token }) {
    session.user.role = token.role; 
    return session;
  }
}

});
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };


