import PageHeader from "@/components/layout/header/page-header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PageHeader title="Budget" />
      {children}
    </div>
  );
};

export default Layout;
