import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

type ItemProps = {
  to: string;
  name: string;
  badge: number | null;
};

const NavMenuItem = ({
  to,
  name,
  badge,
  children,
}: PropsWithChildren<ItemProps>) => {
  return (
    <>
      <li>
        <Link to={to} className="justify-between z-10">
          <div className="flex flex-row grow items-center space-x-4">
            {children}
            <span className="text-center">{name}</span>
          </div>
          {badge !== null && badge > 0 && (
            <span className="badge badge-info">
              {badge > 100 ? "99+" : badge}
            </span>
          )}
        </Link>
      </li>
    </>
  );
};

export default NavMenuItem;
