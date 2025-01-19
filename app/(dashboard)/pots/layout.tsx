import PageHeader from "@/components/layout/header/page-header";
import NewPot from "@/components/pots/new-pot";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PageHeader title="Pots" action={<NewPot />} />
      {children}
    </div>
  );
};

export default Layout;
