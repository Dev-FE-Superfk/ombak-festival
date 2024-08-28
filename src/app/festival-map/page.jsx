'use client';
import { Suspense, useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import '../../styles/info.scss';
import '../../styles/maps.scss';
import { IconArt, IconFnB, IconMedic, IconParking, IconToilet, IconWashroom } from '@/assets';

function Map() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const slug = searchParams.get('tag'); // Mengakses query parameter 'tag'

    const [maps, setMaps] = useState(null);
    const [location, setLocation] = useState(null);
    const [categories, setCategories] = useState([]);
    const [activeModal, setActiveModal] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');
    const [isFilterMapVisible, setIsFilterMapVisible] = useState(false);
    const [filterBtnContent, setFilterBtnContent] = useState('All');
    const [activeCategory, setActiveCategory] = useState('');
    const [activeLegend, setActiveLegend] = useState(''); // State untuk menyimpan legend yang aktif

    const modalRef = useRef(null);
    const mapImageRef = useRef(null);
    const filterRef = useRef(null);

    useEffect(() => {
    if (!slug) {
        router.replace('/festival-map?tag=overview');
    }
    }, [slug, router]);

    //CEK PERTAMA KALI KETIKA PAGE DI LOAD
    useEffect(() => {
        if (slug) {
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/map?slug=${slug}`;
    
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    "x-api-key": "bda07dc4-cab9-4148-ac9c-7a44c3c55wqr9",
                    "Content-Type": "application/json",
                },
            })
            .then(response => response.json())
            .then(data => {
                const maps = data.data;
                const categories = data.categories;
                const mapWidth = maps.map_width;
                const mapHeight = maps.map_height;
    
                const isScreenSmall = window.innerWidth < 1366;
    
                const locationData = maps.map_locations.map(location => ({
                    ...location,
                    position_x: `${(location.position_x / mapWidth) * 100}%`,
                    position_y: `${(location.position_y / mapHeight) * 100}%`,
                    defWidth: isScreenSmall 
                        ? `${location.pin_point_image_width / 2}px` 
                        : `${(location.pin_point_image_width / mapWidth) * 100}vw`,
                    defHeight: isScreenSmall 
                        ? `${location.pin_point_image_height / 2}px` 
                        : `${(location.pin_point_image_height / mapWidth) * 100}vw`,
                }));
    
                setMaps(maps);
                setLocation(locationData);
                setCategories(categories);
    
                let scrollPositionX = 0;
    
                if (mapImageRef.current) {
                    if (slug === 'overview') {
                        scrollPositionX = isScreenSmall ? mapImageRef.current.scrollWidth * 0.12 : mapImageRef.current.scrollWidth * 0.12;
                    } else if (window.innerWidth < 768) {
                        switch (maps.map_name) {
                            case 'Main Stage':
                                scrollPositionX = mapImageRef.current.scrollWidth * 0.48;
                                break;
                            case 'Hard Rock':
                                scrollPositionX = mapImageRef.current.scrollWidth * 0.3;
                                break;
                            // Add other cases as needed
                            default:
                                scrollPositionX = mapImageRef.current.scrollWidth * 0.12;
                                break;
                        }
                    } else {
                        switch (maps.map_name) {
                            case 'Main Stage':
                                scrollPositionX = mapImageRef.current.scrollWidth * 0.35;
                                break;
                            case 'Hard Rock':
                                scrollPositionX = mapImageRef.current.scrollWidth * 0.15;
                                break;
                            // Add other cases as needed
                            default:
                                scrollPositionX = mapImageRef.current.scrollWidth * 0.12;
                                break;
                        }
                    }
    
                    mapImageRef.current.scrollLeft = scrollPositionX;
                }
            })
            .catch(error => console.error("Error fetching data: ", error));
        }
    }, [slug]);

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

    useEffect(() => {
        if (!slug || slug === 'overview') {
            setActiveCategory('overview');
        } else {
            setActiveCategory(slug);
        }
    }, [slug]);

    if (!maps) {
        return <div>Loading...</div>;
    }

    const handlePinClick = (index) => {
        setActiveModal(index);
    };

    const handleLegendClick = () => {
        setActiveLegend(!activeLegend); // Set legend yang aktif
    };

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
                    <div className={`filter_map ${isFilterMapVisible ? 'active' : ''}`} ref={filterRef}>
                        {categories.map((category) => (
                            <Link href={{pathname: '/festival-map',query: {tag: category.slug},}}scroll={false} passHref key={category.slug} className={`fm_box ${category.slug} ${category.name} ${activeCategory === category.slug ? 'active' : ''} ${filterBtnContent === category.name ? 'active' : ''}`}>
                                <Image src={category.icon} width={80} height={80} quality={100} alt={category.name} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className={`container legend_wrapper ${maps.map_name.replace(/\s+/g, '')}`}>
                <div className={`legend_box ${activeLegend ? 'active' : ''}`} onClick={handleLegendClick}>
                    <h3>Legend</h3>
                    <div className="row_flex">
                        <div className="legend music">
                            Music &amp; Performances
                        </div>
                        <div className="legend ombak-kids">
                            Ombak Kids
                        </div>
                        <div className="legend visual-arts">
                            Visual Arts &amp; Craft
                        </div>
                        <div className="legend fnb">
                            F&amp;B
                        </div>
                        <div className="legend parking">
                            Parking
                        </div>
                    </div>
                </div>
            </div>
            <div className={`map_image ${maps.map_name.replace(/\s+/g, '')}`} ref={mapImageRef}>
                <Image className='map_img' src={maps.map_image} width={maps.map_width} height={maps.map_height} quality={100} alt={maps.map_name} />
                <ul className='pin_point_box'>
                    {location && location.map((maploc, index) => (
                        <li key={index}>
                            <div className={maploc.category} style={{left: maploc.position_x, top: maploc.position_y, position:'absolute'}}>
                            {maploc.link ? (
                                <Link href={maploc.link}>
                                    <div className={`pin_image ${maploc.title.replace(/\s+/g, '')}`} style={{width:maploc.defWidth, height:maploc.defHeight, top:'-'+maploc.defHeight }}>
                                        <Image src={maploc.pin_point_image} width={100} height={100} alt={maploc.title} />
                                    </div>
                                </Link>
                        ) : (
                            <div className={`pin_image ${maploc.title.replace(/\s+/g, '')}`} style={{width:maploc.defWidth, height:maploc.defHeight, top:'-'+maploc.defHeight }} onClick={() => handlePinClick(index)}>
                                <Image src={maploc.pin_point_image} width={100} height={100} alt={maploc.title} />
                            </div>
                        )}
                        {activeModal === index && (
                            <div ref={modalRef} className={`pin_modal ${maploc.category_slug} ${maploc.title_slug}`}>
                                {maploc.category_slug === 'overview' && maploc.pin_point_image && <div className='pp_image'><Image src={maploc.pin_point_image} width={100} height={100} /></div>}
                                {maploc.image_detail && <Image style={{marginBottom: '10px'}} src={maploc.image_detail} width={100} height={100} />}
                                <h4>{maploc.title}</h4>
                                {maploc.description && <div dangerouslySetInnerHTML={{ __html: maploc.description }}></div>}
                                {maploc.category_slug === 'parking' && <div className='parking_image'></div>}
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
