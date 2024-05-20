import { useState, useEffect } from 'react';

function useResponsiveSlides() {
    const [slidesToShow, setSlidesToShow] = useState(4);

    useEffect(() => {
        const updateSlidesToShow = () => {
            if (window.innerWidth >= 1280) {
                setSlidesToShow(3);
            } else if (window.innerWidth >= 1000) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(1);
            }
        };

        window.addEventListener('resize', updateSlidesToShow);
        updateSlidesToShow();

        return () => window.removeEventListener('resize', updateSlidesToShow);
    }, []);

    return slidesToShow;
}
export default useResponsiveSlides;