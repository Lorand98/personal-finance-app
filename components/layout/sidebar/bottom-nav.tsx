import { menuItems } from "./constants";
import SidebarLink from "./sidebar-link";

const BottomNav = () => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-10 bg-grey-900 text-grey-300 px-4 py-4 rounded-t-2xl flex flex-col items-center">
      <ul className="flex justify-around items-center w-full">
        {menuItems.map((item) => (
          <li key={item.label}>
            <SidebarLink {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;
