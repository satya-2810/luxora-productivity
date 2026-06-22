import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

function Header() {
  const { resolvedTheme, setTheme } =
    useTheme()

  const toggleTheme = () => {
    setTheme(
      resolvedTheme === "dark"
        ? "light"
        : "dark"
    )
  }

  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Luxora
        </h1>

        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Your luxury minimal productivity system
        </p>
      </div>

      <button
  onClick={toggleTheme}
  className="
    rounded-2xl
    border
    border-neutral-200
    bg-white
    p-3
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-0.5
    hover:shadow-md
    dark:border-neutral-800
    dark:bg-[#181C22]
    text-neutral-900
    dark:text-white
  "
>
  {resolvedTheme === "dark" ? (
    <Sun size={18} />
  ) : (
    <Moon size={18} />
  )}
</button>
    </header>
  )
}

export default Header