import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Correo electrónico", type: "text" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        // Aquí debes implementar tu lógica de autenticación
        // Por ejemplo, verificar las credenciales contra tu base de datos
        if (credentials.email === "usuario@ejemplo.com" && credentials.password === "contraseña") {
          return { id: 1, name: "Usuario", email: "usuario@ejemplo.com" }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/login', // Ruta de tu página de inicio de sesión personalizada
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      return session
    }
  }
})