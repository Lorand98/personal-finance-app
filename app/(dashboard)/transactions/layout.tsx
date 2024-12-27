import PageHeader from "@/components/layout/header/page-header";
import NewTransaction from "@/components/transactions/new-transaction";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PageHeader title="Transactions" action={<NewTransaction />} />
      {children}
    </div>
  );
};

export default Layout;
