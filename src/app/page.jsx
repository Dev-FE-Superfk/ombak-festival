'use client';
import {VideoPlayer} from '@/components';
import {OmbakIntro2, OmbakOpening2} from '../../public/videos';
import {useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import {
  DesaruCoast,
  Partner,
  Ombak2025Logo,
  OmbakNewLogo,
  UltimateWeekend,
  AnnouncementArtists,
  AnnouncementArtistsTablet,
  AnnouncementArtistsMobile,
  DayPass,
  PartnerMobile,
  DayPassMobile,
  DayPassMobile2,
} from '../../public';
import {useRouter} from 'next/navigation';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/ombakNewHomepage.scss';

export default function page() {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);
  const [widthScreen, setWidthScreen] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);
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

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };
  useEffect(() => {
    if (widthScreen > 743) {
      // Updated from 1024 to 743
      let isScrolling = false;
      let scrollTimeout = null;

      const handleWheel = (event) => {
        if (isScrolling) return;

        if (event.deltaY > 0) {
          isScrolling = true;
          nextSlide();
          scrollTimeout = setTimeout(() => {
            isScrolling = false;
          }, 1000);
        } else if (event.deltaY < 0) {
          isScrolling = true;
          prevSlide();
          scrollTimeout = setTimeout(() => {
            isScrolling = false;
          }, 1000);
        }
      };

      window.addEventListener('wheel', handleWheel);

      return () => {
        window.removeEventListener('wheel', handleWheel);
        if (scrollTimeout) clearTimeout(scrollTimeout);
      };
    } else {
      let startY = 0;
      let endY = 0;
      const threshold = 50;

      const handleTouchStart = (e) => {
        startY = e.touches[0].clientY;
      };

      const handleTouchEnd = (e) => {
        endY = e.changedTouches[0].clientY;
        const diff = startY - endY;

        if (Math.abs(diff) > threshold) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
      };

      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [widthScreen]);

  var settings_desktop = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    loop: true,
    vertical: true,
    verticalSwiping: true,
    horizontalSwiping: false,
    ref: sliderRef,
    appendDots: (dots) => (
      <div className='custom_dots'>
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
          className='arrows-container'
          style={{position: 'absolute', left: '-5px', bottom: '-60px'}}
        >
          <button
            className='custom-arrow next-arrow'
            onClick={nextSlide}
            style={{
              border: '1px solid #FAF4E8',
              borderRadius: '50%',
              transform: 'rotate(90deg)',
            }}
          >
            <svg width='38' height='38' viewBox='0 0 24 24' fill='none'>
              <path
                d='M5 12h14M12 5l7 7-7 7'
                stroke='#faf4e8'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
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

  const handleTracking = async (payload) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      if (payload.event === 'cta_click') {
        if (payload.remarks === 'past_year') router.push('/2024');
        else if (
          payload.remarks === 'buy_ticket_1' ||
          payload.remarks === 'buy_ticket_2'
        )
          window.open('https://www.ticketmelon.com');
      }
    }
  };

  const handleFormatSessionStart = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  };

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  useEffect(() => {
    if (!localStorage.getItem('unique_id')) {
      localStorage.setItem('unique_id', generateUUID());
    }

    if (sessionStorage.getItem('session_id')) {
      sessionStorage.removeItem('session_id');
      sessionStorage.removeItem('session_start');
    } else {
      sessionStorage.setItem('session_id', generateUUID());
      sessionStorage.setItem('session_start', handleFormatSessionStart());
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem('unique_id') &&
      sessionStorage.getItem('session_id') &&
      firstLoad
    ) {
      setFirstLoad(false);
      handleTracking({
        event: 'page_view',
        referer: document.referrer,
        url: window.location.href,
        unique_id: localStorage.getItem('unique_id'),
        session_id: sessionStorage.getItem('session_id'),
      });
    }
  }, [
    localStorage.getItem('unique_id'),
    sessionStorage.getItem('session_id'),
    firstLoad,
  ]);

  return (
    <div className='home_ctr'>
      {!showContent && (
        <div className='video_intro_ctr'>
          <VideoPlayer
            src={OmbakIntro2}
            type='video/mp4'
            loop={false}
            className='background_video'
          />
        </div>
      )}

      {showContent && (
        <div className='home_content_ctr'>
          <VideoPlayer
            src={OmbakOpening2}
            type='video/mp4'
            className='background_video'
          />
          <div className='main_content'>
            <div className='inner_ctr'>
              <div className='upper_ctr'>
                <Image src={OmbakNewLogo} alt='ombak new logo' quality={100} />
                <button
                  className='vpy_button'
                  onClick={() =>
                    handleTracking({
                      event: 'cta_click',
                      url: window.location.href,
                      remarks: 'past_year',
                    })
                  }
                >
                  View Past Year
                </button>
              </div>
              <div className='slider_container'>
                <div className='slider_wrapper'>
                  <Slider
                    {...settings_desktop}
                    ref={sliderRef}
                    afterChange={(currentSlide) => {
                      if (currentSlide === 1 && percentage < 0.66) {
                        setPercentage(0.66);
                        handleTracking({
                          event: 'scroll',
                          remarks: '66%',
                          url: window.location.href,
                          unique_id: localStorage.getItem('unique_id'),
                          session_id: sessionStorage.getItem('session_id'),
                        });
                      } else if (
                        currentSlide === 2 &&
                        percentage >= 0.66 &&
                        percentage < 1
                      ) {
                        setPercentage(1);
                        handleTracking({
                          event: 'scroll',
                          remarks: '100%',
                          url: window.location.href,
                          unique_id: localStorage.getItem('unique_id'),
                          session_id: sessionStorage.getItem('session_id'),
                        });
                      }
                    }}
                  >
                    <div className='slider_box'>
                      <div className='slider_intro'>
                        <div className='si_box'>
                          <Image
                            src={UltimateWeekend}
                            alt='ultimate weekend'
                            className='ult_weekend'
                            width={300}
                            height={300}
                            quality={100}
                          />
                          <Image
                            src={Ombak2025Logo}
                            alt='ombak 2025 logo'
                            className='ombak_2025_logo'
                            width={305}
                            height={44}
                            quality={100}
                          />
                          <Image
                            src={DesaruCoast}
                            alt='Desaru Coast'
                            className='presented_desaru_coast'
                            width={255}
                            height={20}
                            quality={100}
                          />
                          <Image
                            src={Partner}
                            alt='Partner'
                            className='partner'
                            width={648}
                            height={41}
                            quality={100}
                          />
                          <Image
                            src={PartnerMobile}
                            alt='Partner'
                            className='partner_mobile'
                            width={362}
                            height={55}
                            quality={100}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='slider_box cream_bg'>
                      <div className='slider_box_mobile'>
                        <Image
                          src={AnnouncementArtists}
                          alt='announcement artists'
                          className='announcement_artists'
                          width={1140}
                          height={550}
                          quality={100}
                        />
                        <Image
                          src={AnnouncementArtistsTablet}
                          alt='announcement artists'
                          className='announcement_artists_tablet'
                          width={588}
                          height={720}
                          quality={100}
                        />
                        <Image
                          src={AnnouncementArtistsMobile}
                          alt='announcement artists'
                          className='announcement_artists_mobile'
                          width={378}
                          height={362}
                          quality={100}
                        />
                      </div>
                      <div className='buy_ticket_ctr'>
                        <button
                          className='buy_ticket'
                          onClick={() =>
                            handleTracking({
                              event: 'cta_click',
                              url: window.location.href,
                              remarks: 'buy_ticket_1',
                              session_start:
                                sessionStorage.getItem('session_start'),
                              unique_id: localStorage.getItem('unique_id'),
                              session_id: sessionStorage.getItem('session_id'),
                            })
                          }
                        >
                          BUY TICKETS
                        </button>
                      </div>
                    </div>

                    <div className='slider_box cream_bg custom'>
                      <div className='slider_box_mobile'>
                        <div className='day_pass_ctr'>
                          <h3 className='main_text'>
                            Early Bird Tickets <br />
                            Available Now
                          </h3>
                          <Image
                            src={DayPass}
                            width={810}
                            height={260}
                            alt='Day Pass'
                            quality={100}
                            className='day_pass'
                          />
                          <Image
                            src={DayPassMobile}
                            width={378}
                            height={362}
                            alt='Day Pass'
                            quality={100}
                            className='day_pass_mobile'
                          />
                          <Image
                            src={DayPassMobile2}
                            width={263}
                            height={332}
                            alt='Day Pass'
                            quality={100}
                            className='day_pass_mobile2'
                          />
                          <span className='orangeText'>
                            Don’t miss out! <span>Book your spot now!</span>
                          </span>
                        </div>
                      </div>
                      <button
                        className='buy_ticket'
                        onClick={() =>
                          handleTracking({
                            event: 'cta_click',
                            url: window.location.href,
                            remarks: 'buy_ticket_2',
                            session_start:
                              sessionStorage.getItem('session_start'),
                            unique_id: localStorage.getItem('unique_id'),
                            session_id: sessionStorage.getItem('session_id'),
                          })
                        }
                      >
                        BUY TICKETS
                      </button>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
