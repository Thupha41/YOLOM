import React, {useState} from 'react'
import useUserData from '../../hooks/useUserData'
const AccountSetting = () => {
    const username = useUserData();
    const [activeSection, setActiveSection] = useState('accounts');
    return (
        <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
            <h1 className="border-b py-6 text-4xl font-semibold">Settings</h1>
            <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
                <div className="relative my-4 w-56 sm:hidden">
                    <input className="peer hidden" type="checkbox" name="select-1" id="select-1" />
                    <label htmlFor="select-1" className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring">Accounts </label>
                    <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                    <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
                        <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Accounts</li>
                        <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Order History</li>
                    </ul>
                </div>

                <div className="col-span-2 hidden sm:block">
                    <ul>
                        <li className="mt-5">
                            <button onClick={() => setActiveSection('accounts')} className={`cursor-pointer px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${activeSection === 'accounts' ? 'text-blue-700 transition border-l-2  border-l-blue-700' : 'border-transparent'}`}>Accounts</button>
                        </li>
                        <li className="mt-5">
                            <button onClick={() => setActiveSection('orderHistory')} className={`cursor-pointer px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${activeSection === 'orderHistory' ? 'text-blue-700 transition border-l-2  border-l-blue-700' : 'border-transparent'}`}>Order History</button>
                        </li>
                    </ul>
                </div>

                {/* Main content */}
                <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
                    {/* Account */}
                    {activeSection === 'accounts' && (
                        <div id="accounts">
                            <div className="pt-4">
                                <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
                                <p className="font- text-slate-600">Hello, {username}.</p>
                            </div>
                        
                            <hr className="mt-4 mb-8" />
                            <p className="py-2 text-xl font-semibold">Email Address</p>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-gray-600">Your email address is <strong>??</strong></p>
                                <button className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Change</button>
                            </div>
                            <hr className="mt-4 mb-8" />
                            <p className="py-2 text-xl font-semibold">Password</p>
                            <div className="flex items-center">
                                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                                    <label htmlFor="login-password">
                                        <span className="text-sm text-gray-500">Current Password</span>
                                        <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                            <input type="password" id="login-password" className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
                                        </div>
                                    </label>
                                    <label htmlFor="login-password">
                                        <span className="text-sm text-gray-500">New Password</span>
                                        <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                            <input type="password" id="login-password" className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
                                        </div>
                                    </label>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            </div>
                            <p className="mt-2">Can&apos;t remember your current password. <a className="text-sm font-semibold text-blue-600 underline decoration-2" href="#">Recover Account</a></p>
                            <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">Save Password</button>
                            <hr className="mt-4 mb-8" />

                            <div className="mb-10">
                                <p className="py-2 text-xl font-semibold">Delete Account</p>
                                <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Proceed with caution    
                                </p>
                                <p className="mt-2">Make sure you have taken backup of your account in case you ever need to get access to your data. We will completely wipe your data. There is no way to access your account after this action.</p>
                                <button className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2">Continue with deletion</button>
                            </div>
                        </div>
                    )}

                    {/* Order history */}
                    {activeSection === 'orderHistory' && (
                        <div id='orderHistory'>
                            <div className="flex justify-start item-start space-y-2 flex-col ">
                                <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">Order History</h1>
                                <p className="text-base font-medium leading-6 text-gray-600">21st Mart 2021 at 10:34 PM</p>
                            </div>
                            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                                    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                        <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>
                                        <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                                            <div className="pb-4 md:pb-8 w-full md:w-40">
                                                <img className="w-full hidden md:block" src="https://i.ibb.co/84qQR4p/Rectangle-10.png" alt="dress" />
                                                <img className="w-full md:hidden" src="https://i.ibb.co/L039qbN/Rectangle-10.png" alt="dress" />
                                            </div>
                                            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">Premium Quaility Dress</h3>
                                                    <div className="flex justify-start items-start flex-col space-y-2">
                                                        <p className="text-sm leading-none text-gray-800">
                                                            <span className="text-gray-300">Style: </span> Italic Minimal Design
                                                        </p>
                                                        <p className="text-sm leading-none text-gray-800">
                                                            <span className="text-gray-300">Size: </span> Small
                                                        </p>
                                                        <p className="text-sm leading-none text-gray-800">
                                                            <span className="text-gray-300">Color: </span> Light Blue
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between space-x-8 items-start w-full">
                                                    <p className="text-base xl:text-lg leading-6">
                                                        $36.00 <span className="text-red-300 line-through"> $45.00</span>
                                                    </p>
                                                    <p className="text-base xl:text-lg leading-6 text-gray-800">01</p>
                                                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">$36.00</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row  items-start md:items-center space-y-4  md:space-x-6 xl:space-x-8 w-full ">
                                            <div className="w-full md:w-40">
                                                <img className="w-full hidden md:block" src="https://i.ibb.co/s6snNx0/Rectangle-17.png" alt="dress" />
                                                <img className="w-full md:hidden" src="https://i.ibb.co/BwYWJbJ/Rectangle-10.png" alt="dress" />
                                            </div>
                                            <div className="  flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0  ">
                                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">High Quaility Italic Dress</h3>
                                                    <div className="flex justify-start items-start flex-col space-y-2">
                                                        <p className="text-sm leading-none text-gray-800">
                                                            <span className="text-gray-300">Style: </span> Italic Minimal Design
                                                        </p>
                                                        <p className="text-sm leading-none text-gray-800">
                                                            <span className="text-gray-300">Size: </span> Small
                                                        </p>
                                                        <p className="text-sm leading-none text-gray-800">
                                                            <span className="text-gray-300">Color: </span> Light Blue
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between space-x-8 items-start w-full">
                                                    <p className="text-base xl:text-lg leading-6">
                                                        $20.00 <span className="text-red-300 line-through"> $30.00</span>
                                                    </p>
                                                    <p className="text-base xl:text-lg leading-6 text-gray-800">01</p>
                                                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">$20.00</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                                            <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
                                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                                <div className="flex justify-between  w-full">
                                                    <p className="text-base leading-4 text-gray-800">Subtotal</p>
                                                    <p className="text-base leading-4 text-gray-600">$56.00</p>
                                                </div>
                                                <div className="flex justify-between items-center w-full">
                                                    <p className="text-base leading-4 text-gray-800">
                                                        Discount <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">STUDENT</span>
                                                    </p>
                                                    <p className="text-base leading-4 text-gray-600">-$28.00 (50%)</p>
                                                </div>
                                                <div className="flex justify-between items-center w-full">
                                                    <p className="text-base leading-4 text-gray-800">Shipping</p>
                                                    <p className="text-base leading-4 text-gray-600">$8.00</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center w-full">
                                                <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                                                <p className="text-base font-semibold leading-4 text-gray-600">$36.00</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                                    <h3 className="text-xl font-semibold leading-5 text-gray-800">Customer</h3>
                                    <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                                        <div className="flex flex-col justify-start items-start flex-shrink-0">
                                            <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                                <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
                                                <div className=" flex justify-start items-start flex-col space-y-2">
                                                    <p className="text-base font-semibold leading-4 text-left text-gray-800">David Kent</p>
                                                    <p className="text-sm leading-5 text-gray-600">10 Previous Orders</p>
                                                </div>
                                            </div>

                                            <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <p className="cursor-pointer text-sm leading-5 text-gray-800">david89@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                                            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                                                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                                                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                                                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">180 North King Street, Northhampton MA 1060</p>
                                                </div>
                                                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                                                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
                                                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">180 North King Street, Northhampton MA 1060</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default AccountSetting