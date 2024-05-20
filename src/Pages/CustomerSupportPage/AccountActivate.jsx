import React from 'react'
import accountCreation2 from '../../assets/customer-support/account-creation2.png'
import accountCreation3 from '../../assets/customer-support/account-creation3.png'
const AccountActivate = () => {
  return (
    <>
        <div className="pt-4">
            <h2 className="py-2 text-2xl font-semibold">Instruction for activation of member accounts</h2>
        </div>
        <hr className="mt-4 mb-8" />
        <div className='mb-10'>
            <p>For customers who are already members of YOLOM, you can use your registered account to log in to the YOLOM shopping website/application and check your account information, membership policies, and purchase history. with many exclusive incentives for members, it&apos;s easy and fast!</p>
            <img className='w-full overflow-hidden rounded-lg mt-4' src={accountCreation2} alt='account-creation'/>
            <img className='w-full overflow-hidden rounded-lg mt-4' src={accountCreation3} alt='account-creation'/>

        </div>
    </>
  )
}

export default AccountActivate