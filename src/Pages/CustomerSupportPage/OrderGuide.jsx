import React from 'react'
import accountCreation1 from '../../assets/customer-support/account-creation1.png'
import accountCreation2 from '../../assets/customer-support/account-creation2.png'
import accountCreation3 from '../../assets/customer-support/account-creation3.png'
import accountCreation4 from '../../assets/customer-support/account-creation4.png'
import accountCreation5 from '../../assets/customer-support/account-creation5.png'
import accountCreation6 from '../../assets/customer-support/account-creation6.png'
import accountCreation7 from '../../assets/customer-support/account-creation7.png'
import accountCreation8 from '../../assets/customer-support/account-creation8.png'
import accountCreation9 from '../../assets/customer-support/account-creation9.png'
import accountCreation10 from '../../assets/customer-support/account-creation10.png'
import accountCreation11 from '../../assets/customer-support/account-creation11.png'
import accountCreation12 from '../../assets/customer-support/account-creation12.png'
const OrderGuide = () => {
  return (
    <>
        <div className="pt-4">
            <h2 className="py-2 text-2xl font-semibold">Ordering guide</h2>
        </div>    
        <hr className="mt-4 mb-8" />
        <div className='mb-10'>
            <strong>You can satisfy your online shopping needs for genuine products with 5 international fashion brands at the YOLOM website/shopping app by ordering directly at the YOLOM shopping app following each order step. goods below:</strong>
            <h3 className='text-xl mt-10 underline'><span className='font-semibold'>STEP 1:</span> Login/Register an account:</h3>
            <p className='mb-8 mt-4'>For customers who have registered as members, please &quot;Log in&quot; with the account &quot;Email/Phone number&quot; and &quot;Password&quot; registered at the YOLOM website/application.</p>
            <img className='w-full overflow-hidden rounded-lg' src={accountCreation3} alt='account-creation'/>
            <img className='w-full overflow-hidden rounded-lg mt-4 mb-10' src={accountCreation2} alt='account-creation'/>
            <p>For customers who do not have an account, please select &quot;Register now&quot; to create an account at YOLOM. Enter complete personal information and phone number to activate.</p>
            <img className='w-full overflow-hidden rounded-lg mt-4' src={accountCreation1} alt='account-creation'/>
            <img className='w-full overflow-hidden rounded-lg mt-4' src={accountCreation4} alt='account-creation'/>
            <h3 className='text-xl mt-10 underline'><span className='font-semibold'>STEP 2:</span> Search for products:</h3>
            <p className='mt-2'>You can search for products according to your needs in 2 ways:</p>
            <p className='mt-2'>• Type the product name into the search bar.</p>
            <img className='w-full overflow-hidden rounded-lg mt-4' src={accountCreation5} alt='account-creation'/>
            <p className='mt-8'>• Search by latest products, best sellers, promotions or popular categories by brand.</p>
            <img className='w-full overflow-hidden rounded-lg mt-4' src={accountCreation6} alt='account-creation'/>
            <h3 className='text-xl mt-10 underline'><span className='font-semibold'>STEP 3:</span> Add product to cart:</h3>
            <p className='mt-2'>To choose your favorite product, please click on the product image or name to access the product&apos;s detailed information page.</p>
            <p className='mt-2'>After choosing your favorite product, please select product attributes such as:</p>
            <img className='w-full overflow-hidden rounded-lg mt-4' src={accountCreation7} alt='account-creation'/>
            <p className='mt-8 mb-4'>After choosing your favorite product, please select product attributes such as:</p>
            <ul>
            <li className='mb-2'>• Color</li>
            <li className='mb-2'>• Designs</li>
            <li className='mb-2'>• Size</li>
            <li className='mb-2'>• Quantity</li>
            </ul>
            <img className='w-full overflow-hidden rounded-lg mt-4' src={accountCreation8} alt='account-creation'/>
            <p className='mt-8 mb-4'>Then select “Add to cart” or “Checkout” (if only buying one current product).</p>
            <p className='mt-2'>Once you have placed the first product in your order, please follow these steps to add other products to your cart:</p>
            <p className='mt-2'>• Click on the cart icon on the navigation bar.</p>
            <p className='mt-2'>• Add products to cart by selecting quantity and &quot;Checkout&quot; and selecting &quot;View Cart&quot;.</p>
            <img className='w-full overflow-hidden rounded-lg mt-4' src={accountCreation9} alt='account-creation'/>
            <img className='w-full overflow-hidden rounded-lg mt-4' src={accountCreation10} alt='account-creation'/>
            <p className='mt-2'>Please check product information and quantity before making payment.</p>
            <h3 className='text-xl mt-10 underline'><span className='font-semibold'>STEP 4:</span> Check cart and place order:</h3>
            <p className='mt-2'>• You can place different products in 1 shopping cart into 1 order, the products in the shopping cart will be packed into 1 package or more (if your products are taken from different warehouses and will be delivered 2 times if you choose) and delivered to the address you registered.</p>
            <p className='mt-2'>• After you have checked all the products you need to place in your shopping cart, please fill in the discount code (if any).</p>
            <p className='mt-2'>• Adjust quantity and update shopping cart.</p>
            <p className='mt-2'>• Click “Checkout” to start ordering.</p>
            <img className='w-full overflow-hidden rounded-lg mt-4' src={accountCreation11} alt='account-creation'/>
            <h3 className='text-xl mt-10 underline'><span className='font-semibold'>STEP 5:</span> Fill in/Select delivery address. Then, select “Continue”.</h3> 
            <img className='w-full overflow-hidden rounded-lg mt-4' src={accountCreation12} alt='account-creation'/>
            <h3 className='text-xl mt-10 underline'><span className='font-semibold'>STEP 6:</span> Select payment method and &quot;Complete payment&quot;.</h3> 
        </div>
    </>
  )
}

export default OrderGuide