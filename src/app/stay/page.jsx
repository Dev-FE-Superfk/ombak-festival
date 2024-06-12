'use client';
import {Suspense} from 'react';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../../styles/resort.scss';

function Stay() {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag'); // Mengakses query parameter 'tag'

  const [resorts, setResorts] = useState(null);
  const [listresorts, setListresorts] = useState(null);
  const [packages, setPackages] = useState(null);

  useEffect(() => {
    if (tag) {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/stay?tag=${tag}`;
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
          const resorts = data.data.detail;
          const listresorts = data.data.resorts;
          const packages = data.data.detail.package;
          setResorts(resorts);
          setListresorts(listresorts);
          setPackages(packages);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
    }
  }, [tag]);

  if (!resorts) {
    return <div>Loading...</div>;
  }

  return (
    <div className='section_resorts'>
      <div className='container'>
        <div className='nav_title'>Stay</div>
        <div className='resorts_top'>
          <h3>{resorts.title}</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: resorts.subtitle,
            }}
          ></p>
          <Image
            src={resorts.banner}
            alt={resorts.name}
            width={600}
            height={400}
          ></Image>
        </div>
        <div className='resorts_middle'>
          <div className='rm_box'>
            {listresorts.map((resort) => (
              <Link
                className={`resorts_card ${resort.is_active ? 'active' : ''}`}
                key={resort.slug}
                href={{
                  pathname: '/stay',
                  query: {tag: resort.tag},
                }}
                scroll={false}
                passHref
              >
                <div>
                  <Image
                    src={resort.logo}
                    alt={resort.name}
                    width={200}
                    height={80}
                  ></Image>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className='resorts_bottom'>
          <div className='rb_right'>
            <div className='rbr_top'>
              <Link target='_blank' href={resorts.link}>
                <h3>{resorts.name}</h3>
              </Link>
              <p
                dangerouslySetInnerHTML={{
                  __html: resorts.description,
                }}
              ></p>
            </div>
            {packages.length !== 0 && (
              <div className='rbr_bottom'>
                {packages.map((pkg) => (
                  <div key={pkg.id}>
                    <h4>{pkg.name}</h4>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: pkg.description,
                      }}
                    ></p>
                    <div className='pkg_price'>
                      {tag !== 'one_and_only' && <span>From</span>}
                      {pkg.price}
                    </div>
                    <div className='button_box'>
                      <button>
                        <Link
                          href={
                            tag == 'one_and_only'
                              ? `mailto:${pkg.link}`
                              : pkg.link
                          }
                          target='_blank'
                        >
                          {pkg.name_button}
                        </Link>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='rb_left'>
            <div className='big_image'>
              <Image src={resorts.image1} width={200} height={100}></Image>
            </div>
            <div className='small_image'>
              <div className='si_box'>
                <Image src={resorts.image2} width={200} height={100}></Image>
              </div>
              <div className='si_box'>
                <Image src={resorts.image3} width={200} height={100}></Image>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='faq_info'>
        <h4>Have questions and want to know more?</h4>
        <button>
          <Link href='/info?tag=faq'>Check Out FAQ</Link>
        </button>
      </div>
    </div>
  );
}

export default function stayWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Stay />
    </Suspense>
  );
}
