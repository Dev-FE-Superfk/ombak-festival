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
              <Link href="/stay">Stay</Link>
              <Link href="/infos">Infos</Link>
            </li>
          </ul>
        </nav>
        <div className="get_ticket_btn">Get Ticket</div>
      </div>
    </header>
  );
}
