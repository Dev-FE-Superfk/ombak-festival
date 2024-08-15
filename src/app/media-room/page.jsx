'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../../styles/mediaroom.scss';

export default function MediaRoom() {
    const [mediaData, setMediaData] = useState([]);
    const [followUs, setFollowUs] = useState([]);
    const [limit, setLimit] = useState(9); // Default limit
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true); // Initial loading
    const [loadingMore, setLoadingMore] = useState(false); // Track loading more state

    // Detect screen size and set initial limit
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 767) { // Adjust this breakpoint as needed
                setLimit(5); // Initial limit for mobile
            } else {
                setLimit(9); // Initial limit for desktop
            }
        };

        // Call on component mount
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/media-room";

        fetch(apiUrl, {
            method: 'POST',
            headers: {
              'x-api-key': 'bda07dc4-cab9-4148-ac9c-7a44c3c55wqr9',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "limit": limit,
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            const newMediaData = data.data.articles;
            const totalCount = data.data.total_articles;
            const followUs = data.data.social_media
            setMediaData(newMediaData);
            setFollowUs(followUs);
            setTotalCount(totalCount); // Update total count based on API response
            setLoading(false); // Set loading to false after initial data is fetched
            setLoadingMore(false); // Hide loading more message if applicable
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
            setLoading(false); // Also set loading to false on error to prevent blocking
            setLoadingMore(false); // Hide loading more message if applicable
        });
    }, [limit]);

    const loadMore = () => {
        if (loadingMore) return; // Prevent multiple clicks

        setLoadingMore(true); // Show loading more message
        setLimit((prevLimit) => {
            const newLimit = prevLimit + (window.innerWidth <= 768 ? 5 : 9); // Increment based on screen size
            return newLimit > totalCount ? totalCount : newLimit; // Cap limit at totalCount
        });
    };

    return (
        <div className="section_media_room">
            <div className="container">
                <h2>Media Room</h2>
                <div className="smr_top">
                  <div className="smrt_box">
                    <h3>Media Inquiries</h3>
                    <p>For media enquiries and interview requests, please email <a href='mailto:dc@accela.asia'>dc@accela.asia</a></p>
                  </div>
                  <div className="smrt_box">
                    <h3>Media Accreditation</h3>
                    <p>To apply for media accreditation, kindly fill up the application form <a href='https://www.figma.com/exit?url=https%3A%2F%2Fforms.gle%2FqPtnSbs8E9yknHwt6' target='_blank'>here</a>, and our communications team will review and respond.</p>
                  </div>
                </div>
                <div className="smr_mid">
                  <h3>Press Coverage</h3>
                  <div className="smrm_wrapper">
                    {mediaData.map((mediadata, index) => (
                      <div className="smrm_box" key={index}>
                        <div className="smrm_image"><Image src={mediadata.image_article} width={400} height={200} alt='' /></div>
                        <div className="smrm_info">
                          <span>{mediadata.date_article}</span>
                          <h4>{mediadata.title_article}</h4>
                        </div>
                        <div className='smrm_media'><Image src={mediadata.image_media} width={150} height={150} alt='' /></div>
                      </div>
                    ))}
                  </div>
                  {loading && !loadingMore && (
                    <div className="loading_message">Loading...</div>
                  )}
                  {!loading && (
                    <div className="button_wrapper">
                      <div className="text_count">
                        <span>{Math.min(limit, totalCount)}</span> of {totalCount}
                      </div>
                      {limit < totalCount && (
                        <button onClick={loadMore}>Load More</button>
                      )}
                    </div>
                  )}
                </div>
            </div>
            <div className="follow_us">
              <div className="container">
                <h3>Follow us on <span>Social Media</span></h3>
                <div className="fu_wrapper">
                  {followUs.map((followus, index) => (
                    <div className="fu_box">
                      <h4>{followus.title}</h4>
                      <ul>
                        {followus.facebook && <li className='facebook_btn'><Link target='_blank' rel='noopener noreferrer' href={followus.facebook}>Facebook</Link></li>}
                        {followus.instagram && <li className='instagram_btn'><Link target='_blank' rel='noopener noreferrer' href={followus.instagram}>Instagram</Link></li>}
                        {followus.youtube && <li className='youtube_btn'><Link target='_blank' rel='noopener noreferrer' href={followus.youtube}>Youtube</Link></li>}
                        {followus.tiktok && <li className='tiktok_btn'><Link target='_blank' rel='noopener noreferrer' href={followus.tiktok}>Tiktok</Link></li>}
                        {followus.twitter && <li className='x_btn'><Link target='_blank' rel='noopener noreferrer' href={followus.twitter}>X</Link></li>}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </div>
    )
}
