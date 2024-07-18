'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../../styles/gettickets.scss';

export default function GetTickets() {
    const [generalAdmission, setGeneralAdmission] = useState(null);
    const [hotelPackages, setHotelPackages] = useState(null);
    const [addOn, setAddOn] = useState(null);
    const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/get-tickets`;
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
        const generalAdmission = data.data.general_admission;
        const hotelPackages = data.data.hotel_packages;
        const addOn = data.data.addon;

        setGeneralAdmission(generalAdmission);
        setHotelPackages(hotelPackages);
        setAddOn(addOn);
    })
    .catch((error) => {
        console.error('Error fetching data: ', error);
        setError(error.message);
    });
  }, []);

  if (!generalAdmission || !hotelPackages || !addOn) {
    return <div>Loading...</div>;
  }

  return (
    <div className='section_get_ticktes'>
      <div className='sgt_top'>
        <div className='container'>
          <h3>Get Tickets</h3>
        </div>
      </div>
      <div className='sgt_nav'>
        <div className='container'>
        <div className={`sgt_nav_box active`}>General Admission</div>
        <div className={`sgt_nav_box`}>Hotel Packages</div>
        <div className={`sgt_nav_box`}>General Admission</div>
        </div>
      </div>
      <div className='info_middle'>
        <div className='container'>
            <div className="general_admission">
                <div className='title_box'>
                    <h3>General Admission</h3>
                </div>
                <div className="ga_flex">
                    {generalAdmission.map((generaladm, index) => (
                        <div className="ga_box" key={index}>
                            <h3>{generaladm.ticket_category}</h3>
                            <div dangerouslySetInnerHTML={{ __html: generaladm.description }}></div>
                            <div className='ga_price'>
                                <span>{generaladm.ticket_price}</span>
                                <button><Link href={generaladm.button_link} target='_blank' rel="noopener noreferrer">{generaladm.button_name}</Link></button>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
             <div className="hotel_packages">
                <div className="title_box">
                    <h3>Hotel Packages</h3>
                </div>
                <div className="hp_box">
                    {hotelPackages.map((hotelpack, index) => (
                        <div className="hp_flex" key={index}>
                            <div className="hp_image"><Image src={hotelpack.resort_image} width={525} height={350} quality={100} alt={hotelpack.resort_title}></Image></div>
                            <div className="hp_info">
                                <h4 dangerouslySetInnerHTML={{ __html: hotelpack.resort_title}}></h4>
                                <div dangerouslySetInnerHTML={{ __html: hotelpack.resort_description}}></div>
                                <div className='hp_price'>
                                    {hotelpack.resort_price ? (
                                    <>
                                        <div className='price_text'>Packages start from <span>{hotelpack.resort_price}</span></div>
                                        <button><Link href={hotelpack.resort_button_link} target='_blank' rel='noopener noreferrer'>{hotelpack.resort_button_name}</Link></button>
                                    </>
                                    )
                                    : (
                                    <>
                                        <button><Link href={`mailto:${hotelpack.resort_button_link}?subject=(Ombak Festival) Partnership Enquiries`} target='_blank' rel='noopener noreferrer'>{hotelpack.resort_button_name}</Link></button>
                                    </>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
             <div className="addons">
                <div className="title_box">
                    <h3>Add-ons</h3>
                    Add-on purchases are only available for holders of <strong>Hotel Packages.</strong>
                </div>
                <div className="addon_row_flex">
                    {addOn.map((addon, index) => (
                        <div className={`addon_box ${addon.addon_experience_slug === 'ombak-kids' ? 'ombakkids' : '' || addon.addon_experience_slug === 'f-and-b' ? 'fnb' : '' || activity.experience_slug === 'visual-arts-and-craft' ? 'visualarts' : '' || activity.experience_slug === 'music-and-performances' ? 'music' : ''}`} key={index}>
                            <div className="addon_info">
                                <div className="ai_box">
                                    <h4>{addon.addon_title}</h4>
                                    <span>{addon.addon_price}</span>
                                </div>
                                <button><Link href="#">Buy Add-On</Link></button>
                                <div className='view_btn'><Link href={addon.addon_link_detail}>View Details</Link></div>
                            </div>
                            <div className="addon_image"><Image src={addon.addon_image} width={356} height={280} quality={100} alt={addon.addon_title}></Image></div>
                         </div>
                    ))}
                </div>
             </div>
        </div>
      </div>
    </div>
  );
}

