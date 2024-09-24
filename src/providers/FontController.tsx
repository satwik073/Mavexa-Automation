import { ThemeProviderProps } from "next-themes/dist/types";
import '../index.css'
export function CustomFontProvider({ children} : ThemeProviderProps) {
    return <div className="font-controller">{children}</div>
  }
  