import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from '@models/user';

let handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({session}){
      let sessionUser = await User.findOne({email: session.user.email});
      session.user.id = sessionUser._id.toString();//update it's id
      console.log('session',session)
      return session;
    },
    async signIn({profile}){
      try{
        await connectToDB();
        let userExists = await User.findOne({email: profile.email})
        if(!userExists){
          let username = profile.name.replace(' ','').toLowerCase();
          if(username.length<8)
            username = username.repeat(1);
          if(username.length>20) 
            username = username.substring(0,20);
          await User.create({
            email: profile.email,
            username: username,
            image: profile.picture
          });
        }
        return true;
      }catch(error){
        console.log(error);
        return false;
      }
    }
  }
});

export {
  handler as GET,
  handler as POST
};