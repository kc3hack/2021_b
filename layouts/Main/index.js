import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}

export default MainLayout;
