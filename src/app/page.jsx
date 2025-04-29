'use client';
import {VideoPlayer} from '@/components';
import {OmbakIntro2, OmbakOpening2} from '../../public/videos';
import {useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import {
  BlueVector,
  GreenVector,
  LeftAttribute,
  MaskHugeImage,
  MaskSmallImage,
  Ombak2025Logo,
  OmbakNewLogo,
  RightAttribute,
  TimeTicket,
  UltimateWeekend,
} from '../../public';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/ombakNewHomepage.scss';
import {useRouter} from 'next/navigation';

export default function page() {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);
  const [widthScreen, setWidthScreen] = useState(0);

  const updateScreenWidth = () => {
    setWidthScreen(window.innerWidth);
  };

  useEffect(() => {
    updateScreenWidth();

    window.addEventListener('resize', updateScreenWidth);

    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);

  const sliderRef = useRef(null);

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  // const prevSlide = () => {
  //   sliderRef.current.slickPrev();
  // };

  var settings_desktop = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    loop: true,
    vertical: true, // Tambahkan ini untuk slider vertikal
    verticalSwiping: true, // Aktifkan swipe vertikal
    ref: sliderRef,
    appendDots: (dots) => (
      <div
        style={{
          position: 'absolute',
          left: '-200px',
          bottom: '0px',
          zIndex: 10,
        }}
      >
        <ul
          style={{
            margin: '0',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {dots}
        </ul>
        <div
          className="arrows-container"
          style={{position: 'absolute', left: '-5px', bottom: '-60px'}}
        >
          <button
            className="custom-arrow next-arrow"
            onClick={nextSlide}
            style={{
              border: '1px solid #FAF4E8',
              borderRadius: '50%',
              transform: 'rotate(90deg)',
            }}
          >
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="#faf4e8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: i === 0 ? '#faf4e8' : 'rgba(250, 244, 232, 0.5)',
          transition: 'all 0.3s ease',
        }}
      />
    ),
  };

  var settings_tablet = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    loop: true,
    vertical: true, // Tambahkan ini untuk slider vertikal
    verticalSwiping: true, // Aktifkan swipe vertikal
    ref: sliderRef,
    appendDots: (dots) => (
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: '-100px',
          zIndex: 10,
        }}
      >
        <div
          className="arrows-container"
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '40px',
            transform: 'translateX(-50%)',
          }}
        >
          <button
            className="custom-arrow next-arrow"
            onClick={nextSlide}
            style={{
              border: '1px solid #FAF4E8',
              borderRadius: '50%',
              transform: 'rotate(90deg)',
            }}
          >
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="#faf4e8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <ul
          style={{
            margin: '0',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: i === 0 ? '#faf4e8' : 'rgba(250, 244, 232, 0.5)',
          transition: 'all 0.3s ease',
        }}
      />
    ),
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home_ctr">
      {!showContent && (
        <div className="video_intro_ctr">
          <VideoPlayer
            src={OmbakIntro2}
            type="video/mp4"
            loop={false}
            className="background_video"
          />
        </div>
      )}

      {showContent && (
        <div className="home_content_ctr">
          <VideoPlayer
            src={OmbakOpening2}
            type="video/mp4"
            className="background_video"
          />
          <div className="main_content">
            <div className="inner_ctr">
              <div className="upper_ctr">
                <Image src={OmbakNewLogo} alt="ombak new logo" />
                <button
                  className="vpy_button"
                  onClick={() => {
                    router.push('/2024');
                  }}
                >
                  View Past Year
                </button>
              </div>
              {widthScreen > 768 && (
                <Image
                  src={LeftAttribute}
                  alt="left attribute"
                  className="left_attr"
                />
              )}
              <div className="slider_container">
                <div className="slider_wrapper">
                  {widthScreen > 1024 && (
                    <Slider {...settings_desktop}>
                      <div className="slider_box">
                        <Image
                          src={UltimateWeekend}
                          alt="ultimate weekend"
                          className="ult_weekend"
                          width={300}
                          height={300}
                          quality={100}
                        />
                        <Image
                          src={Ombak2025Logo}
                          alt="ombak 2025 logo"
                          className="ombak_2025_logo"
                          width={200}
                          height={200}
                          quality={100}
                        />
                      </div>
                      <div className="slider_box cream_bg">
                        <p className="main_text">
                          Tickets <br /> Available Now
                        </p>
                        <Image
                          src={BlueVector}
                          alt="blue vector"
                          className="blue_vector"
                          width={32}
                          height={32}
                        />
                        <Image
                          src={TimeTicket}
                          alt="time ticket"
                          className="time_ticket"
                        />
                        <p className="sub_text">
                          <span>Desaru Coast, Johor, Malaysia</span>
                        </p>
                        <button className="buy_ticket">BUY TICKETS</button>
                        <Image
                          src={GreenVector}
                          alt="green vector"
                          className="green_vector"
                          width={55}
                          height={55}
                        />
                        <Image
                          src={MaskSmallImage}
                          alt="mask small image"
                          className="mask_small_image"
                          width={524}
                          height={524}
                          quality={100}
                        />
                        <Image
                          src={MaskHugeImage}
                          alt="mask huge image"
                          className="mask_huge_image"
                          width={584}
                          height={1166}
                          quality={100}
                        />
                      </div>
                      <div className="slider_box cream_bg">
                        <div className="bg_silver_ctr"></div>
                        <div className="buy_ticket_ctr">
                          <button className="buy_ticket slide_3">
                            BUY TICKETS
                          </button>
                        </div>
                      </div>
                    </Slider>
                  )}
                  {widthScreen < 1024 && widthScreen > 768 && (
                    <Slider {...settings_tablet}>
                      <div className="slider_box">
                        <Image
                          src={UltimateWeekend}
                          alt="ultimate weekend"
                          className="ult_weekend"
                          width={150}
                          height={150}
                        />
                        <Image
                          src={Ombak2025Logo}
                          alt="ombak 2025 logo"
                          className="ombak_2025_logo"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="slider_box ">
                        <div className="cream_bg">
                          <p className="main_text">Tickets Available Now</p>
                          <Image
                            src={BlueVector}
                            alt="blue vector"
                            className="blue_vector"
                            width={32}
                            height={32}
                          />
                          <Image
                            src={TimeTicket}
                            alt="time ticket"
                            className="time_ticket"
                          />
                          <p className="sub_text">
                            <span>Desaru Coast, Johor, Malaysia</span>
                          </p>
                          <Image
                            src={GreenVector}
                            alt="green vector"
                            className="green_vector"
                            width={55}
                            height={55}
                          />
                          <Image
                            src={MaskSmallImage}
                            alt="mask small image"
                            className="mask_small_image"
                            width={262}
                            height={262}
                          />
                          <Image
                            src={MaskHugeImage}
                            alt="mask huge image"
                            className="mask_huge_image"
                            width={292}
                            height={583}
                          />
                        </div>
                        <button className="buy_ticket slide_3">
                          BUY TICKETS
                        </button>
                      </div>
                      <div className="slider_box">
                        <div className="cream_bg"></div>
                        <button className="buy_ticket slide_3">
                          BUY TICKETS
                        </button>
                      </div>
                    </Slider>
                  )}
                  {widthScreen < 768 && (
                    <Slider {...settings_tablet}>
                      <div className="slider_box">
                        <Image
                          src={LeftAttribute}
                          alt="left attribute"
                          className="left_attr"
                        />
                        <Image
                          src={UltimateWeekend}
                          alt="ultimate weekend"
                          className="ult_weekend"
                          width={150}
                          height={150}
                        />
                        <Image
                          src={Ombak2025Logo}
                          alt="ombak 2025 logo"
                          className="ombak_2025_logo"
                          width={100}
                          height={100}
                        />
                        <Image
                          src={RightAttribute}
                          alt="right attribute"
                          className="right_attr"
                        />
                      </div>
                      <div className="slider_box">
                        <div className="cream_bg">
                          <p className="main_text">Tickets Available Now</p>
                          <div>
                            <Image
                              src={BlueVector}
                              alt="blue vector"
                              className="blue_vector"
                              width={32}
                              height={32}
                            />
                            <Image
                              src={TimeTicket}
                              alt="time ticket"
                              className="time_ticket"
                            />
                            <p className="sub_text">
                              Desaru Coast, Johor, Malaysia
                            </p>
                          </div>
                          <Image
                            src={GreenVector}
                            alt="green vector"
                            className="green_vector"
                            width={55}
                            height={55}
                          />
                          <Image
                            src={MaskHugeImage}
                            alt="mask huge image"
                            className="mask_huge_image"
                            width={292}
                            height={583}
                          />
                        </div>
                        <button className="buy_ticket slide_3">
                          BUY TICKETS
                        </button>
                      </div>
                      <div className="slider_box">
                        <div className="cream_bg"></div>
                        <button className="buy_ticket slide_3">
                          BUY TICKETS
                        </button>
                      </div>
                    </Slider>
                  )}
                </div>
              </div>
              {widthScreen > 768 && (
                <Image
                  src={RightAttribute}
                  alt="right attribute"
                  className="right_attr"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
