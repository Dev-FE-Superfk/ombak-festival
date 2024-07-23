'use client';
import {useParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import { Modal } from '@/components';
import '../../../../styles/artistdetail.scss';
import Link from 'next/link';
import Image from 'next/image';
import { Hardrock, TheWestin, Anantara, Onenonly, TicketMelon } from '@/assets';

export default function FnbDetail() {
  const {slug} = useParams();

  const [fnbDetail, setFnbDetail] = useState(null);
  const [fnbAddon, setFnbAddon] = useState(null);
  const [discover, setDiscover] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [selectedResort, setSelectedResort] = useState(null);
  const [modalActionType, setModalActionType] = useState(null);

  useEffect(() => {
    if (slug) {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/experience/f-and-b/${slug}`;

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
          const fnbDetail = data.detail;
          const fnbAddon = data.addon;
          const discover = data.discoverMore;
          setFnbDetail(fnbDetail);
          setFnbAddon(fnbAddon);
          setDiscover(discover);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
    }
  }, [slug]);

  if (!fnbDetail) {
    return <div>Loading...</div>;
  }
  const openModal = (actionType) => {
      setShowModal(true);
      setShowSecondModal(false); // Pastikan modal kedua tertutup saat membuka modal pertama
      setModalActionType(actionType); // Simpan jenis tindakan untuk digunakan di dalam modal
  };

  const closeModal = () => {
      setShowModal(false);
      setSelectedResort(null);
  };

  const handleRadioChange = (resortName) => {
      setSelectedResort(resortName);
  };

  const handleProceed = () => {
      setShowModal(false); // Close first modal after selecting
      setShowSecondModal(true); // Open second modal for purchase confirmation
  };

  const openSecondModal = (actionType) => {
      setShowModal(false);
      setShowSecondModal(true); // Pastikan modal kedua tertutup saat membuka modal pertama
      setModalActionType(actionType); // Simpan jenis tindakan untuk digunakan di dalam modal
  };

  const closeSecondModal = () => {
      setShowSecondModal(false); // Function to close second modal
      setSelectedResort(null);
  };
  return (
    <>
    <div className='section_artist_detail'>
      <div className='container'>
        <div className='back_button'>
          <Link href='/experience/food-and-beverages'>Back</Link>
        </div>
        <div className='artist_detail'>
          <div className='detail_left'>
            <h3 className='mobile'>{fnbDetail.title}</h3>
            <Image
              src={fnbDetail.image_top}
              alt={fnbDetail.title}
              width={500}
              height={500}
            ></Image>
          </div>
          <div className='detail_right'>
            <div className='dr_info'>
              <h3 className='desktop'>{fnbDetail.title}</h3>
              {fnbDetail.description.map((desc, index) => (
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
                                href={desc.socialmedia_yt}
                                target='_blank'
                                rel='noopener noreferrer'
                                >
                                Youtube
                                </Link>
                            </div>
                        )}
                        {desc.socialmedia_x && (
                            <div className='sm_box'>
                            <Link
                                className='sm_x'
                                href={desc.socialmedia_x}
                                target='_blank'
                                rel='noopener noreferrer'
                                >
                                X
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
              ))}
              {fnbAddon && (
                <div className='addon_box'>
                    <div className='addon_content'>
                      <h5>Interested to join? Buy the Exclusive Ticketed Events now!</h5>
                      <div className='addon_status fnb'>
                        <h4>{fnbAddon.addon_title}</h4>
                        <span>{fnbAddon.addon_price}</span>
                        <button onClick={openModal}>Buy Ticket</button>
                      </div>
                    </div>
                </div>
              )}
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
    {showModal && (
      <>
          <Modal isOpen={showModal} onClose={closeModal}>
              <h4>Where are you staying during <br/>Ombak Festival?</h4>
              <div className="row_flex">
                  <div className="resort_choose">
                      <input
                          type="radio"
                          name='resorts'
                          onChange={() => handleRadioChange('Hardrock')}
                          checked={selectedResort === 'Hardrock'}
                      />
                      <span></span>
                      <Image src={Hardrock} width={75} height={57} />
                  </div>
                  <div className="resort_choose">
                      <input
                          type="radio"
                          name='resorts'
                          onChange={() => handleRadioChange('TheWestin')}
                          checked={selectedResort === 'TheWestin'}
                      />
                      <span></span>
                      <Image src={TheWestin} width={118} height={45} />
                  </div>
                  <div className="resort_choose">
                      <input
                          type="radio"
                          name='resorts'
                          onChange={() => handleRadioChange('Anantara')}
                          checked={selectedResort === 'Anantara'}
                      />
                      <span></span>
                      <Image src={Anantara} width={88} height={53} />
                  </div>
                  <div className="resort_choose">
                      <input
                          type="radio"
                          name='resorts'
                          onChange={() => handleRadioChange('Onenonly')}
                          checked={selectedResort === 'Onenonly'}
                      />
                      <span></span>
                      <Image src={Onenonly} width={95} height={52} />
                  </div>
              </div>
              <button className='next_btn' disabled={!selectedResort} onClick={handleProceed}>Proceed</button>
              <p><strong>Exclusive Ticketed Events</strong> are only available to <strong>Stay Package</strong> ticket holders. You can book your Stay Package at any of our four 5-star resorts <Link href="/stay?tag=hard_rock_hotel">here.</Link></p>
          </Modal>
      </>
    )}
    {showSecondModal && ( 
      <>
          {/* Second modal for ticket purchase confirmation */}
          <Modal isOpen={showSecondModal} onClose={closeSecondModal}>
              <h4>You'll be redirected to our ticketing partner Ticketmelon to complete your purchase</h4>
              <Image className='ticketmelon' src={TicketMelon} width={170} height={30}></Image>
              <button className='next_btn'>
              <Link href="http://www.ticketmelon.com/event/ombakexclusives" target='_blank' rel='noopener noreferrer'>Proceed to Ticketmelon</Link>
              </button>
          </Modal>
      </>
    )}
    </>
  );
}
