'use client';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/home.scss';
import {
  ImageOmbak,
  LogoYellow,
  Category1,
  Category2,
  Category3,
  Category4,
  WaveGreen,
  WaveDarkGreen,
  WaveOrange,
  WaveYellow,
  ImageResort,
  Hardrock,
  Onenonly,
  TheWestin,
  Anantara,
  WaveGreenLong,
  MemoriesCover,
  MemoriesCoverM,
  TicketMelon,
  Sistic,
  OmbakSaveTheDate,
  OmbakSaveTheDateMobile,
  OmbakExperience,
  OmbakExperienceMobile,
} from '@/assets';
import {useEffect, useState} from 'react';
import {VideoPlayer, PartnerSlider, RunningText, Modal} from '@/components';
import {VideoOmbak} from '../../../public/videos';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Home() {
  const [artists, setArtists] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const classes = ['mask1', 'mask2', 'mask3', 'mask4'];
  useEffect(() => {
    // Gantilah URL ini dengan URL API Anda
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/homepage';

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-api-key': 'bda07dc4-cab9-4148-ac9c-7a44c3c55wqr9',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Asumsikan struktur data dari API sesuai dengan yang kita butuhkan
        const artists = data.data.artists;
        setArtists(artists);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });

    // Check if the screen is mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openSecondModal = () => {
    setShowSecondModal(true); // Pastikan modal kedua tertutup saat membuka modal pertama
  };

  const closeSecondModal = () => {
    setShowSecondModal(false); // Function to close second modal
  };

  // Settings for the slider
  const sliderSettings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    variableWidth: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '60px',
  };

  return (
    <>
      <div className="section_one">
        <div className="mobile_text">
          <Image src={LogoYellow} alt=""></Image>
          <div className="text_info">
            12 - 14 SEPTEMBER 2025
            <br />
            DESARU COAST, JOHOR, MALAYSIA
            <span>SAVE THE DATE</span>
          </div>
        </div>
        <Image src={ImageOmbak} alt="" className="desktop"></Image>
        <VideoPlayer src={VideoOmbak} type="video/mp4" />
        <div className="container">
          <div className="text">
            <Image src={LogoYellow} alt=""></Image>
            <div className="text_info">
              12 - 14 SEPTEMBER 2025
              <br />
              DESARU COAST, JOHOR, MALAYSIA
              <span>SAVE THE DATE</span>
            </div>
          </div>
        </div>
      </div>
      <RunningText></RunningText>
      <div className="section_experience_img">
        <Image
          className="desktop"
          src={OmbakExperience}
          width={1366}
          height={756}
          alt=""
          quality={100}
        ></Image>
        <Image
          className="mobile"
          src={OmbakExperienceMobile}
          width={375}
          height={453}
          alt=""
          quality={100}
        ></Image>
      </div>
      {/* <RunningText></RunningText> */}
      {/* <div className='section_new_ticket'>
        <div className='container'>
          <div className='snt_box'>
            <h3>
              Get your Festival Day <br />
              Passes now
            </h3>
            <button disabled onClick={openSecondModal}>
              Buy Pass
            </button>
          </div>
          <div className='snt_box'>
            <h3>
              Get your Stay <br />
              Packages now
            </h3>
            <Link href='/stay?tag=hard_rock_hotel'>
              <button disabled>Book Now</button>
            </Link>
          </div>
        </div>
      </div> */}
      {/* <div className='section_two'>
        <div className='ornament_left'>
          <div className='ornament_1'></div>
          <div className='ornament_2'></div>
          <div className='ornament_4'></div>
          <div className='ornament_6'></div>
        </div>
        <div className='container'>
          <h2 className='desktop'>
            Malay for ocean wave, "Ombak"
            <Image
              src={IconOmbakOrange}
              width={46}
              height={46}
              alt='Wave Green'
            ></Image>
            <br /> is more than a festival - it's the <br />
            ultimate coastal weekend
            <Image
              src={IconOmbakPurple}
              width={46}
              height={46}
              alt='Wave purple'
            ></Image>
            of <br />
            music, art, food, and family fun.
          </h2>
          <h2 className='mobile'>
            Malay for ocean wave, <br />
            "Ombak"
            <Image
              src={IconOmbakOrange}
              width={46}
              height={46}
              alt='Wave Green'
            ></Image>
            is more than <br />a festival - it's the <br />
            ultimate coastal weekend <br />
            <Image
              src={IconOmbakPurple}
              width={46}
              height={46}
              alt='Wave purple'
            ></Image>
            of music, art, food, <br />
            and family fun.
          </h2>
        </div>
        <div className='ornament_right'>
          <div className='ornament_7'></div>
          <div className='ornament_8'></div>
          <div className='ornament_8a'></div>
          <div className='ornament_11'></div>
          <div className='ornament_12'></div>
        </div>
      </div> */}
      <div className="section_three">
        <div className="category_box">
          <Link href="/experience/music-and-performances">
            <div className="category_image">
              <Image src={Category1} alt="Music and Perfomances"></Image>
            </div>
            <div className="category_text">
              <div className="category_title">Music &amp; Perfomances</div>
              <Image src={WaveGreen} alt="Wave Green"></Image>
            </div>
          </Link>
        </div>
        <div className="category_box">
          <Link href="/experience/visual-arts-and-craft">
            <div className="category_image">
              <Image src={Category2} alt="Visual Arts and Craft"></Image>
            </div>
            <div className="category_text">
              <div className="category_title">
                Visual Arts
                <br />
                &amp; Craft
              </div>
              <Image src={WaveYellow} alt="Wave Yelow"></Image>
            </div>
          </Link>
        </div>
        <div className="category_box">
          <Link href="/experience/food-and-beverages">
            <div className="category_image">
              <Image src={Category4} alt="Culinary"></Image>
            </div>
            <div className="category_text">
              <div className="category_title">F&amp;B</div>
              <Image src={WaveDarkGreen} alt="Wave Dark Green"></Image>
            </div>
          </Link>
        </div>
        <div className="category_box">
          <Link href="/experience/ombak-kids">
            <div className="category_image">
              <Image src={Category3} alt="Ombak Kids"></Image>
            </div>
            <div className="category_text">
              <div className="category_title">Ombak Kids</div>
              <Image src={WaveOrange} alt="Wave Orange"></Image>
            </div>
          </Link>
        </div>
      </div>
      <div className="section_four">
        <Image src={ImageResort} alt="Resorts Cover"></Image>
        <div className="container">
          <div className="box_left">
            <p className="text_title">Our Resorts</p>
            <p>Book your Ultimate Weekend</p>
            <Link href="/stay?tag=hard_rock_hotel">
              <div className="button">Explore</div>
            </Link>
          </div>
          <div className="box_right">
            <Link className="resorts_box" href="/stay?tag=hard_rock_hotel">
              <Image src={Hardrock} alt="Hardrock"></Image>
            </Link>
            <Link className="resorts_box" href="/stay?tag=one_and_only">
              <Image src={Onenonly} alt="One n Only"></Image>
            </Link>
            <Link className="resorts_box" href="/stay?tag=the_westin">
              <Image src={TheWestin} alt="The Westin"></Image>
            </Link>
            <Link className="resorts_box" href="/stay?tag=anantara">
              <Image src={Anantara} alt="Anantara"></Image>
            </Link>
          </div>
        </div>
      </div>
      <div className="section_five">
        <div className="container">
          <h2>
            An exciting and eclectic lineup of <br />
            <span>world-class</span> artistes
          </h2>
          {isMobile ? (
            <Slider {...sliderSettings}>
              {artists.map((artist, index) => (
                <div className="artist_box slider" key={artist.slug}>
                  <Link
                    href={`/experience/music-and-performances/${artist.slug}`}
                  >
                    <div
                      className={`artist_image ${
                        classes[index % classes.length]
                      }`}
                    >
                      <Image
                        src={artist.thumbnail}
                        alt={artist.slug}
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="artist_name">{artist.name}</div>
                  </Link>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="artist_wrapper">
              {artists.map((artist, index) => (
                <div className="artist_box" key={artist.slug}>
                  <Link
                    href={`/experience/music-and-performances/${artist.slug}`}
                  >
                    <div
                      className={`artist_image ${
                        classes[index % classes.length]
                      }`}
                    >
                      <Image
                        src={artist.thumbnail}
                        alt={artist.slug}
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="artist_name">{artist.name}</div>
                  </Link>
                </div>
              ))}
            </div>
          )}
          <Link href="../experience/music-and-performances">
            <div className="button">See Artists</div>
          </Link>
        </div>
        <Image src={WaveGreenLong} alt="Ombak Wave Green"></Image>
      </div>
      <div className="section_six">
        <div className="container">
          <div className="misc_box">
            <Link href="/festival-map">
              <h3>
                Navigate The <br />
                Festival
              </h3>
              <p>
                Explore our festival grounds and discover where you can find our
                partnering resorts
              </p>
              <div className="button">Explore</div>
            </Link>
          </div>
          <div className="misc_box">
            <Link href="/schedule">
              <h3>
                Plan Your <br />
                Schedule
              </h3>
              <p>
                View the full 3-day schedule to find out when and where your
                favourite acts will be
              </p>
              <div className="button">Explore</div>
            </Link>
          </div>
          <div className="misc_box">
            <Link href="/info?tag=general_info">
              <h3>
                Get Help & <br />
                Info
              </h3>
              <p>Find more information about Ombak Festival here</p>
              <div className="button">Explore</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="section_seven">
        <div className="container">
          <Image
            className="desktop"
            src={MemoriesCover}
            alt="Memories Cover"
          ></Image>
          <Image
            className="mobile"
            src={MemoriesCoverM}
            alt="Memories Cover"
          ></Image>
          <h3>
            Get ready for an unforgettable <br />
            weekend getaway!
          </h3>
          <Link href="/stay?tag=hard_rock_hotel">
            <button disabled className="button">
              <p>COMING SOON</p>
            </button>
          </Link>
        </div>
      </div>
      {/* <div className="section_eight">
        <div className="container">
          <h3>Our festival partners</h3>
          <PartnerSlider></PartnerSlider>
        </div>
      </div> */}
      {showSecondModal && (
        <>
          {/* Second modal for ticket purchase confirmation */}
          <Modal isOpen={showSecondModal} onClose={closeSecondModal}>
            <>
              <h4>
                You’ll be redirected to our ticketing partner to complete your
                purchase
              </h4>
              <div className="ticket_flex">
                <div className="ticket_box">
                  <span>For Malaysian and others</span>
                  <div className="partners_image">
                    <Image
                      className="ticketmelon"
                      src={TicketMelon}
                      width={170}
                      height={30}
                    ></Image>
                  </div>
                  <button className="next_btn">
                    <Link
                      href="https://www.ticketmelon.com/ombakfestival/ombakfestival2024"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Proceed to Ticketmelon
                    </Link>
                  </button>
                </div>
                <div className="ticket_box">
                  <span>For Singaporean</span>
                  <div className="partners_image">
                    <Image
                      className="ticketmelon"
                      src={Sistic}
                      width={97}
                      height={45}
                    ></Image>
                  </div>
                  <button className="next_btn">
                    <Link
                      href="https://sistic.com.sg/events/ombak0924"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Proceed to Sistic
                    </Link>
                  </button>
                </div>
              </div>
            </>
          </Modal>
        </>
      )}
    </>
  );
}
