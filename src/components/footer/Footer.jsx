import Image from "next/image";
import {
  IconFacebook,
  IconInstagram,
  IconTiktok,
  IconTwitter,
  IconYoutube,
  LogoDRH,
  LogoDesaru,
  LogoOrange,
} from "@/assets";
import "@/styles/footer.scss";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer_left">
          <Image className="logo" src={LogoOrange}></Image>
          <div className="sosmed">
            <div className="sosmed_box">
              <Image src={IconFacebook} alt="Facebook Ombak"></Image>
            </div>
            <div className="sosmed_box">
              <Image src={IconInstagram} alt="Instagram Ombak"></Image>
            </div>
            <div className="sosmed_box">
              <Image src={IconYoutube} alt="Youtube Ombak"></Image>
            </div>
            <div className="sosmed_box">
              <Image src={IconTwitter} alt="Twitter Ombak"></Image>
            </div>
            <div className="sosmed_box">
              <Image src={IconTiktok} alt="Tiktok Ombak"></Image>
            </div>
          </div>
          <p>Copyright 2024 Ombak Festival</p>
        </div>
        <div className="footer_right">
          <div className="fr_box">
            <div className="fr_nav">Getting Here</div>
            <div className="fr_nav">Maps</div>
            <div className="fr_nav">Media Room</div>
            <div className="fr_nav">Partners</div>
          </div>
          <div className="fr_box">
            <div className="fr_nav">Contact Us</div>
            <div className="fr_nav">FAQs</div>
            <div className="fr_nav">Privacy Policy</div>
            <div className="fr_nav">Terms of Use</div>
          </div>
          <div className="fr_box">
            <span>Presented by:</span>
            <div className="presented_logo">
              <Image src={LogoDesaru} alt="Desaru"></Image>
              <Image src={LogoDRH} alt="DRH"></Image>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
