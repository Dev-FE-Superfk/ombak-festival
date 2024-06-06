"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "../../../styles/artistdetail.scss";
import Link from "next/link";
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
          <Link href="/music-and-performances">Back</Link>
        </div>
        <div className="artist_detail">
          <div className="detail_left">
            <div className="dl_top">
              <div className="dlt_left">
                <div className="dltl_top"></div>
                <div className="dltl_bottom">
                  <div className="content">
                    {artistdetail.performance_date}
                    <span>{artistdetail.performance_time}</span>
                  </div>
                </div>
              </div>
              <div className="dlt_right">
                <img src={artistdetail.photo_large} alt={artistdetail.name} />
              </div>
            </div>
            <div className="dl_bottom">
              <div className="dlb_left">
                <img src={artistdetail.photo_small} alt={artistdetail.name} />
              </div>
              <div className="dlb_right">
                <div className="dlbr_left">Main Stage</div>
                <div className="dlbr_right"></div>
              </div>
            </div>
          </div>
          <div className="detail_right">
            <div className="dr_info">
              <h3>{artistdetail.name}</h3>
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
              </div>
            </div>
          </div>
        </div>
        <div className="discover_artist">
          <h2>Discover More Artists</h2>
          <div className="content">
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist}></ArtistCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
