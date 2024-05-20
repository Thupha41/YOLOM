import React, {useState, useEffect} from 'react';
import OrderGuide from './OrderGuide';
import AccountCreate from './AccountCreate';
import ContactInfo from './ContactInfo';
import ShippingPolicy from './ShippingPolicy';
import AccountActivate from './AccountActivate';
import PrivacyPolicy from './PrivacyPolicy';
import Terms from './Terms';
import { useLocation, useNavigate } from 'react-router-dom'; 
const CustomerSupportPage = () => {

  const [activeSection, setActiveSection] = useState('contact-information');
  const location = useLocation(); 
  const navigate = useNavigate();
  useEffect(() => {

  const hash = location.hash.replace('#', '');
    if (hash) setActiveSection(hash);
  }, [location]); 
  const handleSetActiveSection = (section) => {
    setActiveSection(section);
    navigate(`${location.pathname}#${section}`, { replace: true }); 
  };
  return (
    <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
      <h1 className="border-b py-6 text-4xl font-semibold">Customer Support</h1>
      <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
        <div className="relative my-4 w-56 sm:hidden">
          <input className="peer hidden" type="checkbox" name="select-1" id="select-1" />
          <label htmlFor="select-1" className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-ring-blue-700 peer-checked:ring"></label>
          <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transitpeer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-hpeer-checked:py-3">
            <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Contact Information</li>
            <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Ordering Guide</li>
            <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Account Creation Guide</li>
            <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Account Activation Guide</li>
            <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Delivery Policy</li>
            <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Privacy Policy</li>
            <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Terms and Condition</li>
          </ul>
        </div>

        <div className="col-span-2 hidden sm:block">
          <ul>
            <li className="mt-5">
              <button onClick={() => handleSetActiveSection('contact-information')} className={`cursor-pointer px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${activeSection === 'contact-information' ? 'text-blue-700 transition border-l-2  border-l-blue-700' : 'border-transparent'}`}>Contact Information</button>
            </li>
            <li className="mt-5">
              <button onClick={() => handleSetActiveSection('order-guide')} className={`cursor-pointer px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${activeSection === 'order-guide' ? 'text-blue-700 transition border-l-2  border-l-blue-700' : 'border-transparent'}`}>Ordering Guide</button>
            </li>
            <li className="mt-5">
              <button onClick={() => handleSetActiveSection('account-guide')} className={`cursor-pointer px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${activeSection === 'account-guide' ? 'text-blue-700 transition border-l-2  border-l-blue-700' : 'border-transparent'}`}>Account Creation Guide</button>
            </li>
            <li className="mt-5">
              <button onClick={() => handleSetActiveSection('account-active')} className={`cursor-pointer px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${activeSection === 'account-active' ? 'text-blue-700 transition border-l-2  border-l-blue-700' : 'border-transparent'}`}>Account Activation Guide</button>
            </li>
            <li className="mt-5">
              <button onClick={() => handleSetActiveSection('shipping-policy')} className={`cursor-pointer px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${activeSection === 'shipping-policy' ? 'text-blue-700 transition border-l-2  border-l-blue-700' : 'border-transparent'}`}>Shipping Policy</button>
            </li>
            <li className="mt-5">
              <button onClick={() => handleSetActiveSection('privacy-policy')} className={`cursor-pointer px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${activeSection === 'privacy-policy' ? 'text-blue-700 transition border-l-2  border-l-blue-700' : 'border-transparent'}`}>Privacy Policy</button>
            </li>
            <li className="mt-5">
              <button onClick={() => handleSetActiveSection('terms')} className={`cursor-pointer px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${activeSection === 'terms' ? 'text-blue-700 transition border-l-2  border-l-blue-700' : 'border-transparent'}`}>Terms and Condition</button>
            </li>
          </ul>
        </div>

        {/* Main content */}
        <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow mb-20">
          {/* Account */}
          {activeSection === 'contact-information' && (
            <div id="contact-information">
              <ContactInfo/>
            </div>
          )}

          {/* Order history */}
          {activeSection === 'order-guide' && (
            <div id='order-guide'>
                <OrderGuide/>
              
            </div>
          )}
          {activeSection === 'account-guide' && (
            <div id='account-guide'>
              <AccountCreate/>
            </div>
          )}
          {activeSection === 'account-active' && (
            <div id='account-active'>
              <AccountActivate/>
            </div>
          )}
          {activeSection === 'shipping-policy' && (
            <div id='shipping-policy'>
              <ShippingPolicy/>
            </div>
          )}
          {activeSection === 'privacy-policy' && (
            <div id='privacy-policy'>
              <PrivacyPolicy/>
            </div>
          )}
          {activeSection === 'terms' && (
            <div id='terms'>
              <Terms/>
            </div>
          )}
        </div>

      </div>
    </div>
)
}

export default CustomerSupportPage;
