import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Nav from "./pages/Nav";

const Layout = () => {
  const getInitialTheme = (): "light" | "dark" => {
    if (typeof window !== "undefined") {
      return (
        (localStorage.getItem("theme") as "light" | "dark") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light")
      );
    }
    return "light";
  };

  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen flex flex-col [&>*]:px-6 md:[&>*]:px-14 font-display 
    bg-lightbg text-lighttext dark:bg-darkbg dark:text-darktext space-y-12">
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <Outlet />
    </div>
  );
};

export default Layout;
