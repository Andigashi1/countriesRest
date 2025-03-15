import { FaMoon } from "react-icons/fa6";

interface NavProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const Nav = ({ theme, toggleTheme }: NavProps) => {
  return (
    <nav
      className="bg-white text-lighttext dark:bg-darkelements dark:text-darktext flex justify-between items-center py-8"
    >
      <h1 className="text-xl md:text-3xl font-bold">WHERE IN THE WORLD</h1>
      <button onClick={toggleTheme} className="flex items-center cursor-pointer">
        <FaMoon size={20} />
        {theme === "dark" ? "Dark" : "Light"} Mode
      </button>
    </nav>
  );
};

export default Nav;
