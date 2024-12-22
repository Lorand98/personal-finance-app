import LogoutButton from "@/components/auth/logout-button";
import React from "react";

type PageHeaderProps = {
  title: string;
  action?: React.ReactNode;
};

const PageHeader = ({ title, action }: PageHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1>{title}</h1>
      <div className="flex items-center gap-4">
        {action}
        <LogoutButton />
      </div>
    </div>
  );
};

export default PageHeader;
