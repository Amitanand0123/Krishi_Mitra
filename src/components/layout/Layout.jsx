import BackToTop from "../backToTop/BackToTop";
import Chatbot from "../chatbot/Chatbot";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className="main-content min-h-screen">
                {children}
            </div>
            
            <Chatbot/>
            <Footer />
            {/* <BackToTop/> */}
        </div>
    );
}

export default Layout;
