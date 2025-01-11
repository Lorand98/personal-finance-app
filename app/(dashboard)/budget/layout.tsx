import NewBudget from "@/components/budget/new-budget";
import PageHeader from "@/components/layout/header/page-header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PageHeader title="Budget" action={<NewBudget />} />
      {children}
    </div>
  );
};

export default Layout;
