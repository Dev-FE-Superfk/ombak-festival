"use client";
import Image from "next/image";
import Link from "next/link";
import "./home.scss";
import {
  ImageOmbak,
  LogoYellow,
  IconOmbakPurple,
  IconOmbakGreen,
  IconOmbakOrange,
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
  Artist1,
  Artist2,
  Artist3,
  Artist4,
  MemoriesCover,
} from "@/assets";
import { VideoPlayer, PartnerSlider } from "@/components";
import { VideoOmbak } from "../../public/videos";

export default function Home() {
  return (
    <>
      <div className="section_one">
        <Image src={ImageOmbak} alt="Ombak"></Image>
        <VideoPlayer src={VideoOmbak} type="video/mp4" />
        <div className="container">
          <div className="text">
            <Image src={LogoYellow} alt="Ombak"></Image>
            <ul>
              <li>
                13-15 Sep 2024
                <br />
                10am - 10pm
              </li>
              <li>
                Desaru Coast
                <br />
                Johor, Malaysia
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="section_two">
        <div className="ornament_left">
          <div className="ornament_1"></div>
          <div className="ornament_2"></div>
          <div className="ornament_3"></div>
          <div className="ornament_4"></div>
          <div className="ornament_5"></div>
          <div className="ornament_6"></div>
        </div>
        <div className="container">
          <h2>
            An unforgettable
            <Image
              src={IconOmbakPurple}
              width={46}
              height={46}
              alt="Wave purple"></Image>
            weekend getaway where arts, culture, and luxury
            <Image
              src={IconOmbakGreen}
              width={46}
              height={46}
              alt="Wave Green"></Image>
            meet at the pristine beachfront of
            <Image
              src={IconOmbakOrange}
              width={46}
              height={46}
              alt="Wave Green"></Image>
            Desaru Coast
          </h2>
        </div>
        <div className="ornament_right">
          <div className="ornament_7"></div>
          <div className="ornament_8"></div>
          <div className="ornament_9"></div>
          <div className="ornament_10"></div>
          <div className="ornament_11"></div>
          <div className="ornament_12"></div>
        </div>
      </div>
      <div className="section_three">
        <div className="category_box">
          <Link href="/music-and-performances">
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
          <Link href="/visual-artsand-craft">
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
          <Link href="/ombak-kids">
            <div className="category_image">
              <Image src={Category3} alt="Ombak Kids"></Image>
            </div>
            <div className="category_text">
              <div className="category_title">
                Ombak
                <br />
                Kids
              </div>
              <Image src={WaveOrange} alt="Wave Orange"></Image>
            </div>
          </Link>
        </div>
        <div className="category_box">
          <Link href="/culinary-and-cuisine">
            <div className="category_image">
              <Image src={Category4} alt="Culinary"></Image>
            </div>
            <div className="category_text">
              <div className="category_title">
                Culinary
                <br /> &amp; Cuisine
              </div>
              <Image src={WaveDarkGreen} alt="Wave Dark Green"></Image>
            </div>
          </Link>
        </div>
      </div>
      <div className="section_four">
        <Image src={ImageResort} alt="Resorts Cover"></Image>
        <div className="container">
          <div className="box_left">
            <h3>Our Resorts</h3>
            <p>
              Get exclusive packages with <br />
              our resorts
            </p>
            <div className="button">Explore</div>
          </div>
          <div className="box_right">
            <Link href="/resort/hard-rock-hotel">
              <div className="resorts_box">
                <Image src={Hardrock} alt="Hardrock"></Image>
              </div>
            </Link>
            <Link href="/resort/one-and-only-hotel">
              <div className="resorts_box">
                <Image src={Onenonly} alt="One n Only"></Image>
              </div>
            </Link>
            <Link href="/resort/the-westin-hotel">
              <div className="resorts_box">
                <Image src={TheWestin} alt="The Westin"></Image>
              </div>
            </Link>
            <Link href="/resort/anantara-hotel">
              <div className="resorts_box">
                <Image src={Anantara} alt="Anantara"></Image>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="section_five">
        <div className="container">
          <h2>
            Diverse lineup of <span>world-class</span> artists
          </h2>
          <div className="artist_wrapper">
            <div className="artist_box">
              <Link href="../music-and-performances/aisyah-aziz">
                <div className="artist_image">
                  <Image src={Artist1} alt="Aisyah Aziz"></Image>
                </div>
                <div className="artist_name">Aisyah Aziz</div>
              </Link>
            </div>
            <div className="artist_box">
              <Link href="../music-and-performances/alena-murang">
                <div className="artist_image">
                  <Image src={Artist2} alt="Alena Murang"></Image>
                </div>
                <div className="artist_name">Alena Murang</div>
              </Link>
            </div>
            <div className="artist_box">
              <Link href="../music-and-performances/bunga">
                <div className="artist_image">
                  <Image src={Artist3} alt="Bunga"></Image>
                </div>
                <div className="artist_name">Bunga</div>
              </Link>
            </div>
            <div className="artist_box">
              <Link href="../music-and-performances/masdo">
                <div className="artist_image">
                  <Image src={Artist4} alt="Masdo"></Image>
                </div>
                <div className="artist_name">Masdo</div>
              </Link>
            </div>
          </div>
          <Link href="../music-and-performances">
            <div className="button">See More</div>
          </Link>
        </div>
        <Image src={WaveGreenLong}></Image>
      </div>
      <div className="section_six">
        <div className="container">
          <div className="misc_box">
            <h3>
              Navigate The <br />
              Festival
            </h3>
            <p>
              Explore our festival grounds and discover where you can find our
              partnering resorts
            </p>
            <div className="button">Explore</div>
          </div>
          <div className="misc_box">
            <h3>
              Plan Your <br />
              Schedule
            </h3>
            <p>
              View the full 3-day schedule to find out when and where your
              favourite acts will be
            </p>
            <div className="button">Explore</div>
          </div>
          <div className="misc_box">
            <h3>
              Get Help & <br />
              Infos
            </h3>
            <p>Find more information about Ombak Festival here</p>
            <div className="button">Explore</div>
          </div>
        </div>
      </div>
      <div className="section_seven">
        <div className="container">
          <Image src={MemoriesCover} alt="Memories Cover"></Image>
          <h3>Making Waves. Creating memories.</h3>
          <div className="button">Get The Ticket Now</div>
        </div>
      </div>
      <div className="section_eight">
        <div className="container">
          <h3>Our Festival partners</h3>
          <PartnerSlider></PartnerSlider>
        </div>
      </div>
    </>
  );
}
