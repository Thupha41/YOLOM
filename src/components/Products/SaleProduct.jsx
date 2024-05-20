import React from 'react';
import ProductSlider from '../ProductSlider/ProductSlider';
import Button from '../Buttons/Button';
import { Link } from 'react-router-dom';
const SaleProduct = () => {
    return (
        <div>
            <ProductSlider
                homeTitle="Sale Products"
                homeDescription="Top selling products for you"
                Tag='Sale'
            />
            <Link to='/promotion' onClick={() => window.scrollTo(0,0)}>
                <Button content='View All'></Button>
            </Link>
        </div>

        
    );
}

export default SaleProduct;
