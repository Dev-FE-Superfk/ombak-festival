"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../../../styles/resort.scss";

export default function Resort() {
  const router = useRouter();
  const { slug } = useParams(); // Mengakses slug dari router.query

  const [resorts, setResorts] = useState(null);
  const [listresorts, setListresorts] = useState(null);
  const [packages, setPackages] = useState(null);

  useEffect(() => {
    if (slug) {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/resorts?slug=${slug}`;
      console.log(apiUrl);
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const resorts = data.data.detail;
          const listresorts = data.data.resorts;
          const packages = data.data.detail.package;
          setResorts(resorts);
          setListresorts(listresorts);
          setPackages(packages);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  }, [slug]);

  if (!resorts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="section_resorts">
      <div className="container">
        <div className="nav_title">Stay</div>
        <div className="resorts_top">
          <h3>{resorts.title}</h3>
          <p>{resorts.subtitle}</p>
          <Image
            src={resorts.banner}
            alt={resorts.name}
            width={600}
            height={400}></Image>
        </div>
        <div className="resorts_middle">
          {listresorts.map((listresort) => (
            <Link
              className={`resorts_card ${listresort.is_active ? "active" : ""}`}
              key={listresort.slug}
              href={`/resort/${listresort.slug}`}>
              <div>
                <Image
                  src={listresort.logo}
                  alt={listresort.name}
                  width={200}
                  height={80}></Image>
              </div>
            </Link>
          ))}
        </div>
        <div className="resorts_bottom">
          <div className="rb_left">
            <div className="big_image">
              <Image src={resorts.image1} width={200} height={100}></Image>
            </div>
            <div className="small_image">
              <div className="si_box">
                <Image src={resorts.image2} width={200} height={100}></Image>
              </div>
              <div className="si_box">
                <Image src={resorts.image3} width={200} height={100}></Image>
              </div>
            </div>
          </div>
          <div className="rb_right">
            <div className="rbr_top">
              <h3>{resorts.name}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: resorts.description,
                }}></p>
            </div>
            <div className="rbr_bottom">
              {packages &&
                packages.map((pkg) => (
                  <div key={pkg.id}>
                    <h4>{pkg.name}</h4>
                    <p>{pkg.description}</p>
                    <div className="pkg_price">
                      <span>from</span>
                      {pkg.price}
                    </div>
                    <div className="button_box">
                      <button disabled>Buy Package</button>
                      <span>Coming Soon</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="faq_info">
        <h4>Have questions and want to know more?</h4>
        <button>Check Out FAQ</button>
      </div>
    </div>
  );
}
