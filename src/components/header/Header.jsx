"use client";
import "@/styles/header.scss";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { LogoWhite } from "@/assets";
import Link from "next/link";

export default function Header() {
  const [isSubNavVisible, setSubNavVisible] = useState(false);
  const [isNavVisible, setNavVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Function to determine if the current path matches a given path
  const isPathActive = (path) => pathname && pathname.startsWith(path);

  const toggleSubNav = () => {
    setSubNavVisible(!isSubNavVisible);
  };

  const hideSubNav = () => {
    setSubNavVisible(false);
  };
  const toggleNav = () => {
    setNavVisible(!isNavVisible);
  };
  const hideNav = () => {
    setNavVisible(false);
  };
  return (
    <header>
      <div className="container">
        <h1 id="logo">
          <Link href="/">
            <Image src={LogoWhite} width={93} height={30}></Image>
          </Link>
        </h1>
        <div className={`nav_box ${isNavVisible ? "active" : ""}`}>
          <nav>
            <ul>
              <li>
                <div
                  className={`experience_btn ${
                    isPathActive("/experience") ? "active" : ""
                  }`}
                  onClick={toggleSubNav}>
                  Experience
                </div>
                {isSubNavVisible && (
                  <div className="sub_nav">
                    <div className="sn_container">
                      <Link
                        className="sn_category music"
                        href="/experience/music-and-performances"
                        onClick={() => {
                          hideSubNav();
                          hideNav();
                        }}>
                        <h3>
                          Music &amp;
                          <br />
                          Performances
                        </h3>
                      </Link>
                      <Link
                        className="sn_category visualarts"
                        href="/experience/visual-arts-and-craft"
                        onClick={() => {
                          hideSubNav();
                          hideNav();
                        }}>
                        <h3>
                          Visual Arts <br />
                          &amp; Craft
                        </h3>
                      </Link>
                      <Link
                        className="sn_category fnb"
                        href="/experience/food-and-beverages"
                        onClick={() => {
                          hideSubNav();
                          hideNav();
                        }}>
                        <h3>F&amp;B</h3>
                      </Link>
                      <Link
                        className="sn_category ombakkids"
                        href="/experience/ombak-kids"
                        onClick={() => {
                          hideSubNav();
                          hideNav();
                        }}>
                        <h3>Ombak Kids</h3>
                      </Link>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <Link
                  className={`${isPathActive("/schedule") ? "active" : ""}`}
                  href="/schedule"
                  onClick={() => {
                    hideSubNav();
                    hideNav();
                  }}>
                  Schedule
                </Link>
              </li>
              <li>
                <Link
                  className={`${isPathActive("/stay") ? "active" : ""}`}
                  href="/stay?tag=hard_rock_hotel"
                  onClick={() => {
                    hideSubNav();
                    hideNav();
                  }}>
                  Stay
                </Link>
              </li>
              <li>
                <Link
                  className={`${isPathActive("/info") ? "active" : ""}`}
                  href="/info?tag=info"
                  onClick={() => {
                    hideSubNav();
                    hideNav();
                  }}>
                  Info
                </Link>
              </li>
            </ul>
          </nav>
          <div className="get_ticket_btn">
            <Link href="/stay?tag=hard_rock_hotel">Get Ticket</Link>
          </div>
        </div>
        <div
          className={`burger_menu_btn ${isNavVisible ? "active" : ""}`}
          onClick={toggleNav}></div>
      </div>
    </header>
  );
}
