const RECENTLY_VIEWED_KEY = 'recentlyViewedProducts';

export const getRecentlyViewedProducts = () => {
    const products = localStorage.getItem(RECENTLY_VIEWED_KEY);
    return products ? JSON.parse(products) : [];
};

export const addRecentlyViewedProduct = (product) => {
    const products = getRecentlyViewedProducts();
    const existingProductIndex = products.findIndex(p => p.sku_id === product.sku_id);

    if (existingProductIndex === -1) {
        products.unshift(product);
        if (products.length > 10) {
            products.pop();
        }
    } else {
        products.splice(existingProductIndex, 1);
        products.unshift(product);
    }

    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(products));
};
