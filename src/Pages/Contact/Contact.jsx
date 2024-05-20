import React, { useState } from 'react';
import { AiOutlineHome } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import { CiMail } from "react-icons/ci";

const Contact = () => {

    const [clientName, setClientName] = useState("");
    const [email, setEmail] = useState("");
    const [messages, setMessages] = useState("");

    // Error Messages
    const [errClientName, setErrClientName] = useState("");
    const [errEmail, setErrEmail] = useState("");
    const [errMessages, setErrMessages] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleName = (e) => {
        setClientName(e.target.value);
        setErrClientName("");
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setErrEmail("");
    };

    const handleMessages = (e) => {
        setMessages(e.target.value);
        setErrMessages("");
    };

    // Email Validation
    const emailValidation = (email) => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    };
    //Name validation
    const nameValidation = (name) => {
        return /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/u.test(name);
    }

    const handlePost = (e) => {
        e.preventDefault();
        if (!clientName) {
            setErrClientName("Enter your Name");
        } else if(!nameValidation(clientName)) {
            setErrClientName ("Enter a valid name. Not contain numbers");
        }
        if (!email) {
            setErrEmail("Enter your Email");
        } else if (!emailValidation(email)) {
            setErrEmail("Enter a Valid Email");
        }
        if (!messages) {
            setErrMessages("Enter your Messages");
        }
        if (clientName && nameValidation(clientName) && email && emailValidation(email) && messages) {
            setSuccessMsg(`Thank you ${clientName}! Your messages has been received successfully. Further details will be sent to you by email at ${email}.`);
        }
    };

    return (
        <div className='max-w-screen-2xl mx-auto xl:px-28 px-4 py-20'>
            <div className='container-2xl'>
                <div className='flex flex-col'>
                    <div className='w-full overflow-hidden rounded-lg'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.2301335112447!2d106.80326867207408!3d10.870093179949139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527587e9ad5bf%3A0xafa66f9c8be3c91!2sUniversity%20of%20Information%20Technology%20-%20VNUHCM!5e0!3m2!1sen!2s!4v1714559266843!5m2!1sen!2s" width="100%" height="450" className='border-0' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className='flex flex-col mt-5'>
                        <div className='pt-8 pr-5 rounded-lg bg-white gap-4 flex flex-col md:flex-row md:justify-between'>
                            {successMsg ? (
                                <p className="pb-20 w-96 font-medium text-green-500">{successMsg}</p>
                            ) : (
                                <div className='md:w-1/2'>
                                    <div className="flex justify-center">
                                        <h3 className='text-2xl font-medium leading-6 text-left mb-4'>Contact</h3>
                                    </div>
                                    <form className='flex flex-col gap-4'>

                                        {/* Name field */}
                                        <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                        <div className="flex">
                                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-l-md border-gray-300 border-r-0 rounded-r-none dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                                </svg>
                                            </span>
                                            <input type="name" id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 py-2.5 pl-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your name" onChange={handleName} value={clientName}/>

                                        </div>
                                        {errClientName && (
                                            <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                                                <span className="text-sm italic font-bold">!</span>
                                                {errClientName}
                                            </p>
                                        )}

                                        {/* Email field */}
                                        <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                                    <path d="M10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                                                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                                                </svg>
                                            </div>
                                            <input type="email" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" onChange={handleEmail} value={email}/>
                                   
                                        </div>
                                        {errEmail && (
                                            <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                                                <span className="text-sm italic font-bold">!</span>
                                                {errEmail}
                                            </p>
                                        )}         
                                        <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Comment</label>
                                        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                            <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                                <label htmlFor="comment" className="sr-only">Your comment</label>
                                                <textarea onChange={handleMessages}  value={messages} id="comment" rows="4" className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white" placeholder="Write a comment..." required ></textarea>                                       
                                            </div>
                                            <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                                <button onClick={handlePost} type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                                    Post comment
                                                </button>
                                            </div>

                                        </div>
                                        {errMessages && (
                                            <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                                                <span className="text-sm italic font-bold">!</span>
                                                {errMessages}
                                            </p>
                                        )}     
                                    </form>
                                </div>
                            )}
                            <div className='md:w-1/2 md:ml-40 mt-8 md:mt-0'>
                                <div className="flex justify-center">
                                    <h3 className='text-2xl font-medium leading-6 text-left mb-4'>Get in touch with us</h3>
                                </div>
                                <div>
                                    <ul className='ps-0'>
                                        <li className='mb-3 flex items-center gap-4 md:gap-15'>
                                            <AiOutlineHome className='text-lg md:text-xl mr-4' />
                                            <address className='text-sm'>Address: HCM, 4th Floor of Building E, University of Information Technology</address>
                                        </li>
                                        <li className='mb-3 flex items-center gap-4 md:gap-15'>
                                            <BiPhoneCall className='text-lg md:text-xl mr-4' />
                                            <a href='tel:+84399245850' className='text-sm'>0399245850</a>
                                        </li>
                                        <li className='mb-3 flex items-center gap-4 md:gap-15'>
                                            <CiMail className='text-lg md:text-xl mr-4'/>
                                            <a href='mailto:21522445@gm.uit.edu.vn' className='text-sm'>21522445@gm.uit.edu.vn</a>
                                        </li>
                                        <li className='mb-3 flex items-center gap-4 md:gap-15'>
                                            <BiInfoCircle className='text-lg md:text-xl mr-4'/>
                                            <p className='text-sm mb-0'>Monday - Friday 8 AM - 10 PM</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
