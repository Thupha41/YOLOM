import React from 'react';

const AboutUs = () => {

    const iconStyle = {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100px',
        height: '100px',
        backgroundColor: '#9c27b0',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '24px',
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        margin: '10px'
    };
    const sectionStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '50px 0',
        color: 'white',
        background: 'linear-gradient(to right, #b24592, #f15f79)', // Example gradient background
    };

    const columnStyle = {
        flexBasis: '30%', 
        textAlign: 'center',
    };
    const gridContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#fff' // or any background color you want
    };
  return (
    <div>
        {/* Header section  */}
        <div className="relative bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url(/path-to-your-background-image.jpg)' }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="container mx-auto px-4 py-20 relative">
                    <h1 className="text-white font-bold text-4xl md:text-6xl text-center">
                        YOLOM
                    </h1>
                    <p className="text-white text-lg md:text-xl text-center mt-4">
                        The leading distributor of international fashion brands in Vietnam.
                    </p>
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <div style={iconStyle}>Y</div>
                    <div style={iconStyle}>O</div>
                    <div style={iconStyle}>L</div>
                    <div style={iconStyle}>O</div>
                    <div style={iconStyle}>M</div>
                </div>
            </div>
        </div>
        {/* Content section  */}
        <div className="bg-pattern bg-cover bg-fixed text-white p-10 text-center relative">
            <div className="absolute inset-0 bg-dark-overlay" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
            <div className="relative z-10">
                <h1 className="text-5xl font-bold mb-4">About us</h1>
                <hr className="border-2 border-white mx-auto w-40 mb-4" />
                <p className="mb-4">
                    YOLOM - A member of the UIT O21 Group, is a distributor managing leading international fashion brands in Vietnam. With a network of over 270 stores in major urban centers across the country, YOLOM is on a mission to bring Vietnamese closer to the fashion capital of luxury. At YOLOM, we provide genuine luxury shopping services, accompanied by exclusive privileges for members and VIP customers, showcasing over 24+ international fashion brands. YOLOM aims to bring a fresh breeze to fashion enthusiasts who appreciate beauty and aspire to spread their passion for fashion within the community.
                </p>
                <p>
                    The exclusive brands distributed by YOLOM in the Vietnamese market include Mango, Levi&apos;s, Gap, Old Navy, Banana Republic, Cotton:On.
                </p>
            </div>
        </div>
        <div style={sectionStyle}>
            {/* Column 1 */}
            <div style={columnStyle}>
                <div style={iconStyle}>A</div>
                <h2>Tầm nhìn</h2>
                    <p>Trở thành công ty dịch vụ & bán lẻ hàng đầu Đông Nam Á và là nơi hội tụ những tài năng sáng giá của khu vực.</p>
            </div>
            {/* Column 2 */}
            <div style={columnStyle}>
                <div style={iconStyle}>C</div>
                <h2>Sứ mệnh</h2>
                    <p>Trở thành đối tác bán lẻ số Một tại Việt Nam cho các thương hiệu hàng đầu trên thế giới.</p>
            </div>
            {/* Column 3 */}
            <div style={columnStyle}>
                <div style={iconStyle}>F</div>
                <h2>Giá trị cốt lõi</h2>
                    <p>Chính Trực, Con Người, Tôn Trọng, Trách Nhiệm, Chuyên Nghiệp, Kết Quả.</p>
            </div>
        </div>
        {/* New grid gallery section */}
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <h2>Chúng tôi là ai?</h2>
            <p lang='vi'>
                Hình thành từ năm 2009, ACFC tự hào là nhà phân phối các thương hiệu thời trang quốc tế hàng đầu Việt Nam,
                mang người Việt đến gần hơn với thời trang hiệu, đồng hành cùng UIT Group
                “Chọn để dẫn đầu”
            </p>
            <div style={gridContainerStyle}>
            {/* Repeat this div for each image you want to display */}
            <div>
            <img src="/path-to-your-image.jpg" alt="Description" style={{ width: '100%', height: 'auto' }} />
            {/* Add image description or caption here if needed */}
          </div>
          {/* ...other images */}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
