import React, { Suspense } from "react";
import { LogOut } from "lucide-react";
import LogoutButton from "@/components/auth/logout-button";

export default function withPageHeading<P extends object>(
  Page: React.ComponentType<P>,
  title: string
) {
  const PageWithHeading = (props: P) => {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1>{title}</h1>
          <Suspense
            fallback={
              <button
                disabled
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm text-gray-400"
              >
                <LogOut className="h-4 w-4" />
                <span>Loading...</span>
              </button>
            }
          >
            <LogoutButton />
          </Suspense>
        </div>
        <Page {...props} />
      </div>
    );
  };

  PageWithHeading.displayName =
    Page.displayName || Page.name || "PageComponent";
  return PageWithHeading;
}
