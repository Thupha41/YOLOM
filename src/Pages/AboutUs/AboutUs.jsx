import React from "react";
import { FaEye } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { IoDiamond } from "react-icons/io5";
import PhatDat from "../../assets/Members/PhatDat.jpg";
import Phat from "../../assets/Members/Phat.jpg";
import Dat from "../../assets/Members/Dat.jpg";
const AboutUs = () => {
  const iconStyle = {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100px",
    height: "100px",
    backgroundColor: "#9c27b0",
    color: "white",
    fontWeight: "bold",
    fontSize: "24px",
    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
    margin: "10px",
  };
  const sectionStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "50px 0",
    color: "white",
    background: "linear-gradient(to right, #b24592, #f15f79)",
  };

  const columnStyle = {
    flexBasis: "30%",
    textAlign: "center",
  };

  return (
    <div>
      {/* Header section  */}
      <div className="relative bg-cover bg-no-repeat bg-center bg-[#0586db]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <h1 className="text-white font-bold text-4xl md:text-6xl text-center font-cursive text-shadow-custom">
            YOLOM
          </h1>
          <p className="text-lg md:text-xl text-center mt-4 text-white">
            The leading distributor of international fashion brands in Vietnam.
          </p>
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <div style={iconStyle}>Y</div>
            <div style={iconStyle}>O</div>
            <div style={iconStyle}>L</div>
            <div style={iconStyle}>O</div>
            <div style={iconStyle}>M</div>
          </div>
        </div>
      </div>
      {/* Content section  */}
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 className="font-cursive text-black text-6xl text-shadow-custom lg:text-4xl font-bold leading-9 pb-4">
              About Us
            </h1>
            <p className="font-normal text-base leading-6 text-gray-600 ">
              YOLOM - A member of the UIT O21 Group, is a distributor managing
              leading international fashion brands in Vietnam. YOLOM is on a
              mission to bring Vietnamese closer to the fashion capital of
              luxury. At YOLOM, we provide genuine luxury shopping services,
              accompanied by exclusive privileges for members and VIP customers,
              showcasing over 24+ international fashion brands. YOLOM aims to
              bring a fresh breeze to fashion enthusiasts who appreciate beauty
              and aspire to spread their passion for fashion within the
              community.
            </p>
            <p className="font-normal text-base leading-6 text-gray-600 mt-6">
              YOLOM brands are exclusively distributed in the Vietnamese market
              such as Nike, Mango, Levi&apos;s, Gap, Old Navy, Calvin Klein,
              Tommy Hilfiger, Mothercare, OVS, Banana Republic, Owndays, French
              Connection, Parfois, Cotton:On, Typo , Dockers, Sunnies Studios,
              Swarovski, Guess, Sisley, Karl Lagerfeld, United Colors of
              Benetton, Polo Ralph Lauren, Sunnies Face.
            </p>
          </div>
          <div className="w-full lg:w-8/12 ">
            <img
              className="h-[530px] w-full object-cover"
              src={PhatDat}
              alt="A group of People"
            />
          </div>
        </div>

        <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4 font-cursive text-shadow-custom">
              Our Story
            </h1>
            <p className="font-normal text-base leading-6 text-gray-600 ">
              Established in 2024, the milestone on the development journey was
              marked at University of Information Technology - YOLOM&apos; first
              store with a sole mission - to bring Vietnamese men completely
              distributed brands the best. On that journey, we realized fashion
              has the ability to empower and satisfy men everywhere.
              Circumstances, consistent with the dynamic context of the new era.
              Over the past 2 months, YOLOM has existed with a system of more
              than 4 stores nationwide, accompanying hundreds of thousands of
              Vietnamese beauties, we are still aiming for more perfection every
              day to continue on. journey to shape a youthful and elegant style
              for modern men. YOLOM hopes that each &quot;work&quot; created
              will contribute to the confidence, happiness and enjoyment of life
              to the fullest for contemporary men.
            </p>
          </div>
          <div className="w-full lg:w-8/12 lg:pt-8">
            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  className="md:block hidden rounded"
                  src={Phat}
                  alt="Phat-img"
                />
                <p className="font-medium text-lg leading-5 text-gray-800 mt-4">
                  Ngô Thuận Phát
                </p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  className="md:block hidden rounded"
                  src="https://i.ibb.co/fGmxhVy/Rectangle-119.png"
                  alt="Olivia featured Img"
                />
                <p className="font-medium text-lg leading-5 text-gray-800 mt-4">
                  Võ Thị Thu Tiên
                </p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  className="md:block hidden rounded"
                  src="https://i.ibb.co/Pc6XVVC/Rectangle-120.png"
                  alt="Liam featued Img"
                />
                <p className="font-medium text-lg leading-5 text-gray-800 mt-4">
                  Nhật Anh
                </p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  className="md:block hidden rounded"
                  src={Dat}
                  alt="Elijah featured img"
                />
                <p className="font-medium text-lg leading-5 text-gray-800 mt-4">
                  Đặng Thành Đạt
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={sectionStyle}>
        {/* Column 1 */}
        <div style={columnStyle}>
          <div style={iconStyle}>
            <FaEye className="h-10 w-10" />
          </div>
          <h1 className="font-cursive text-white text-3xl text-shadow-custom">
            Vision
          </h1>
          <p className="mt-4">
            To become Southeast Asia&apos;s leading retail & service company and
            a gathering place for the region&apos;s brightest talents.
          </p>
        </div>
        {/* Column 2 */}
        <div style={columnStyle}>
          <div style={iconStyle}>
            <GoGoal className="h-10 w-10" />
          </div>
          <h1 className="font-cursive text-white text-3xl text-shadow-custom">
            Mission
          </h1>
          <p className="mt-4">
            Become the number one retail partner in Vietnam for brands top in
            the world.
          </p>
        </div>
        {/* Column 3 */}
        <div style={columnStyle}>
          <div style={iconStyle}>
            <IoDiamond className="h-10 w-10" />
          </div>
          <h1 className="font-cursive text-white text-3xl text-shadow-custom">
            Core values
          </h1>
          <p className="mt-4">
            Integrity, People, Respect, Responsibility, Professionalism,
            Results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
