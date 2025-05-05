'use client';
import {useSearchParams, useRouter} from 'next/navigation';
import {Suspense, useRef, useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../../styles/resort.scss';

function Stay() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tag = searchParams.get('tag'); // Mengakses query parameter 'tag'
  const hasPackageParam = searchParams.get('package') !== null;

  const [resorts, setResorts] = useState(null);
  const [listresorts, setListresorts] = useState(null);
  const [packages, setPackages] = useState(null);
  const pkgPriceRef = useRef(null);

  useEffect(() => {
    if (!tag) {
      router.replace('/stay?tag=hard_rock_hotel');
    }
  }, [tag, router]);

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

  useEffect(() => {
    if (
      resorts &&
      pkgPriceRef.current &&
      typeof window !== 'undefined' &&
      hasPackageParam
    ) {
      // Adding a slight delay to ensure all elements are rendered
      setTimeout(() => {
        const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as needed
        const topOffset =
          pkgPriceRef.current.getBoundingClientRect().top +
          window.pageYOffset -
          (isMobile ? 80 : 100);
        window.scrollTo({top: topOffset, behavior: 'smooth'});
      }, 500); // Adjust the delay as needed
    }
  }, [resorts, hasPackageParam]);

  if (!resorts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="section_resorts">
      <div className="container">
        <div className="nav_title">Stay</div>
        <div className="resorts_top">
          <h3>{resorts.title}</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: resorts.subtitle,
            }}
          ></p>
        </div>
        <div className="pb-[20px]">
          <Image
            src={resorts.banner}
            alt={resorts.name}
            className="banner-image"
            width={600}
            height={400}
          />
        </div>
        <div className="resorts_middle" ref={pkgPriceRef}>
          <div className="rm_box">
          {listresorts.map((resort, index) => {
            const isLast = index === listresorts.length - 1;
            const cardClass = `resorts_card ${resort.is_active ? 'active' : ''} ${isLast ? 'disabled' : ''}`;

            return (
              <Link
                key={resort.slug}
                href={isLast ? '#' : { pathname: '/stay', query: { tag: resort.tag } }}
                scroll={false}
                passHref
                className={cardClass}
              >
                <div>
                  <Image
                    src={resort.logo}
                    alt={resort.name}
                    width={200}
                    height={72}
                    title={isLast ? 'Hotel is unavailable' : resort.name}
                  />
                </div>
              </Link>
            );
          })}
          </div>
        </div>
        <div className="resorts_bottom">
          <div className="rb_right">
            <div className="rbr_top">
              <Link target="_blank" href={resorts.link}>
                <h3
                  dangerouslySetInnerHTML={{
                    __html: resorts.name,
                  }}
                ></h3>
              </Link>
              <p
                dangerouslySetInnerHTML={{
                  __html: resorts.description,
                }}
              ></p>
            </div>
            {packages.length !== 0 && (
              <div className="rbr_bottom">
                {packages.map((pkg) => (
                  <div key={pkg.id}>
                    <h4>{pkg.name}</h4>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: pkg.description,
                      }}
                    ></p>
                    <div className="pkg_price">
                      {tag !== 'one_and_only' && (
                        <>
                          Packages start from
                          <span>{pkg.price}</span>
                        </>
                      )}
                    </div>
                    <div className="button_box">
                      <Link
                        href={
                          tag == 'one_and_only'
                            ? `mailto:${pkg.link}`
                            : pkg.link
                        }
                        target="_blank"
                      >
                        <button disabled>{pkg.name_button}</button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="rb_left">
            <div className="big_image">
              <img src={resorts.image1} alt={resorts.name} />
              {/* <Image src={resorts.image1} width={200} height={100}></Image> */}
            </div>
            <div className="small_image">
              <div className="si_box">
                <img src={resorts.image2} alt={resorts.name} />
                {/* <Image src={resorts.image2} width={200} height={100}></Image> */}
              </div>
              <div className="si_box">
                <img src={resorts.image3} alt={resorts.name} />
                {/* <Image src={resorts.image3} width={200} height={100}></Image> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="faq_info">
        <h4>Have questions and want to know more?</h4>
        <button>
          <Link href="/info?tag=faq">Check Out FAQ</Link>
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
