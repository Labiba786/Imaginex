import { Inter, Space_Grotesk, Orbitron } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import "./globals.css"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import axios from "axios"

// Configure NProgress
NProgress.configure({
  showSpinner: true,
  trickleSpeed: 200,
  minimum: 0.1,
})

// Start loader on request
axios.interceptors.request.use(
  async (config) => {
    NProgress.start()
    await new Promise((resolve) => setTimeout(resolve, 500))
    return config
  },
  (error) => {
    NProgress.done()
    return Promise.reject(error)
  }
)

// Stop loader on response
axios.interceptors.response.use(
  async (response) => {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    NProgress.done()
    return response
  },
  async (error) => {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    NProgress.done()
    return Promise.reject(error)
  }
)

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
})
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata = {
  title: "Imaginex - AI Image Generation",
  description: "Convert text prompts into stunning visuals with AI",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          spaceGrotesk.variable,
          orbitron.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <MainNav />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
