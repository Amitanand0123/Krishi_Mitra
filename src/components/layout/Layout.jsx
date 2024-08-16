import BackToTop from "../backToTop/BackToTop";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className="main-content min-h-screen">
                {children}
            </div>
            <Footer />
            <BackToTop/>
        </div>
    );
}

export default Layout;
