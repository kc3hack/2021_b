import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

function TopLayout({ children }) {
  return (
    <>
      <Header />
      <div className="main-bg p-16">{children}</div>
      <Footer />
    </>
  );
}

export default TopLayout;
