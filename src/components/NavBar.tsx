import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
const navItems = [
  { name: 'Home', url: '/', id: 0 },
  {
    name: 'About',
    url: '/',
    id: 1,
  },
  { name: 'Connect', url: '/', id: 2 },
];
export const NavBar: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className=" bg-[#f5f4f4] dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 ">
          <div>
            <img
              src="https://www.krowdit.com/images/logo-krowd.svg"
              className="w-20 h-12 "
              alt="logo"
            />
          </div>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-black flex gap-3  font-medium rounded-lg text-sm px-4 py-2 text-center "
            >
              <div className="max-sm:text-sm"> Get in touch</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e92828"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-user-round-icon lucide-user-round"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
            </button>
            <div className="p-2 rounded-full md:sr-only">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#da4e4e"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-logs-icon lucide-logs"
              >
                <path d="M3 5h1" />
                <path d="M3 12h1" />
                <path d="M3 19h1" />
                <path d="M8 5h1" />
                <path d="M8 12h1" />
                <path d="M8 19h1" />
                <path d="M13 5h8" />
                <path d="M13 12h8" />
                <path d="M13 19h8" />
              </svg>
            </div>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {navItems.map((nav) => (
                <li className="" key={nav.id}>
                  <div
                    onClick={() => navigate(nav.url)}
                    className={`block py-2 px-3 cursor-pointer text-white rounded-sm md:bg-transparent  ${
                      nav.id !== 0 ? 'md:text-[#242020]' : 'md:text-[#da4e4e]'
                    } md:p-0 md:dark:red-red-500 hover:text-[#da4e4e]`}
                    aria-current="page"
                  >
                    {nav.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
