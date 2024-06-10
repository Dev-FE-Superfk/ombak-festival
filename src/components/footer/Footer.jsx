import Image from "next/image";
import {
  IconFacebook,
  IconInstagram,
  IconTiktok,
  LogoDRH,
  LogoDesaru,
  LogoOrange,
  Hardrock,
  TheWestin,
  Anantara,
  Onenonly,
  TheElsClub,
  AdventureWaterpark,
} from "@/assets";
import "@/styles/footer.scss";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer_left">
          <Image className="logo" src={LogoOrange}></Image>
          <div className="sosmed">
            <div className="sosmed_box">
              <Link
                href="https://www.facebook.com/profile.php?id=61560878937367"
                target="_blank">
                <Image src={IconFacebook} alt="Facebook Ombak"></Image>
              </Link>
            </div>
            <div className="sosmed_box">
              <Link
                href="https://www.instagram.com/ombakfestivalmy/"
                target="_blank">
                <Image src={IconInstagram} alt="Instagram Ombak"></Image>
              </Link>
            </div>
            {/* <div className="sosmed_box">
              <Image src={IconYoutube} alt="Youtube Ombak"></Image>
            </div>
            <div className="sosmed_box">
              <Image src={IconTwitter} alt="Twitter Ombak"></Image>
            </div> */}
            <div className="sosmed_box">
              <Link
                href="https://www.tiktok.com/@ombakfestivalmy"
                target="_blank">
                <Image src={IconTiktok} alt="Tiktok Ombak"></Image>
              </Link>
            </div>
          </div>
          <p>Copyright 2024 Ombak Festival</p>
        </div>
        <div className="footer_right">
          <div className="fr_top">
            <div className="fr_tablet">
              <div className="fr_box">
                <div className="fr_nav">
                  <Link href="/info?tag=info">Getting Here</Link>
                </div>
                <div className="fr_nav">Maps</div>
              </div>
              <div className="fr_box">
                <div className="fr_nav">Contact Us</div>
                <div className="fr_nav">
                  <Link href="/info?tag=faq">FAQs</Link>
                </div>
              </div>
            </div>
            <div className="fr_tablet">
              <div className="fr_box">
                <div className="fr_nav">Media Room</div>
                <div className="fr_nav">Partners</div>
              </div>
              <div className="fr_box">
                <div className="fr_nav">
                  <Link href="/privacy-statement">Privacy Statement</Link>
                </div>
                <div className="fr_nav">
                  <Link href="/terms">Terms &amp; Conditions</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="fr_bottom">
            <div className="pb_box">
              <span>Presented by:</span>
              <div className="presented_logo">
                <Link href="http://www.desarucoast.com" target="_blank">
                  <Image src={LogoDesaru} alt="Desaru"></Image>
                </Link>
              </div>
            </div>
            <div className="pr_box">
              <span>Partner properties:</span>
              <ul>
                <li>
                  <Link
                    href="https://www.oneandonlyresorts.com/desaru-coast"
                    target="_blank">
                    <Image src={Onenonly}></Image>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.anantara.com/en/desaru-coast"
                    target="_blank">
                    <Image src={Anantara}></Image>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.marriott.com/en-us/hotels/jhbwi-the-westin-desaru-coast-resort/overview/"
                    target="_blank">
                    <Image src={TheWestin}></Image>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://hotel.hardrock.com/desaru-coast/"
                    target="_blank">
                    <Image src={Hardrock}></Image>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.elsclubmalaysia.com/" target="_blank">
                    <Image src={TheElsClub}></Image>
                  </Link>
                </li>
                <li>
                  <Link href="#" target="_blank">
                    <Image src={AdventureWaterpark}></Image>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
