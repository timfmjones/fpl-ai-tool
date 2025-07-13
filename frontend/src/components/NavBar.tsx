import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChartBarIcon, UsersIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const NavBar: React.FC = () => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200 ${
      isActive ? 'bg-gray-300' : ''
    }`;

  return (
    <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l">
      <h2 className="text-3xl font-semibold text-center text-blue-800">FPL AI</h2>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <NavLink to="/" className={navLinkClasses}>
            <UsersIcon className="w-5 h-5" />
            <span className="mx-4 font-medium">Dashboard</span>
          </NavLink>
          <NavLink to="/players" className={navLinkClasses}>
            <ChartBarIcon className="w-5 h-5" />
            <span className="mx-4 font-medium">Player Analysis</span>
          </NavLink>
          <NavLink to="/squad-builder" className={navLinkClasses}>
            <ShieldCheckIcon className="w-5 h-5" />
            <span className="mx-4 font-medium">Squad Builder</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default NavBar;