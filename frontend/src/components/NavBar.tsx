import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ChartBarIcon, UsersIcon, ShieldCheckIcon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { AuthContext } from '../context/AuthContext';

const NavBar: React.FC = () => {
  const auth = useContext(AuthContext);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200 ${
      isActive ? 'bg-gray-300' : ''
    }`;

  const handleLogout = () => {
    if (auth) {
      auth.logout();
    }
  };

  return (
    <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r">
      <h2 className="text-3xl font-semibold text-center text-blue-800">FPL AI</h2>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <NavLink to="/" className={navLinkClasses}>
            <UsersIcon className="w-5 h-5" />
            <span className="mx-4 font-medium">Dashboard</span>
          </NavLink>
          <NavLink to="/players" className={navLinkClasses}>
            <ChartBarIcon className="w-5 h-5" />
            <span className="mx-4 font-medium">Player Analysis!!!!</span>
          </NavLink>
          <NavLink to="/squad-builder" className={navLinkClasses}>
            <ShieldCheckIcon className="w-5 h-5" />
            <span className="mx-4 font-medium">Squad Builder</span>
          </NavLink>
        </nav>

        {/* === DYNAMIC LOGIN/LOGOUT SECTION === */}
        <div className="mt-6">
          {auth?.user ? (
            <div>
              <div className="px-4 py-2 text-sm text-gray-500">{auth.user.email}</div>
              <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 mt-2 text-gray-600 rounded-md hover:bg-gray-200">
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span className="mx-4 font-medium">Logout</span>
              </button>
            </div>
          ) : (
            <NavLink to="/login" className={navLinkClasses}>
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              <span className="mx-4 font-medium">Login</span>
            </NavLink>
          )}
        </div>
      </div>
    </aside>
  );
};

export default NavBar;