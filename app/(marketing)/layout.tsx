import { Header } from "./header";

type Props = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col h-full">
      <Header />
      {children}
    </div>
  );
};

export default MarketingLayout;
