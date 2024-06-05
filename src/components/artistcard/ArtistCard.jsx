"use client";
import { useRouter } from "next/navigation";

import "../../styles/artistcard.scss";

export default function ArtistCard({ artist }) {
  const router = useRouter();

  const handleExploreClick = () => {
    router.push(`/music-and-performances/${artist.slug}`);
  };
  return (
    <div className="artist_card">
      <div className="artist_image">
        <img src={artist.thumbnail} alt={artist.name} />
      </div>
      <div className="artist_info">
        <h3>{artist.name}</h3>
        <span>{artist.performance_date}</span>
        <div className="button" onClick={handleExploreClick}>
          Explore
        </div>
      </div>
    </div>
  );
}
