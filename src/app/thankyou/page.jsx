'use client';
import { Suspense } from 'react';
import Image from 'next/image'; // pastikan mengimpor Image dari 'next/image'
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MainStage, TheWestin, Anantara, HardRock, OneNOnly, Riverside, Els, Nile1, Nile2, Nile3, Nile4, Nile5, Nile6, Grace1, Grace2, Grace3, Grace4, Grace5, Grace6, Macy1, Macy2, Macy3, Macy4, Macy5, Macy6, TheCardigans1, TheCardigans2, TheCardigans3, TheCardigans4, TheCardigans5, TheCardigans6, Joe1, Joe2, Joe3, Joe4, Joe5, Joe6, Aisyah1, Aisyah2, Aisyah3, Aisyah4, Aisyah5, Aisyah6, Masdo1, Masdo2, Masdo3, Masdo4, Masdo5, Masdo6, Bunga1, Bunga2, Bunga3, Bunga4, Bunga5, Bunga6, Alena1, Alena2, Alena3, Alena4, Alena5, Alena6, Alextbh1, Alextbh2, Alextbh3, Alextbh4, Alextbh5, Alextbh6, Marloes1, Marloes2, Marloes3, Marloes4, Marloes5, Marloes6, BornZebra1, BornZebra2, BornZebra3, BornZebra4, BornZebra5, BornZebra6, MeeraFiz1, MeeraFiz2, MeeraFiz3, MeeraFiz4, MeeraFiz5, MeeraFiz6, MainStage1, MainStage2, MainStage3, MainStage4, MainStage5, MainStage6, MainStage7, MainStage8, ThankyouCover, BTS1, BTS2, BTS3, BTS4, BTS5, BTS6, BTS7, BTS8, BTS9, BTS10, Sweet1, Sweet2, Sweet3, Sweet4, Sweet5, Sweet6, Matilde1, Matilde3, Matilde2, Matilde4, Matilde5, Matilde6, Zainal1, Zainal2, Zainal3, Zainal4, Zainal5, Zainal6, ZebraFiz1, ZebraFiz2, ZebraFiz3, ZebraFiz4, ZebraFiz5, ZebraFiz6, MerekaGarden1, MerekaGarden2, MerekaGarden3, MerekaGarden4, MerekaGarden5, MerekaGarden6, Adrian1, Adrian2, Adrian3, Adrian4, Adrian5, Adrian6, Story2, Story3, Story4, Story1, Story5, Story6, Puppet1, Puppet2, Puppet3, Puppet4, Puppet6, Puppet5, Disco1, Disco2, Disco3, Disco4, Disco5, Disco6, Wayang1, Wayang2, Wayang3, Wayang4, Wayang5, Wayang6, BBQ1, BBQ2, BBQ3, BBQ4, BBQ5, BBQ6, Percussion1, Percussion2, Percussion3, Percussion4, Percussion5, Percussion6, WestinMeeraFiz1, WestinMeeraFiz2, WestinMeeraFiz3, WestinMeeraFiz4, WestinMeeraFiz5, WestinMeeraFiz6, WVC1, WVC2, WVC3, WVC4, WVC5, WVC6, Sisters1, Sisters2, Sisters3, Sisters4, Sisters5, Sisters6, Santan1, Santan2, Santan3, Santan4, Santan5, Santan6, School1, School2, School3, School4, School5, School6, Kites1, Kites2, Kites3, Kites4, Kites5, Kites6, Debris1, Debris2, Debris3, Debris4, Debris5, Debris6, Kitchen1, Kitchen2, Kitchen3, Kitchen4, Kitchen5, Kitchen6, Flavour1, Flavour2, Flavour3, Flavour4, Flavour5, Flavour6, Salsa1, Salsa2, Salsa3, Salsa4, Salsa5, Salsa6, Tumbao1, Tumbao2, Paint1, Paint2, Paint3, Paint4, Paint5, Paint6, Supper1, Supper2, Supper3, Supper4, Supper5, Supper6, Qued1, Qued2, Qued3, Qued4, Qued5, Qued6, Nusantara1, Nusantara2, Nusantara3, Nusantara4, Nusantara5, Nusantara6, Beats1, Beats2, Beats3, Beats4, Beats5, Beats6, FBorneo1, FBorneo2, FBorneo3, FBorneo4, Brunch1, Brunch2, Brunch3, Brunch4, Brunch5, Brunch6, SoundBar1, SoundBar2, SoundBar3, SoundBar4, SoundBar5, SoundBar6, Qureshi1, Qureshi2, Qureshi3, Qureshi4, Qureshi5, Qureshi6, Segaris1, Segaris2, Segaris3, Segaris4, Segaris5, Segaris6, Fiction1, Fiction2, Fiction3, Fiction4, Fiction5, Fiction6, Dia1, Dia2, Dia3, Dia4, Dia5, Dia6, Batik1, Batik2, Batik3, Batik4, Batik5, Batik6, Market1, Market2, Market3, Market4, Market5, Market6, FBorneo5, FBorneo6, Tumbao3, Tumbao4, Tumbao5, Tumbao6 } from '../../../public';
import '../../styles/thankyou.scss';

