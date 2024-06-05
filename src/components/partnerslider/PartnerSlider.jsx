"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Airasia,
  Energizer,
  Gamuda,
  Smobble,
  SunwayUniversity,
} from "@/assets";

export default function PartnerSlider() {
  var settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    loop: true,
  };
  return (
    <Slider {...settings}>
      <div className="slider_box">
        <Image src={SunwayUniversity} alt="Sunway Unviversity"></Image>
      </div>
      <div className="slider_box">
        <Image src={Airasia} alt="Air Asia"></Image>
      </div>
      <div className="slider_box">
        <Image src={Smobble} alt="Smobble"></Image>
      </div>
      <div className="slider_box">
        <Image src={Energizer} alt="Energizer"></Image>
      </div>
      <div className="slider_box">
        <Image src={Gamuda} alt="Gamuda"></Image>
      </div>
    </Slider>
  );
}
