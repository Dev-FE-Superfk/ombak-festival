'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import '../../styles/partners.scss';

export default function Partners(){
    const [partners, setPartners] = useState([]);

    useEffect(() => {
    // Replace this URL with your actual API URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/partner";

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
        // Assume the data structure from the API is as expected
        const partners = data.data;
        setPartners(partners);
        })
        .catch((error) => {
        console.error("Error fetching data: ", error);
        });
    }, []);

    if (!partners) {
    return <div>Loading...</div>;
    }
    
    return(
        <div className="section_partners">
            <div className="container">
                <div className="row_flex">
                    {partners.map((partner) => (
                    <div className="partners_box">
                        <div className="partner_image">
                            <Image src={partner.image} alt="" width={200} height={200}></Image>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}