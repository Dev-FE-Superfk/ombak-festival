'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IconCall, IconMail, IconWhatsapp, LongWave, LongWaveMobile } from '@/assets';
import '../../styles/golf.scss';
import Link from 'next/link';

export default function Golf() {
    const [listData, setListData] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Replace this URL with your actual API URL
        const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/golf";

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'x-api-key': 'bda07dc4-cab9-4148-ac9c-7a44c3c55wqr9',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            const listData = data.data.map(item => ({
                ...item,
                isContentVisible: false, // Initialize visibility state
            }));
            setListData(listData);
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
        });
    }, []);


    useEffect(() => {
        const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
        
        checkIsMobile(); // Cek pertama kali saat komponen mount
        window.addEventListener('resize', checkIsMobile); // Update saat window diubah ukurannya

        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    if (!listData.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className="section_golf">
            <div className="container">
                <div className="golf_wrapper">
                    {listData.map((listdata, index) => {
                        return (
                            <div className="golf_box" key={index}>
                                <div className='sb_info'>
                                    <h3>{listdata.title}</h3>
                                    <div>
                                        <div dangerouslySetInnerHTML={{ __html: listdata.content }}></div>
                                    </div>
                                </div>
                                <div className="sb_image">
                                    <Image src={listdata.image_1} alt="" width={1130} height={400} quality={100}></Image>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="golf_info">
                <h3>Interested? Book now via</h3>
                <ul className='sosmed'>
                    <li><Link target='_blank' href="tel:+6078780000"><Image src={IconCall} alt='' width={40} height={40} /></Link></li>
                    <li><Link target='_blank' href="https://wa.me/60193232842"><Image src={IconWhatsapp} alt='' width={40} height={40} /></Link></li>
                    <li><Link target='_blank' href="mailto:reservations.ecdc@elsclubmalaysia.com"><Image src={IconMail} alt='' width={40} height={40} /></Link></li>
                </ul>
            </div>
            <div className="golf_book">
                <div className="container">
                    <h3>And if that is not enough, The Els Club is also having an 18-Hole Special promotion for both Ocean and Valley Courses from 9-15 September. </h3>
                    <Link target='_blank' href='https://www.elsclubmalaysia.com/book-tee-times-at-desaru-coast/'><button>Book Tee Times</button></Link>
                </div>
                <Image src={isMobile? LongWaveMobile : LongWave} alt='' width={1280} height={100} />
            </div>
        </div>
    );
}
