import React from 'react'

const ShippingPolicy = (data) => {
  return (
    <>
        <div className="pt-4">
            <h2 className="py-2 text-2xl font-semibold">Shipping Policy</h2>
        </div>   
        <hr className="mt-4 mb-8" />
        <h3 className='font-semibold'>B. REGULATIONS ON DELIVERY TIME</h3>
        <p className='mt-4 text-sm'>YOLOM supports delivery to customers Monday - Saturday from 9:00 a.m. to 6:00 p.m. (except Sundays and holidays)</p>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-10">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope="col" className="px-6 py-3">Region</th>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Standard Delivery</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'>Inner province/city</th>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">1 – 3 days</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">Intra-region</th>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">2 – 4 days</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">Inter-regional (between 3 cities: Ho Chi Minh City, Hanoi, Da Nang)</th>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">3 – 5 days</td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">Inter-regional (from 3 big cities HCM, Hanoi, Da Nang to other cities in other regions)</th>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">5 – 7 days</td>
              </tr>
            </tbody>
          </table>
        </div>

        <em><strong>(*) Note:</strong>These are expected standard delivery times only. Standard time may change for some unexpected reasons and will be notified to you on holidays, New Year or when situations arise. In addition, regulations for zoning inner and outer suburbs depend on each transportation service provider, and there will be different ways of dividing inner and outer suburbs. For details, please contact YOLOM&apos;s official hotline/Fanpge/Zalo/Email for detailed advice.</em>
        <h3 className='font-semibold mt-10 mb-4'>C. REGULATIONS ON DELIVERY FEE</h3>
        <p className='text-sm mb-2 ml-10'>• Delivery fees for orders are calculated based on the distance between the supplying store and the delivery address along with the weight of the product.</p>
        <p className='text-sm mb-2 ml-10'>• Details of the delivery fee for each order will be clearly shown on the order completion page after you enter the delivery address.</p>
        <p className='text-sm mb-2 ml-10'>• If you have any questions about delivery policy, please contact Hotline: 0399245850 (9:00 a.m. - 10:00 p.m.; 1,000 VND/minute) or email: 21522445@gm.uit.edu.vn</p>

        <p className='text-sm mb-2 mt-10'><em>YOLOM would like to thank you.</em></p>
        <p className='text-sm mb-14'><em>We are pleased to serve you.</em></p>
    </>
  )
}

export default ShippingPolicy