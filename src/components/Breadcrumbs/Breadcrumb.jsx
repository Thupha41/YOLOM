import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const categoryToPathMap = {
    'New Arrival': 'new-arrival',
    'sale': 'promotion', 
};

const convertCategoryToPath = (category) => {

    if (categoryToPathMap[category]) {
        return categoryToPathMap[category];
    }
    return category

};
// a bc bd
const Breadcrumb = (props) => {
    const {product, tag, brand} = props;
    const categoryTagPath = product ? convertCategoryToPath(product.Product.Tag.name) : convertCategoryToPath(tag);
    const categoryBrandPath = product ? convertCategoryToPath(product.Product.Brand.name) : convertCategoryToPath(brand);


    return (
        <div className='breadcrumb ml-[130px]'>
            <nav aria-label="breadcrumb" className='mt-10 ml-10'>
                <ol className="breadcrumb flex align-items-center">
                    <li className="breadcrumb-item">
                        <a href="/" className="text-red-600 hover:text-blue-700 font-semibold text-[16px]">YOLOM</a>
                    </li>
                    <span className="mx-2 text-[16px]">{'>'}</span>

                    {product && (
                        <>
                            <li className="breadcrumb-item active" aria-current="page">
                                <Link to={`/${categoryTagPath}`}><span className='text-[16px] flex items-center text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500'>{product.Product.Tag.name}</span></Link>
                            </li>
                            <span className="mx-2">{'>'}</span>
                            <li className="breadcrumb-item active" aria-current="page">
                                <Link to={`/${categoryTagPath}/${categoryBrandPath}`}><span className='text-[16px] flex items-center text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500'>{product.Product.Brand.name}</span></Link>
                            </li>
                            <span className="mx-2 text-[16px]">{'>'}</span>
                            <li className="breadcrumb-item active" aria-current="page">
                                <span className='text-[16px]'>{product.Product.product_name}</span>
                            </li>
                        </>
                    )}
                    {!product && tag && (
                        <>
                            <Link to={`/${categoryTagPath}`}><span className='text-[16px] flex items-center text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500'>{tag}</span></Link>

                        </>

                        
                    )}
                </ol>
            </nav>
        </div>
    );
};

Breadcrumb.propTypes = {
    product: PropTypes.shape({
        Product: PropTypes.objectOf(PropTypes.string).isRequired,
        Tag: PropTypes.string,
        name: PropTypes.string,
        Brand: PropTypes.string
    }),
    tag: PropTypes.string,
    brand: PropTypes.string
};



export default Breadcrumb