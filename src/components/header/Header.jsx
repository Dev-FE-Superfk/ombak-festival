'use client';
import '@/styles/header.scss';
import {useState, useEffect} from 'react';
import {useRouter, usePathname} from 'next/navigation';
import Image from 'next/image';
import {LogoWhite} from '@/assets';
import Link from 'next/link';

export default function Header() {
  const [isNavVisible, setNavVisible] = useState(false);
  const [isSubNavVisible, setSubNavVisible] = useState(false);
  const [showSubNav, setShowSubNav] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Function to determine if the current path matches a given path
  const isPathActive = (path) => pathname && pathname.startsWith(path);

  const toggleNav = () => {
    setNavVisible(!isNavVisible);
  };

  const toggleSubNav = () => {
    setSubNavVisible(!isSubNavVisible);
  };

  const hideNav = () => {
    setNavVisible(false);
    setSubNavVisible(false);
  };

  useEffect(() => {
    if (isNavVisible) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isNavVisible]);

  return (
    <header>
      <div className='container'>
        <h1 id='logo'>
          <Link href='/'>
            <Image src={LogoWhite} width={186} height={60} alt='Ombak Festival' priority />
          </Link>
        </h1>
        <div
          className={`nav_box ${isNavVisible ? 'active' : ''}`}
          // onMouseLeave={() => !showSubNav && setShowSubNav(true)}
        >
          <nav>
            <ul>
              <li>
                <div
                  className={`experience_btn ${
                    isPathActive('/experience') ? 'active' : ''
                  }`}
                >
                  <div
                    className='nav_title'
                    // onMouseMove={() => !showSubNav && setShowSubNav(true)}
                  >
                    Experience
                  </div>
                  <div
                    className='sub_nav'
                    // style={{
                    //   display: showSubNav ? 'block' : 'none',
                    // }}
                    // onMouseEnter={() => !showSubNav && setShowSubNav(true)}
                    // onMouseLeave={() => showSubNav && setShowSubNav(false)}
                  >
                    <div className='sn_container'>
                      <Link
                        className='sn_category music'
                        href='/experience/music-and-performances'
                        onClick={hideNav}
                      >
                        <h3>
                          Music &amp;
                          <br />
                          Performances
                        </h3>
                      </Link>
                      <Link
                        className='sn_category visualarts'
                        href='/experience/visual-arts-and-craft'
                        onClick={hideNav}
                      >
                        <h3>
                          Visual Arts <br />
                          &amp; Craft
                        </h3>
                      </Link>
                      <Link
                        className='sn_category fnb'
                        href='/experience/food-and-beverages'
                        onClick={hideNav}
                      >
                        <h3>F&amp;B</h3>
                      </Link>
                      <Link
                        className='sn_category ombakkids'
                        href='/experience/ombak-kids'
                        onClick={hideNav}
                      >
                        <h3>Ombak Kids</h3>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                {/* <p
                  className={`disabled ${
                    isPathActive('/schedule') ? 'active' : ''
                  } py-[20px] text-[#bbbcbc]`}
                >
                  Schedule
                </p> */}
                {/* Uncomment when is not use */}
                <Link
                  className={`${
                    isPathActive("/schedule") ? "active" : ""
                  }`}
                  href="/schedule"
                  onClick={hideNav}>
                  Schedule
                </Link>
              </li>
              <li>
                <Link
                  className={`${isPathActive('/stay') ? 'active' : ''}`}
                  href='/stay?tag=hard_rock_hotel'
                  onClick={hideNav}
                >
                  Stay
                </Link>
              </li>
              <li>
                <Link
                  className={`${isPathActive('/info') ? 'active' : ''}`}
                  href='/info?tag=general_info'
                  onClick={hideNav}
                >
                  Info
                </Link>
              </li>
              {/* <li>
                <Link
                  className={`golf ${isPathActive('/golf') ? 'active' : ''}`}
                  href='/golf'
                  onClick={hideNav}
                >
                  Golf
                </Link>
              </li> */}
            </ul>
          </nav>
          <div className='get_ticket_btn'>
            <Link href='/get-tickets' onClick={hideNav}>
              Get Tickets
            </Link>
          </div>
        </div>
        <div
          className={`burger_menu_btn ${isNavVisible ? 'active' : ''}`}
          onClick={toggleNav}
        ></div>
      </div>
    </header>
  );
}