function Thankyou() {
    const galleryData = {
        main_stage: [
            { category: 'music', title: 'Nile Rodgers & CHIC', photos: [Nile1, Nile2, Nile3, Nile4, Nile5, Nile6] },
            { category: 'music', title: 'Grace Jones', photos: [Grace1, Grace2, Grace3, Grace4, Grace5, Grace6] },
            { category: 'music', title: 'Macy Gray', photos: [Macy1, Macy2, Macy3, Macy4, Macy5, Macy6] },
            { category: 'music', title: 'The Cardigans', photos: [TheCardigans1, TheCardigans2, TheCardigans3, TheCardigans4, TheCardigans5, TheCardigans6] },
            { category: 'music', title: 'Joe Flizzow and SonaOne', photos: [Joe1, Joe2, Joe3, Joe4, Joe5, Joe6] },
            { category: 'music', title: 'Aisyah Aziz', photos: [Aisyah1, Aisyah2, Aisyah3, Aisyah4, Aisyah5, Aisyah6] },
            { category: 'music', title: 'Masdo', photos: [Masdo1, Masdo2, Masdo3, Masdo4, Masdo5, Masdo6] },
            { category: 'music', title: 'Bunga', photos: [Bunga1, Bunga2, Bunga3, Bunga4, Bunga5, Bunga6] },
            { category: 'music', title: 'Alena Murang', photos: [Alena1, Alena2, Alena3, Alena4, Alena5, Alena6] },
            { category: 'music', title: 'Alextbh', photos: [Alextbh1, Alextbh2, Alextbh3, Alextbh4, Alextbh5, Alextbh6] },
            { category: 'music', title: 'Thee Marloes', photos: [Marloes1, Marloes2, Marloes3, Marloes4, Marloes5, Marloes6] },
            { category: 'music', title: 'Born in a Taxi \'Zebras\'', photos: [BornZebra1, BornZebra2, BornZebra3, BornZebra4, BornZebra5, BornZebra6] },
            { category: 'music', title: '\'Meera & Fiz\' by Nice Monster', photos: [MeeraFiz1, MeeraFiz2, MeeraFiz3, MeeraFiz4, MeeraFiz5, MeeraFiz6] },
        ],
        hard_rock: [
            { category: 'music', title: 'Zainal Abidin', photos: [Zainal1, Zainal2, Zainal3, Zainal4, Zainal5, Zainal6] },
            { category: 'music', title: 'Sweet Nightmare', photos: [Sweet1, Sweet2, Sweet3, Sweet4, Sweet5, Sweet6] },
            { category: 'music', title: 'Matilde G', photos: [Matilde1, Matilde2, Matilde3, Matilde4, Matilde5, Matilde6] },
            { category: 'music', title: 'Born in a Taxi \'Zebras\' and \'Meera & Fiz\' by Nice Monster', photos: [ZebraFiz1, ZebraFiz2, ZebraFiz3, ZebraFiz4, ZebraFiz5, ZebraFiz6] },
            { category: 'ombak', title: 'Mereka Garden Games', photos: [MerekaGarden1, MerekaGarden2, MerekaGarden3, MerekaGarden4, MerekaGarden5, MerekaGarden6] },
            { category: 'music', title: 'Adrian G', photos: [Adrian1, Adrian2, Adrian3, Adrian4, Adrian5, Adrian6] },
            { category: 'ombak', title: 'Storytelling SG', photos: [Story1, Story2, Story3, Story4, Story5, Story6] },
            { category: 'ombak', title: 'Puppet-Making Workshop by Fusion Wayang Kulit', photos: [Puppet1, Puppet2, Puppet3, Puppet4, Puppet5, Puppet6] },
            { category: 'ombak', title: 'Silent Disco Asia', photos: [Disco1, Disco2, Disco3, Disco4, Disco5, Disco6] },
            { category: 'ombak', title: 'Star Wars-inspired Wayang Kulit by Fusion Wayang Kulit', photos: [Wayang1, Wayang2, Wayang3, Wayang4, Wayang5, Wayang6] },
        ],
        westin: [
            { category: 'food', title: 'Welcome BBQ at Beachfront by Carbon KL and Reka:Bar', photos: [BBQ1, BBQ2, BBQ3, BBQ4, BBQ5, BBQ6] },
            { category: 'music', title: 'Welcome Percussion Performance by JB Drums', photos: [Percussion1, Percussion2, Percussion3, Percussion4, Percussion5, Percussion6] },
            { category: 'music', title: '\'Meera & Fiz\' by Nice Monster', photos: [WestinMeeraFiz1, WestinMeeraFiz2, WestinMeeraFiz3, WestinMeeraFiz4, WestinMeeraFiz5, WestinMeeraFiz6] },
            { category: 'music', title: 'WVC Jazz', photos: [WVC1, WVC2, WVC3, WVC4, WVC5, WVC6] },
            { category: 'music', title: 'The Shang Sisters', photos: [Sisters1, Sisters2, Sisters3, Sisters4, Sisters5, Sisters6] },
            { category: 'music', title: 'Disko Santan', photos: [Santan1, Santan2, Santan3, Santan4, Santan5, Santan6] },
            { category: 'music', title: 'Public School', photos: [School1, School2, School3, School4, School5, School6] },
            { category: 'art', title: 'Go Fly Kites by Razi Said', photos: [Kites1, Kites2, Kites3, Kites4, Kites5, Kites6] },
            { category: 'art', title: 'Shore Debris Table by Ayer Ayer', photos: [Debris1, Debris2, Debris3, Debris4, Debris5, Debris6] },
            { category: 'food', title: 'Kitchen Takeover by Carbon KL', photos: [Kitchen1, Kitchen2, Kitchen3, Kitchen4, Kitchen5, Kitchen6] },
            { category: 'food', title: 'Latin Street Flavours by Feliz', photos: [Flavour1, Flavour2, Flavour3, Flavour4, Flavour5, Flavour6] },
            { category: 'music', title: 'Salsa Workshop by Güpson Pierre', photos: [Salsa1, Salsa2, Salsa3, Salsa4, Salsa5, Salsa6] },
            { category: 'music', title: 'Havana Jazz Tumbao', photos: [Tumbao1, Tumbao2, Tumbao3, Tumbao4, Tumbao5, Tumbao6] },
            { category: 'art', title: 'Beachfront Sip & Paint', photos: [Paint1, Paint2, Paint3, Paint4, Paint5, Paint6] },
        ],
        anantara: [
            { category: 'food', title: 'Ombak Supper Club with The Stars by Yellow Fin Horse', photos: [Supper1, Supper2, Supper3, Supper4, Supper5, Supper6] },
            { category: 'music', title: 'All Q’ued Up by Quantic', photos: [Qued1, Qued2, Qued3, Qued4, Qued5, Qued6] },
            { category: 'food', title: 'An Exploration of Nusantara Cuisine with Khir Johari & Chef Adu', photos: [Nusantara1, Nusantara2, Nusantara3, Nusantara4, Nusantara5, Nusantara6] },
            { category: 'food', title: 'Streets & Beats with Chef Adu and Kenji Law', photos: [Beats1, Beats2, Beats3, Beats4, Beats5, Beats6] },
            { category: 'food', title: 'Flavours of Borneo by Reka:Bar, Vér & Chocha Foodstore', photos: [FBorneo1, FBorneo2, FBorneo3, FBorneo4, FBorneo5, FBorneo6] },
        ],
        one_n_only: [
            { category: 'food', title: 'Ember Beach Club Brunch by Chef Andrew Walsh', photos: [Brunch1, Brunch2, Brunch3, Brunch4, Brunch5, Brunch6] },
            { category: 'music', title: 'Southeast Asian Sound Bar featuring Maft Sai and Mellow Goeslaw', photos: [SoundBar1, SoundBar2, SoundBar3, SoundBar4, SoundBar5, SoundBar6] },
        ],
        festival_village: [
            { category: 'art', title: 'Segaris Visual Arts Activations', photos: [Segaris1, Segaris2, Segaris3, Segaris4, Segaris5, Segaris6] },
            { category: 'food', title: 'Food Fiction by REXKL', photos: [Fiction1, Fiction2, Fiction3, Fiction4, Fiction5, Fiction6] },
            { category: 'art', title: 'Collection Curated by Dia Guild', photos: [Dia1, Dia2, Dia3, Dia4, Dia5, Dia6] },
            { category: 'art', title: 'Kapten Batik', photos: [Batik1, Batik2, Batik3, Batik4, Batik5, Batik6] },
            { category: 'art', title: 'Lokal Market', photos: [Market1, Market2, Market3, Market4, Market5, Market6] },
        ],
        els: [
            { category: 'food', title: 'House of Qureshi by Chef Ahsan Ali Qureshi', photos: [Qureshi1, Qureshi2, Qureshi3, Qureshi4, Qureshi5, Qureshi6] },
        ],
    };

    const places = [
        { name: 'Main Stage', slug: 'main_stage', image: MainStage },
        { name: 'Hard Rock', slug: 'hard_rock', image: HardRock },
        { name: 'The Westin', slug: 'westin', image: TheWestin },
        { name: 'Anantara', slug: 'anantara', image: Anantara },
        { name: 'One&Only', slug: 'one_n_only', image: OneNOnly },
        { name: 'Festival Village', slug: 'festival_village', image: Riverside },
        { name: 'Els', slug: 'els', image: Els },
    ];

    const router = useRouter();
    const searchParams = useSearchParams();
    const tag = searchParams.get('tag');
    const [currentPlace, setCurrentPlace] = useState('main_stage');
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        if (tag && places.some(place => place.slug === tag)) {
            setCurrentPlace(tag);
        }
    }, [tag]);

    const handleTabClick = (slug) => {
        if (typeof window !== "undefined") {
            setScrollPosition(window.scrollY);
            window.history.replaceState(null, '', `/thankyou?tag=${slug}`);
        }
        // Update state tempat saat ini untuk memperbarui galeri
        setCurrentPlace(slug);
    };

    useEffect(() => {
        // Kembali ke posisi scroll sebelumnya setiap kali currentPlace diperbarui
        if (typeof window !== "undefined") {
            window.scrollTo(0, scrollPosition);
        }
    }, [currentPlace, scrollPosition]);

    return (
        <div className="section_thankyou">
            <div className='sty_box'>
                <h1>Thank You For The Magic</h1>
                <p>Did you dance along to our Ombak Main Stage acts? Savour the amazing <br/>flavours by our rockstar chefs? Enjoy the gorgeous art installations by <br/>our talented sculptors and artists? Had so much family fun that you'll <br/>remember forever?</p>
                <p>Whatever your experience, relive your favourite moments at The Ultimate <br/>Weekend in our official Ombak Festival 2024 photo gallery.</p>
            </div>

            <div className='place_box'>
                <div className='container'>
                    {places.map((place) => (
                        <div className={`place ${place.slug} ${currentPlace === place.slug ? 'active' : ''}`}
                            key={place.slug}
                            onClick={() => handleTabClick(place.slug)}
                            style={{
                                cursor: 'pointer',
                                backgroundColor: currentPlace === place.slug ? '#FFFFFF' : '#06484E',
                            }}
                        >
                            <Image src={place.image} alt={place.name} width={100} height={100}></Image>
                        </div>
                    ))}
                </div>
            </div>

            <div className='gallery_box'>
                <div className="container">
                    {/* Menampilkan kategori dan foto berdasarkan tempat */}
                    {galleryData[currentPlace]?.map((categoryItem, index) => (
                        <div key={index} className='gb_ctr'>
                            <div className='row_flex'>
                                <div className={`gallery_title ${categoryItem.category}`}>
                                    <h2>{categoryItem.title}</h2>
                                </div>
                                <div className='gallery_image'>
                                    {categoryItem.photos.map((photo, idx) => (
                                        <div className='gi_box'>
                                            <Image src={photo} alt={categoryItem.title} key={idx} width={260} height={200} quality={100} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                    {currentPlace === 'main_stage' && (
                        <div className='ms_photo'>
                            <div className='msp_box'>
                                <Image src={MainStage1} alt='' width={260} height={200} quality={100} />
                            </div>
                            <div className='msp_box'>
                                <Image src={MainStage2} alt='' width={260} height={200} quality={100} />
                            </div>
                            <div className='msp_box'>
                                <Image src={MainStage3} alt='' width={260} height={200} quality={100} />
                            </div>
                            <div className='msp_box'>
                                <Image src={MainStage4} alt='' width={260} height={200} quality={100} />
                            </div>
                            <div className='msp_box'>
                                <Image src={MainStage5} alt='' width={260} height={200} quality={100} />
                            </div>
                            <div className='msp_box'>
                                <Image src={MainStage6} alt='' width={260} height={200} quality={100} />
                            </div>
                            <div className='msp_box'>
                                <Image src={MainStage7} alt='' width={260} height={200} quality={100} />
                            </div>
                            <div className='msp_box'>
                                <Image src={MainStage8} alt='' width={260} height={200} quality={100} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='thankyou_cover'>
                <Image src={ThankyouCover} alt='Thankyou' width={1366} height={720} quality={100} />
            </div>
            <div className="bts_wrapper">
                <h3>Behind the Scenes: <br/>The Elements that Brought Ombak to Life</h3>
                <div className="container">
                    <div className="bts_box">
                        <div className="big_image"><Image src={BTS1} alt='' width={550} height={434} /></div>
                        <div className='small_image'>
                            <div className='si_box'><Image src={BTS2} alt='' width={260} height={200} /></div>
                            <div className='si_box'><Image src={BTS3} alt='' width={260} height={200} /></div>
                            <div className='si_box'><Image src={BTS4} alt='' width={260} height={200} /></div>
                            <div className='si_box'><Image src={BTS5} alt='' width={260} height={200} /></div>
                        </div>
                    </div>
                    <div className="bts_box reverse">
                        <div className="big_image"><Image src={BTS8} alt='' width={550} height={434} /></div>
                        <div className='small_image'>
                            <div className='si_box'><Image src={BTS6} alt='' width={260} height={200} /></div>
                            <div className='si_box'><Image src={BTS7} alt='' width={260} height={200} /></div>
                            <div className='si_box'><Image src={BTS9} alt='' width={260} height={200} /></div>
                            <div className='si_box'><Image src={BTS10} alt='' width={260} height={200} /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default function stayWrapper() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Thankyou />
      </Suspense>
    );
  }
  
