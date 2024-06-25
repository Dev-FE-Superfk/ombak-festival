'use client';
import { useEffect, useState } from 'react';
import '../../styles/mediaroom.scss';

export default function MediaRoom(){
    const [mediaData, setMediaData] = useState([]);

    useEffect(() => {
        // Replace this URL with your actual API URL
        const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/media-room";
    
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
            const mediaData = data.data.detail.description;
            setMediaData(mediaData);
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
      }, []);
    
      if (!mediaData) {
        return <div>Loading...</div>;
      }

    return(
        <div className="section_media_room">
            <div className="container">
                <h2>Media Room</h2>
                <div dangerouslySetInnerHTML={{__html: mediaData }}></div>
            </div>
        </div>
    )
}