import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[url(/img/bgfooter.jpg)] relative">

      <hr className="my-8 bg-[#6AC128] border-2 relative z-10"/>
      <div className="container mx-auto py-12 px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div>
            <img
              src="\km_footer.png"
              alt="Brand Logo"
              className="h-14 lg:h-16 ml-1 mb-4"
            />
            <div className="flex flex-wrap py-2 ">
              <a
                href="#"
                target="_blank"
                className="transition-colors bg-transparent block text-center text-[white] py-2 px-2 text-base hover:text-blue-600 ease-linear hover:ease-in rounded-t-md"
                rel="noreferrer"
              >
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-black mb-4">Support</h3>
            <ul className="text-black">
              <li>
                <Link to="#" className="hover:text-black">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-black">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-black">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-black">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold text-black mb-4">Useful Links</h3>
            <ul className="text-black">
              <li>
                <Link to="/privacy-policy" className="hover:text-black">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-black">
                  Crop Swap
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-black">
                  Know Your Soil
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-black">
                  Agri Tours
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-black">
                  Farm Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-bold text-black mb-4">Krishi Mitra</h3>
            <p className="text-left text-black text-lg leading-relaxed">
              Krishi-Mitra is a revolutionary agriculture platform where you can find all solutions in one place and enhance your farming.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-black font-semibold">
            &copy; {currentYear} Krishi Mitra. All rights reserved.
          </p>
          <p className="text-black mt-2 md:mt-0 font-semibold">
            Made by Brain Bandits
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
