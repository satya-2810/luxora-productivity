import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
}

function ThemeProvider({
  children,
}: Props) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
    >
      {children}
    </NextThemesProvider>
  )
}

export default ThemeProvider