"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../../styles/artistcard.scss";

export default function ArtistCard({ artist, index }) {
  const classes = ["mask1", "mask2", "mask3", "mask4"];

  const router = useRouter();

  const handleExploreClick = () => {
    router.push(`/experience/music-and-performances/${artist.slug}`);
  };
  return (
    <Link
      className="artist_card"
      href={`/experience/music-and-performances/${artist.slug}`}>
      <div className={`artist_image ${classes[index % classes.length]}`}>
        <img src={artist.thumbnail} alt={artist.name} />
      </div>
      <div className="artist_info">
        <h3>{artist.name}</h3>
        <span dangerouslySetInnerHTML={{ __html: artist.performance_date }}></span>
        <div className="button" onClick={handleExploreClick}>
          Explore
        </div>
      </div>
    </Link>
  );
}
