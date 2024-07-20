'use client';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import '../../../styles/experience.scss';
import {ArtistCard} from '@/components';

export default function Experience() {
  const [musicperformance, setMusicperformance] = useState({
    image: '',
    title: '',
    description: '',
  });
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    // Gantilah URL ini dengan URL API Anda
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/music-and-performances';

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-api-key': 'bda07dc4-cab9-4148-ac9c-7a44c3c55wqr9',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Asumsikan struktur data dari API sesuai dengan yang kita butuhkan
        const musicperformance = data.data.experience;
        const artists = data.data.artists;
        setMusicperformance({
          image: musicperformance.thumbnail,
          title: musicperformance.title,
          description: musicperformance.summary,
        });
        setArtists(artists);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div className='section_music_performance'>
      <div className='music_performance_banner'>
        <div className='mp_image'>
          <Image
            src={musicperformance.image}
            alt={musicperformance.title}
            width={600}
            height={100}
          ></Image>
        </div>
        <div className='mp_info'>
          <div className='mpi_box'>
            <span className='sub_title'>Experience</span>
            <h3 className='title'>{musicperformance.title}</h3>
            <p>{musicperformance.description}</p>
          </div>
        </div>
      </div>
      <div className='artist_list'>
        <div className='container'>
          {artists.map((artist, index) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              index={index}
            ></ArtistCard>
          ))}
          {/* <div className='amtc'>And more to come</div> */}
        </div>
      </div>
      <div className='more_experience'>
        <div className='container'>
          <h3>More experiences</h3>
          <div className='row_flex'>
            <Link className='me_box fnb' href='/experience/food-and-beverages'>
              <h4>F&amp;B</h4>
              <div className='button'>Explore</div>
            </Link>
            <Link className='me_box ombakkids' href='/experience/ombak-kids'>
              <h4>Ombak Kids</h4>
              <div className='button'>Explore</div>
            </Link>
            <Link
              className='me_box visualarts'
              href='/experience/visual-arts-and-craft'
            >
              <h4>
                Visual Arts <br />
                &amp; Craft
              </h4>
              <div className='button'>Explore</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
