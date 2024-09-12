'use client';
import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../../styles/info.scss';

function Info() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tag = searchParams.get('tag'); // Mengakses query parameter 'tag'

  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const [visibleItems, setVisibleItems] = useState({});
  const classes = ['wave1', 'wave2', 'wave3', 'wave4'];

  useEffect(() => {
    if (!tag) {
      router.replace('/info?tag=general_info');
    }
  }, [tag, router]);

  useEffect(() => {
    setVisibleItems({});
    if (tag) {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/info?tag=${tag}`;
      console.log(apiUrl);
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
          if (tag === 'general_info') {
            setDetails(data.data.detail);
            toggleVisibility(data.data.detail.id, true);
          } else {
            setDetails(data.data.detail || []);
            if (data.data.detail && data.data.detail.length > 0) {
              toggleVisibility(data.data.detail[0].id, true);
            }
          }
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
          setError(error.message);
        });
    }
  }, [tag]);

  const toggleVisibility = (id, val = true) => {
    setVisibleItems((prev) => ({
      ...prev,
      [id]: val,
    }));
  };

  useEffect(() => {
    console.log(visibleItems, 'test');
  }, [visibleItems]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className='section_info'>
      <div className='si_top'>
        <div className='container'>
          <h3>Festival Info</h3>
        </div>
      </div>
      <div className='si_nav'>
        <div className='container'>
          <div className={`si_nav_box ${tag === 'general_info' ? 'active' : ''}`}>
            <Link scroll={false} href='/info?tag=general_info'>
              General Info
            </Link>
          </div>
          <div className={`si_nav_box`}>
            <Link scroll={false} href='/festival-map?tag=overview'>
              Map
            </Link>
          </div>
          <div className={`si_nav_box ${tag === 'info' ? 'active' : ''}`}>
            <Link scroll={false} href='/info?tag=info'>
              Getting Here
            </Link>
          </div>
          <div className={`si_nav_box ${tag === 'faq' ? 'active' : ''}`}>
            <Link scroll={false} href='/info?tag=faq'>
              FAQs
            </Link>
          </div>
        </div>
      </div>
      <div className='info_middle'>
        <div className='container'>
          <div className='title_box'>
            {tag === 'general_info' ? (
              <>
                <h3 className='no_border'>General Info</h3>
              </>
            ) : tag === 'info' ? (
              <>
                <h3>Getting Here</h3>
              </>
            ) : tag === 'faq' ? (
              <>
                <h3>FAQs</h3>
              </>
            ) : null}
          </div>
          {tag === 'general_info' && details ? (
            <div className='general_info_content'>
              {details.content && Object.keys(details.content).map((sectionId) => {
                const section = details.content[sectionId];
                return (
                  <div key={sectionId} className='info_section'>
                    {section.contents && Object.keys(section.contents).map((contentId) => {
                      const content = section.contents[contentId];
                      return (
                        <div key={contentId} className='content_item'>
                          {content.items && content.items.map((item, index) => (
                            <div key={index} className={`item ${
                        classes[index % classes.length]
                      }`}>
                              <div className='item_image'>
                                <Image src={item.v_page_element_image} alt={item.v_page_element_image_title} width={300} height={300} quality={100}></Image>
                              </div>
                              <div className="item_info">
                                <h4>{item.v_page_element_image_title}</h4>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: item.v_page_element_text,
                                  }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                    <div className='faq_info'>
                      <h4>Have questions and want to know more?</h4>
                      <button>
                        <Link href='/info?tag=faq'>Check Out FAQ</Link>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : Array.isArray(details) ? (
            details.map((detail) => (
              <div className='info_box' key={detail.id}>
                <div
                  className='info_title'
                  onClick={() =>
                    toggleVisibility(detail.id, !visibleItems[detail.id])
                  }
                >
                  <h3>{detail.name}</h3>
                  <div
                    className={`toggle_btn ${
                      visibleItems[detail.id] ? 'active' : ''
                    }`}
                  ></div>
                </div>
                {visibleItems[detail.id] && (
                  <div>
                    {detail.detail ? (
                      detail.detail.map((item) => (
                        <div key={item.id} className='info_content'>
                          <div className='info_question'>
                            <h4>{item.question}</h4>
                          </div>
                          <div className='info_answer'>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.answer,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className='info_content'>
                        <div className='info_answer'>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: detail.description,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>Invalid details format</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function InfoWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Info />
    </Suspense>
  );
}
