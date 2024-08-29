'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import '../../styles/sustainability.scss';

export default function Partners() {
    const [listData, setListData] = useState([]);

    useEffect(() => {
        // Replace this URL with your actual API URL
        const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/sustainability";

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

    const toggleContent = (index) => {
        setListData((prevData) =>
            prevData.map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        isContentVisible: !item.isContentVisible,
                    };
                }
                return item;
            })
        );
    };

    if (!listData.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className="section_sustainability">
            <div className="container">
                <h5>Playing A Part</h5>
                <div className="sustainability_wrapper">
                    {listData.map((listdata, index) => {
                        // Check if the content includes "READ MORE"
                        const readMoreLink = '<a class="read_more_btn" href="#">Read More</a>';
                        const hasReadMore = listdata.content.includes(readMoreLink);

                        let contentBeforeReadMore = listdata.content;
                        let contentAfterReadMore = '';

                        if (hasReadMore) {
                            // Remove the "READ MORE" link and split the content
                            const [beforeReadMore, afterReadMore] = listdata.content.split(readMoreLink);
                            contentBeforeReadMore = beforeReadMore;
                            contentAfterReadMore = afterReadMore;
                        }

                        return (
                            <div className="sustainability_box" key={index}>
                                <div className='sb_info'>
                                    <h3>{listdata.title}</h3>
                                    <div>
                                        <div dangerouslySetInnerHTML={{ __html: contentBeforeReadMore }}></div>
                                        {hasReadMore && listdata.isContentVisible && (
                                            <div dangerouslySetInnerHTML={{ __html: contentAfterReadMore }}></div>
                                        )}
                                        {hasReadMore && (
                                            <p>
                                                <a href='javascript:void(0);' className='read_more_btn' onClick={(e) => { 
                                                    e.preventDefault();
                                                    toggleContent(index);
                                                }}>
                                                    {listdata.isContentVisible ? 'Read Less' : 'Read More'}
                                                </a>
                                            </p>
                                        )}
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
        </div>
    );
}
