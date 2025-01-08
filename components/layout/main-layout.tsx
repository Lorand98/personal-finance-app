export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="px-4 py-4 sm:px-10 sm:pt-8 pb-20 lg:pb-8 overflow-y-auto w-full">
      {children}
    </main>
  );
};
