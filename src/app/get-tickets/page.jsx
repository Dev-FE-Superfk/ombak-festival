'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Modal } from '@/components';
import { Hardrock, TheWestin, Anantara, Onenonly, TicketMelon } from '@/assets';
import '../../styles/gettickets.scss';

export default function GetTickets() {
    const [generalAdmission, setGeneralAdmission] = useState(null);
    const [hotelPackages, setHotelPackages] = useState(null);
    const [addOn, setAddOn] = useState(null);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showSecondModal, setShowSecondModal] = useState(false);
    const [selectedResort, setSelectedResort] = useState(null);
    const [modalActionType, setModalActionType] = useState(null);

    const generalAdmissionRef = useRef(null);
    const hotelPackagesRef = useRef(null);
    const addonsRef = useRef(null);

    useEffect(() => {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/get-tickets`;

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
            const { general_admission, hotel_packages, addon } = data.data;

            setGeneralAdmission(general_admission);
            setHotelPackages(hotel_packages);
            setAddOn(addon);
        })
        .catch((error) => {
            console.error('Error fetching data: ', error);
            setError(error.message);
        });

        if (showModal || showSecondModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    
        // Cleanup function to reset overflow style when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
        
    }, [showModal || showSecondModal]);

    const scrollToSection = (ref, section) => {
        if (ref.current) {
            const element = ref.current;
            let offset = -50; // Default offset for desktop
    
            if (section === 'general') {
                if (window.innerWidth > 1129) {
                    offset = -110; // Offset for large screens
                } else if (window.innerWidth <= 1129 && window.innerWidth > 767) {
                    offset = -110; // Offset for medium screens
                } else if (window.innerWidth <= 767) {
                    offset = -140; // Offset for small screens
                }
            }
    
            const top = element.getBoundingClientRect().top + window.scrollY + offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        const generalAdmissionTop = generalAdmissionRef.current ? generalAdmissionRef.current.getBoundingClientRect().top + window.scrollY + 160 : null;
        const hotelPackagesTop = hotelPackagesRef.current ? hotelPackagesRef.current.getBoundingClientRect().top + window.scrollY + 160 : null;
        const addonsTop = addonsRef.current ? addonsRef.current.getBoundingClientRect().top + window.scrollY + 160 : null;

        const generalNav = document.querySelector('.sgt_nav_box.general');
        const hotelNav = document.querySelector('.sgt_nav_box.hotel');
        const addonNav = document.querySelector('.sgt_nav_box.addon');

        if (generalNav && hotelNav && addonNav) {
            if (scrollPosition >= generalAdmissionTop && scrollPosition < hotelPackagesTop) {
                generalNav.classList.add('active');
                hotelNav.classList.remove('active');
                addonNav.classList.remove('active');
            } else if (scrollPosition >= hotelPackagesTop && scrollPosition < addonsTop) {
                generalNav.classList.remove('active');
                hotelNav.classList.add('active');
                addonNav.classList.remove('active');
            } else if (scrollPosition >= addonsTop) {
                generalNav.classList.remove('active');
                hotelNav.classList.remove('active');
                addonNav.classList.add('active');
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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

    if (!generalAdmission || !hotelPackages || !addOn) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='section_get_ticktes'>
                <div className='sgt_top'>
                    <div className='container'>
                        <h3>Get Tickets</h3>
                    </div>
                </div>
                <div className='sgt_nav'>
                    <div className='container'>
                        <div className={`sgt_nav_box general active`} onClick={() => scrollToSection(generalAdmissionRef, 'general')}>General Admission</div>
                        <div className={`sgt_nav_box hotel`} onClick={() => scrollToSection(hotelPackagesRef)}>Hotel Packages</div>
                        <div className={`sgt_nav_box addon`} onClick={() => scrollToSection(addonsRef)}>Add-ons</div>
                    </div>
                </div>
                <div className='info_middle'>
                    <div className='container'>
                        {generalAdmission && (
                            <div className="general_admission" ref={generalAdmissionRef}>
                                <div className='title_box'>
                                    <h3>General Admission</h3>
                                </div>
                                <div className="ga_flex">
                                    {generalAdmission.map((generaladm, index) => (
                                        <div className="ga_box" key={index}>
                                            <h3>{generaladm.ticket_category} <span>({generaladm.ticket_date})</span></h3>
                                            <div dangerouslySetInnerHTML={{ __html: generaladm.description }}></div>
                                            <div className='ga_price'>
                                                <span>{generaladm.ticket_price}</span>
                                                <button onClick={() => openSecondModal('buy-pass')}>{generaladm.button_name}</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {hotelPackages && (
                            <div className="hotel_packages" ref={hotelPackagesRef}>
                                <div className="title_box">
                                    <h3>Hotel Packages</h3>
                                </div>
                                <div className="hp_box">
                                    {hotelPackages.map((hotelpack, index) => (
                                        <div className="hp_flex" key={index}>
                                            <div className="hp_image"><Image src={hotelpack.resort_image} width={525} height={350} quality={100} alt={hotelpack.resort_title} /></div>
                                            <div className="hp_info">
                                                <h4 dangerouslySetInnerHTML={{ __html: hotelpack.resort_title }}></h4>
                                                <div dangerouslySetInnerHTML={{ __html: hotelpack.resort_description }}></div>
                                                <div className='hp_price'>
                                                    {hotelpack.resort_price ? (
                                                        <>
                                                            <div className='price_text'>Packages start from <span>{hotelpack.resort_price}</span></div>
                                                            <button><Link href={hotelpack.resort_button_link} target='_blank' rel='noopener noreferrer'>{hotelpack.resort_button_name}</Link></button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button><Link href={`mailto:${hotelpack.resort_button_link}?subject=(Ombak Festival) Partnership Enquiries`} target='_blank' rel='noopener noreferrer'>{hotelpack.resort_button_name}</Link></button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {addOn && (
                            <div className="addons" ref={addonsRef}>
                                <div className="title_box">
                                    <h3>Add-ons</h3>
                                    Add-on purchases are only available for holders of <strong>Hotel Packages.</strong>
                                </div>
                                <div className="addon_row_flex">
                                    {addOn.map((addon, index) => (
                                        <div className={`addon_box ${addon.addon_experience_slug === 'ombak-kids' ? 'ombakkids' : '' || addon.addon_experience_slug === 'food-and-beverages' ? 'fnb' : '' || addon.addon_experience_slug === 'visual-arts-and-craft' ? 'visualarts' : '' || addon.addon_experience_slug === 'music-and-performances' ? 'music' : ''}`} key={index}>
                                            <div className="addon_info">
                                                <div className="ai_box">
                                                    <h4>{addon.addon_title}</h4>
                                                    {addon.addon_description && <p dangerouslySetInnerHTML={{__html : addon.addon_description}}></p>}
                                                    <span>{addon.addon_price}</span>
                                                </div>
                                                <button onClick={() => openModal('add-ons')}>Buy Add-On</button>
                                                <div className='view_btn'>{addon.addon_link_detail ? (<Link href={addon.addon_link_detail}>View Details</Link>) : (<span>&nbsp;</span>)}</div>
                                            </div>
                                            <div className="addon_image"><Image src={addon.addon_image} width={356} height={280} quality={100} alt={addon.addon_title} /></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showModal && (
                <>
                    <Modal isOpen={showModal} onClose={closeModal}>
                        <span className='info_text'>Before we continue...</span>
                        <h4>Which hotel guest are you <br />coming from?</h4>
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
                        <p>If you’re not from any of the hotel guest, you can’t proceed to purchase the add-on. Add-on purchases are only available for holders of <strong>Hotel Packages.</strong></p>
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
                        {modalActionType === 'add-ons' ?
                            (
                            <Link href="https://www.google.com/" target='_blank' rel='noopener noreferrer'>Proceed to Ticketmelon</Link>
                            )
                            :
                            (
                            <Link href="https://www.ticketmelon.com/ombakfestival/ombakfestival2024" target='_blank' rel='noopener noreferrer'>Proceed to Ticketmelon</Link>
                            )
                        }
                        </button>
                    </Modal>
                </>
            )}
        </>
    );
}
