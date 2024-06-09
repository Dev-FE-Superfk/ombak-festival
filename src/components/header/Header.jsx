import "@/styles/header.scss";
import Image from "next/image";
import { LogoWhite } from "@/assets";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="container">
        <h1 id="logo">
          <Link href="/">
            <Image src={LogoWhite} width={93} height={30}></Image>
          </Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link href="/experience">Experience</Link>
              <Link href="/schedule">Schedule</Link>
              <Link href="/stay?tag=hard_rock_hotel">Stay</Link>
              <Link href="/info?tag=info">Infos</Link>
            </li>
          </ul>
        </nav>
        <div className="get_ticket_btn">Get Ticket</div>
        <div className="burger_menu_btn"></div>
      </div>
    </header>
  );
}
