import { useState, useEffect, Dispatch, SetStateAction } from "react";

export default function useDarkSide(): [string, Dispatch<SetStateAction<string>>] {
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light");
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    if (theme === "dark") {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
