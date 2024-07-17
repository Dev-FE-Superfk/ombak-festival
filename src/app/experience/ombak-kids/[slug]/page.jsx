'use client';
import {useParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import '../../../../styles/artistdetail.scss';
import Link from 'next/link';
import Image from 'next/image';

export default function ombakkidsDetail() {
  const {slug} = useParams();

  const [ombakkids, setOmbakkidsDetail] = useState(null);
  const [discover, setDiscover] = useState(null);

  useEffect(() => {
    if (slug) {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/experience/ombak-kids/${slug}`;

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
          const ombakkids = data.detail;
          const discover = data.discoverMore;
          setOmbakkidsDetail(ombakkids);
          setDiscover(discover);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
    }
  }, [slug]);

  if (!ombakkids) {
    return <div>Loading...</div>;
  }

  return (
    <div className='section_artist_detail'>
      <div className='container'>
        <div className='back_button'>
          <Link href='/experience/ombak-kids'>Back</Link>
        </div>
        <div className='artist_detail'>
          <div className='detail_left'>
            <h3 className='mobile'>{ombakkids.title}</h3>
            <Image
              src={ombakkids.image_top}
              alt={ombakkids.title}
              width={500}
              height={500}
            ></Image>
          </div>
          <div className='detail_right'>
            <div className='dr_info'>
              <h3 className='desktop'>{ombakkids.title}</h3>
              {ombakkids.description.map((desc, index) => (
                <div key={index} className='artist_desc'>
                    <div dangerouslySetInnerHTML={{ __html: desc.description,}}></div>
                    <div className='sosial_media'>
                        {desc.socialmedia_ig && (
                            <div className='sm_box'>
                            <Link
                                className='sm_instagram'
                                href={desc.socialmedia_ig}
                                target='_blank'
                                rel='noopener noreferrer'
                                >
                                Instagram
                                </Link>
                            </div>
                        )}
                        {desc.socialmedia_tk && (
                        <div className='sm_box'>
                            <Link
                            className='sm_tiktok'
                            href={desc.socialmedia_tk}
                            target='_blank'
                            rel='noopener noreferrer'
                            >
                            Tiktok
                            </Link>
                        </div>
                        )}
                        {desc.socialmedia_fb && (
                        <div className='sm_box'>
                            <Link
                            className='sm_facebook'
                            href={desc.socialmedia_fb}
                            target='_blank'
                            rel='noopener noreferrer'
                            >
                            Facebook
                            </Link>
                        </div>
                        )}
                        {desc.socialmedia_yt && (
                            <div className='sm_box'>
                            <Link
                                className='sm_youtube'
                                href={desc.socialmedia_ig}
                                target='_blank'
                                rel='noopener noreferrer'
                                >
                                Youtube
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='discover_artist'>
          <h2>Discover More</h2>
          <div className='content'>
            {discover.map((exp, index) => (
                <Link href={`/experience/food-and-beverages/${exp.slug}`} className='discover_box' key={index}>
                    <div className='discover_image'>
                        <Image width={400} height={400} src={exp.image}></Image>
                    </div>
                    <div className='discover_info'>
                        {exp.title}
                    </div>
                </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
