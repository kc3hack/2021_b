import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <div className="main-bg p-16">
        <div className="bg-pink p-16">{children}</div>
      </div>
      <Footer />
    </>
  );
}

export default MainLayout;
