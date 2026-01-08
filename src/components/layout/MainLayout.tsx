import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      {/* Offset for fixed navbar (h-20 = 80px) */}
      <main className="pt-20">{children}</main>
    </>
  );
};

export default MainLayout;
