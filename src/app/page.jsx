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
import { useEffect, useState } from "react";
import { VideoPlayer, PartnerSlider } from "@/components";
import { VideoOmbak } from "../../public/videos";
import { ArtistCard } from "@/components";

export default function Home() {
  const [artists, setArtists] = useState([]);
  const classes = ["mask1", "mask2", "mask3", "mask4"];
  useEffect(() => {
    // Gantilah URL ini dengan URL API Anda
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/homepage";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Asumsikan struktur data dari API sesuai dengan yang kita butuhkan
        const artists = data.data.artists;
        setArtists(artists);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  return (
    <>
      <div className="section_one">
        <Image src={ImageOmbak} alt="Ombak" className="desktop"></Image>
        {/* <Image src={ImageOmbakMobile} alt="Ombak" className="mobile"></Image> */}
        <VideoPlayer src={VideoOmbak} type="video/mp4" />
        <div className="container">
          <div className="text">
            <Image src={LogoYellow} alt="Ombak"></Image>
            <div className="text_info">
              13 - 15 September 2024
              <br />
              Desaru Coast, Johor, Malaysia
              <span>The Ultimate Weekend</span>
            </div>
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
            Malay for ocean wave, "Ombak"
            <Image
              src={IconOmbakOrange}
              width={46}
              height={46}
              alt="Wave Green"></Image>
            <br /> is more than a festival - it's the <br />
            ultimate coastal weekend{" "}
            <Image
              src={IconOmbakPurple}
              width={46}
              height={46}
              alt="Wave purple"></Image>{" "}
            that <br />
            celebrates music, art, food and <br />
            family-fun for all ages
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
              <Image src={Category3} alt="Culinary"></Image>
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
              <Image src={Category4} alt="Ombak Kids"></Image>
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
            <h3>Book your Ultimate Weekend</h3>
            <p>
              Choose your Desaru Coast resort <br />
              for Early Stay Packages
            </p>
            <Link href="/stay">
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
          <div className="artist_wrapper">
            {artists.map((artist, index) => (
              <div className="artist_box">
                <Link
                  href={`/experience/music-and-performances/${artist.slug}`}>
                  <div
                    className={`artist_image ${
                      classes[index % classes.length]
                    }`}
                    key={artist.slug}>
                    <Image
                      src={artist.thumbnail}
                      alt={artist.name}
                      width={200}
                      height={200}></Image>
                  </div>
                  <div className="artist_name">{artist.name}</div>
                </Link>
              </div>
            ))}
          </div>
          <Link href="../experience/music-and-performances">
            <div className="button">See More</div>
          </Link>
        </div>
        <Image src={WaveGreenLong}></Image>
      </div>
      {/* <div className="section_six">
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
      </div> */}
      <div className="section_seven">
        <div className="container">
          <Image src={MemoriesCover} alt="Memories Cover"></Image>
          <h3>Ready for the Ultimate Weekend?</h3>
          <div className="button">BOOK YOUR STAY PACKAGES NOW</div>
        </div>
      </div>
      {/* <div className="section_eight">
        <div className="container">
          <h3>Our festival partners</h3>
          <PartnerSlider></PartnerSlider>
        </div>
      </div> */}
    </>
  );
}
