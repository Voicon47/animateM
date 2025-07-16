import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthWrapper } from "@/components/auth-wrapper" // Import AuthWrapper

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AnimateX - React Animations Shop",
  description: "Discover and implement stunning animations for your React projects.",
  generator: 'v0.dev'
}

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
//           <Providers>
//             <AuthWrapper>{children}</AuthWrapper> {/* Wrap children with AuthWrapper */}
//           </Providers>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers>
            <AuthWrapper children={children} />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

