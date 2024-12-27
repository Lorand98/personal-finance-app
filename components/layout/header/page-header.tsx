import LogoutButton from "@/components/auth/logout-button";
import React from "react";

type PageHeaderProps = {
  title: string;
  action?: React.ReactNode;
};

const PageHeader = ({ title, action }: PageHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
      {/* Title + Mobile Logout Container */}
      <div className="flex flex-wrap items-start gap-4">
        <h1 className="text-lg sm:text-preset-1 flex-1 min-w-0">{title}</h1>
        <div className="sm:hidden">
          <LogoutButton />
        </div>
      </div>

      {/* Actions Container */}
      <div className="flex items-center gap-4">
        {action}
        <div className="hidden sm:block">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
