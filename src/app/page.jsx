'use client';
import {VideoPlayer} from '@/components';
import {OmbakIntro2, OmbakOpening2} from '../../public/videos';
import '@/styles/ombakNewHomepage.scss';
import {useState, useEffect} from 'react';
import Image from 'next/image';
import {
  LeftAttribute,
  Ombak2025Logo,
  OmbakNewLogo,
  RightAttribute,
  UltimateWeekend,
} from '../../public';

export default function page() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home_ctr">
      {/* Video need use client to be played */}
      {!showContent && (
        <div className="video_intro_ctr">
          <VideoPlayer src={OmbakIntro2} type="video/mp4" loop={false} />
        </div>
      )}

      {showContent && (
        <div className="home_content_ctr">
          {/* Add your home content here */}
          <VideoPlayer src={OmbakOpening2} type="video/mp4" />
          <div className="main_content">
            <div className="inner_ctr">
              <div className="upper_ctr">
                <Image src={OmbakNewLogo} alt="ombak new logo" />
                <button className="vpy_button">View Past Year</button>
              </div>
              <Image
                src={LeftAttribute}
                alt="left attribute"
                className="left_attr"
              />
              <Image
                src={UltimateWeekend}
                alt="ultimate weekend"
                className="ult_weekend"
              />
              <Image
                src={Ombak2025Logo}
                alt="ombak 2025 logo"
                className="ombak_2025_logo"
              />
              <Image
                src={RightAttribute}
                alt="right attribute"
                className="right_attr"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
