export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="px-4 sm:px-10 pt-8 pb-20 lg:pb-8 overflow-y-scroll w-full">
      {children}
    </main>
  );
};
