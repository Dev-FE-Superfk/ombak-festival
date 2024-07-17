'use client';
import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../../styles/info.scss';
import '../../styles/maps.scss';
import { IconFnB, IconMedic, IconParking, IconWashroom } from '@/assets';

function Map() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tag = searchParams.get('tag'); // Mengakses query parameter 'tag'

    const [maps, setMaps] = useState(null);
    const [location, setLocation] = useState(null);
    const [activeModal, setActiveModal] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');
    const modalRef = useRef(null);

    
    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/map";
    
        fetch(apiUrl, {
        method: "GET",
        headers: {
            "x-api-key": "bda07dc4-cab9-4148-ac9c-7a44c3c55wqr9",
            "Content-Type": "application/json",
        },
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            const maps = data.data
            const mapWidth = maps.map_width;
            const mapHeight = maps.map_height;

            const locationData = maps.map_locations.map(location => ({...location,
                position_x: (location.position_x / mapWidth) * 100 + '%',
                position_y: (location.position_y / mapHeight) * 100 + '%'
            }));

            setMaps(maps);
            setLocation(locationData);
            console.log(locationData);
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
        });
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setActiveModal(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalRef]);
    
    if (!maps) {
        return <div>Loading...</div>;
    }
    const handlePinClick = (index) => {
        setActiveModal(index);
    };

    const handleFilterClick = (category) => {
        setActiveFilter(category);
    };

    const filteredLocations = activeFilter === 'All' ? location : location.filter(loc => loc.category === activeFilter || loc.category === 'Venue');

    return (
        <div className='section_info'>
            <div className='si_top'>
                <div className='container'>
                <h3>Festival Info</h3>
                </div>
            </div>
            <div className='si_nav'>
                <div className='container'>
                    <div className="si_nav_box">
                        <Link scroll={false} href='/info?tag=general_info'>
                        General Info
                        </Link>
                    </div>
                    <div className="si_nav_box active">
                        <Link scroll={false} href='/festival-map'>
                        Map
                        </Link>
                    </div>
                    <div className="si_nav_box">
                        <Link scroll={false} href='/info?tag=info'>
                        Getting Here
                        </Link>
                    </div>
                    <div className="si_nav_box">
                        <Link scroll={false} href='/info?tag=faq'>
                        FAQs
                        </Link>
                    </div>
                </div>
            </div>
            <div className='info_middle'>
                <div className='container'>
                    <div className='title_box'>
                        <h3 className='no_border'>Map</h3>
                    </div>
                    <div className='filter_map'>
                        <div className={`fm_box ${activeFilter === 'All' ? 'active' : ''}`} onClick={() => handleFilterClick('All')}>All</div>
                        <div className={`fm_box ${activeFilter === 'F&B' ? 'active' : ''}`} onClick={() => handleFilterClick('F&B')}><Image src={IconFnB} width={34} height={34} quality={100}></Image>F&B</div>
                        <div className={`fm_box ${activeFilter === 'Parking' ? 'active' : ''}`} onClick={() => handleFilterClick('Parking')}><Image src={IconParking} width={34} height={34} quality={100}></Image>Parking</div>
                        <div className={`fm_box ${activeFilter === 'Washroom' ? 'active' : ''}`} onClick={() => handleFilterClick('Washroom')}><Image src={IconWashroom} width={34} height={34} quality={100}></Image>Washroom</div>
                        <div className={`fm_box ${activeFilter === 'Medic' ? 'active' : ''}`} onClick={() => handleFilterClick('Medic')}><Image src={IconMedic} width={34} height={34} quality={100}></Image>Medic</div>
                    </div>
                </div>
            </div>
            <div className='map_image'>
                <Image className='map_img' src={maps.map_image} width={maps.map_width} height={maps.map_height} quality={100}></Image>
                <ul>
                    {filteredLocations.map((maploc, index) => (
                        <li key={index}>
                            <div className={maploc.category} style={{left:maploc.position_x, top:maploc.position_y, position:'absolute'}}>
                                <div className={`pin_image ${maploc.category === 'Venue' ? 'venue' : ''}`} onClick={() => handlePinClick(index)}>
                                    <Image src={maploc.logo ? maploc.logo : maploc.category_image} width={100} height={100}></Image>
                                </div>
                                {activeModal === index && (
                                    <div ref={modalRef} className={`pin_modal ${maploc.category === 'Venue' ? 'venue_modal' : '' || maploc.category === 'Parking' ? 'parking_modal' : '' || maploc.category === 'Washroom' ? 'washroom_modal' : '' || maploc.category === 'F&B' ? 'fandb_modal' : '' || maploc.category === 'Medic' ? 'medic_modal' : '' }`}>
                                    {maploc.category === 'Venue' && maploc.image_detail && <Image src={maploc.image_detail} width={100} height={100}></Image>}
                                    <h4>{maploc.title}</h4>
                                    {maploc.description && <p>{maploc.description}</p>}
                                    {maploc.category === 'Parking' && maploc.image_detail && <div className='img_detail'><Image src={maploc.image_detail} width={100} height={100}></Image></div>}
                                    {maploc.category === 'F&B' && maploc.image_detail && <div className='img_detail'><Image src={maploc.image_detail} width={100} height={100}></Image></div>}
                                </div>
                                )}
                                
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default function InfoWrapper() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Map />
      </Suspense>
    );
  }
  