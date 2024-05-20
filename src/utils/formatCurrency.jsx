const formatNumber = (number) => {
    return new Intl.NumberFormat('vi-VN').format(number);
}

export default formatNumber;