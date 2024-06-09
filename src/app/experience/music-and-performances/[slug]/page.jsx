"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "../../../../styles/artistdetail.scss";
import Link from "next/link";
import Image from "next/image";
import { ArtistCard } from "@/components";

export default function ArtistDetail() {
  const router = useRouter();
  const { slug } = useParams(); // Mengakses slug dari router.query

  const [artistdetail, setArtistdetail] = useState(null);
  const [artists, setArtists] = useState(null);

  useEffect(() => {
    if (slug) {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/music-and-performances/detail?slug=${slug}`;

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const artistdetail = data.data.detail;
          const artists = data.data.more_artists;

          setArtistdetail(artistdetail);
          setArtists(artists);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  }, [slug]);

  if (!artistdetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="section_artist_detail">
      <div className="container">
        <div className="back_button">
          <Link href="/experience/music-and-performances">Back</Link>
        </div>
        <div className="artist_detail">
          <div className="detail_left">
            <h3 className="mobile">{artistdetail.name}</h3>
            <Image
              src={artistdetail.image}
              alt={artistdetail.name}
              width={500}
              height={500}></Image>
          </div>
          <div className="detail_right">
            <div className="dr_info">
              <h3 className="desktop">{artistdetail.name}</h3>
              <div
                className="artist_desc"
                dangerouslySetInnerHTML={{
                  __html: artistdetail.description,
                }}></div>
              <div className="sosial_media">
                {artistdetail.instagram && (
                  <div className="sm_box">
                    <Link
                      className="sm_instagram"
                      href={artistdetail.instagram}
                      target="_blank"
                      rel="noopener noreferrer">
                      Instagram
                    </Link>
                  </div>
                )}
                {artistdetail.tiktok && (
                  <div className="sm_box">
                    <Link
                      className="sm_tiktok"
                      href={artistdetail.tiktok}
                      target="_blank"
                      rel="noopener noreferrer">
                      Tiktok
                    </Link>
                  </div>
                )}
                {artistdetail.youtube && (
                  <div className="sm_box">
                    <Link
                      className="sm_tiktok"
                      href={artistdetail.youtube}
                      target="_blank"
                      rel="noopener noreferrer">
                      Youtube
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="discover_artist">
          <h2>Discover More Artistes</h2>
          <div className="content">
            {artists.map((artist, index) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                index={index}></ArtistCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
