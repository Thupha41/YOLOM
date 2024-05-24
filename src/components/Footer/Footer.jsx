import React from "react";
import footerLogo from "../../assets/logo.png";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="text-white bg-[#000]">
      <div className="container mx-auto px-8 md:px-24 py-8">
        <div
          data-aos="zoom-in"
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {/* Company Info */}
          <div>
            <img
              src={footerLogo}
              alt="YOLOM Logo"
              className="w-12 h-12 mb-4 mx-auto md:mx-0"
            />
            <p className="mb-4 text-gray-400 text-center md:text-left">
              Genuine distributor of leading international fashion brands in
              Vietnam.{" "}
              <a href="/" className="text-primary">
                Read more
              </a>
            </p>
            <div className="flex flex-col items-center md:flex-row mb-2 md:mb-0">
              <FaMapMarkerAlt className="mr-2" />
              <span>
                HCM, 4th Floor of Building E, University of Information
                Technology
              </span>
            </div>
            <div className="flex flex-col items-center md:flex-row">
              <FaPhone className="mr-2" />
              <span>+84 399245850</span>
            </div>
          </div>
          {/* Column 1 - About */}
          <div>
            <h5 className="text-xl font-bold mb-3">About YOLOM</h5>
            <ul className="footer-link text-gray-400">
              <li className="mb-2">
                <a href="/introduction/about-us">Introduction to YOLOM</a>
              </li>
              <li className="mb-2">
                <a href="/contact-us">Contact with us</a>
              </li>
              <li className="mb-2">
                <a href="/about">Blog</a>
              </li>
            </ul>

            <h5 className="text-xl font-bold mb-3 mt-10">Hotline</h5>
            <div className="flex items-center">
              <FaPhone className="mr-2" />
              <span>0399245850 (9:00 - 22:00)</span>
            </div>
          </div>

          {/* Column 2 - Customer Support */}
          <div>
            <h5 className="text-xl font-bold mb-3">Customer Support</h5>
            <ul className="footer-link text-gray-400">
              <li className="mb-2">
                <Link
                  to="/customer-support#contact-information"
                  onClick={() => window.scrollTo(0, 150)}
                >
                  Contact Information
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/customer-support#order-guide"
                  onClick={() => window.scrollTo(0, 150)}
                >
                  Ordering Guide
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/customer-support#account-guide"
                  onClick={() => window.scrollTo(0, 150)}
                >
                  Member Account Creation Guide
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/customer-support#account-active"
                  onClick={() => window.scrollTo(0, 150)}
                >
                  Member Account Activation Guide
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/customer-support#shipping-policy"
                  onClick={() => window.scrollTo(0, 150)}
                >
                  Shipping Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/customer-support#privacy-policy"
                  onClick={() => window.scrollTo(0, 150)}
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/customer-support#terms"
                  onClick={() => window.scrollTo(0, 150)}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Connect with ACFC */}
          <div>
            <h5 className="text-xl font-bold mb-3">Connect with YOLOM</h5>
            <div className="flex justify-center md:justify-start gap-3 mb-4">
              <a href="https://instagram.com">
                <FaInstagram />
              </a>
              <a href="https://facebook.com">
                <FaFacebook />
              </a>
              <a href="https://linkedin.com">
                <FaLinkedin />
              </a>
            </div>

            <h5 className="text-xl font-bold mb-3">Accept payment</h5>
            <div className="flex justify-center md:justify-start gap-3 mb-4">
              <a href="https://instagram.com">
                <FaInstagram />
              </a>
              <a href="https://facebook.com">
                <FaFacebook />
              </a>
              <a href="https://linkedin.com">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          {/* Additional info such as copyrights, partner info, etc. */}
          <p>© 2024 YOLOM - Fashion of Europe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
