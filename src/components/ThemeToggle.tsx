import React from "react";
import { Moon, Sun, Laptop2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

const themes = ["light", "dark", "system"] as const;
type Theme = typeof themes[number];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Find the next theme in the cycle
  const nextTheme = () => {
    const idx = themes.indexOf(theme as Theme);
    return themes[(idx + 1) % themes.length];
  };

  // Icon and label for current theme
  const getIcon = () => {
    if (theme === "light") return <Sun className="h-[1.2rem] w-[1.2rem]" />;
    if (theme === "dark") return <Moon className="h-[1.2rem] w-[1.2rem]" />;
    return <Laptop2 className="h-[1.2rem] w-[1.2rem]" />;
  };

  const getLabel = () => {
    if (theme === "light") return "Switch to dark mode";
    if (theme === "dark") return "Switch to system mode";
    return "Switch to light mode";
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(nextTheme())}
      className="w-9 px-0"
      aria-label={getLabel()}
      title={getLabel()}
    >
      {getIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}