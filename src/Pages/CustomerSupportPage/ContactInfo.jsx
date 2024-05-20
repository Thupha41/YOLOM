import React from 'react'

const ContactInfo = () => {
  return (
    <>
        <div className="pt-4">
            <h2 className="py-2 text-2xl font-semibold">Contact Information</h2>
        </div>    
        <hr className="mt-4 mb-8" />
        <div className='w-full overflow-hidden rounded-lg'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.2301335112447!2d106.80326867207408!3d10.870093179949139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527587e9ad5bf%3A0xafa66f9c8be3c91!2sUniversity%20of%20Information%20Technology%20-%20VNUHCM!5e0!3m2!1sen!2s!4v1714559266843!5m2!1sen!2s" width="100%" height="450" className='border-0' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className='mt-10 mb-10'>
            <p className='font-semibold'>Genuine distributor of leading international fashion brands in Vietnam (YOLOM)</p>
            <p>Headquarter: HCM, 4th Floor of Building E, University of Information Technology</p>
            <p>Phone: 0399245850 (9:00 - 22:00)</p>
        </div>
    </>
  )
}

export default ContactInfo