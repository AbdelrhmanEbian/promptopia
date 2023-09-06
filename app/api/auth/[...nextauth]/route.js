import GoogleProvider from 'next-auth/providers/google'
import NextAuth from 'next-auth'
import { connectDB } from '@utils/db'
import User from '@models/user'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
            const user = await User.findOne({ email: session.user.email })
            session.user.id = user?._id.toString()
            return session
        },
        async signIn({ profile }) {
            try {
                await connectDB()
                const user = await User.findOne({ email: profile.email })
                if (!user) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.toLowerCase(),
                        image: profile.picture,
                    })
                }
                return true
            }
            catch (error) {
                console.log(error)
            }
        },
        async redirect({ url, baseUrl  }) {
            return baseUrl 
        }
    },
})
export { handler as GET, handler as POST }