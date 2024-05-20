import React from 'react'
import accountCreation1 from '../../assets/customer-support/account-creation1.png'
import accountCreation4 from '../../assets/customer-support/account-creation4.png'
const AccountCreate = () => {
  return (
    <>
        <div className="pt-4">
            <h2 className="py-2 text-2xl font-semibold">Account Creation Guide</h2>
        </div>
        <hr className="mt-4 mb-8" />
        <div className='mb-10'>
            <p>Please register an account at the YOLOM website/application according to the instructions below to receive genuine fashion items from 5 international brands exclusively distributed by YOLOM, as well as receive The latest offers are easy and fast!</p>
            <img className='w-full overflow-hidden rounded-lg mt-4' src={accountCreation1} alt='account-creation'/>
            <img className='w-full overflow-hidden rounded-lg mt-4' src={accountCreation4} alt='account-creation'/>

        </div>
    </>
  )
}

export default AccountCreate