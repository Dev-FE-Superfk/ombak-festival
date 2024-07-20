"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/schedule.scss";

export default function Schedule() {
  const [schedules, setSchedules] = useState(null);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    // Replace this URL with your actual API URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/schedules";

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
        // Assume the data structure from the API is as expected
        setSchedules(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  if (!schedules) {
    return <div>Loading...</div>;
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 5,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="section_schedule">
      <div className="schedule_top">
            <h2>Schedule</h2>
      </div>
      <div className="schedule_nav">
        <ul>
          {schedules.map((schedule, index) => (
            <li key={index} className={`tab ${activeTab === index ? 'active' : ''}`} onClick={() => setActiveTab(index)}>{schedule.date}</li>
          ))}
        </ul>
      </div>
      <div className="schedule_label">
        <div className="sl_box">
          <span className="addon_tag">Add-On</span>
          Add-ons ticket
        </div>
        <div className="sl_box">
          <span className="purple"></span>
          Music &amp; Performances
        </div>
        <div className="sl_box">
          <span className="yellow"></span>
          F&B
        </div>
        <div className="sl_box">
          <span className="green"></span>
          Visual Arts &amp; Craft
        </div>
        <div className="sl_box">
          <span className="blue"></span>
          Ombak Kids
        </div>
      </div>
      <div className="container">
      {schedules.map((schedule, index) => (
        <div key={index} style={{ display: activeTab === index ? 'block' : 'none' }}>
          <Slider {...settings}>
            {schedule.data.map((location, locIndex) => (
              <div key={locIndex}>
                <div className="schedule_image">
                  <Image src={location.location_image} alt={location.location_name} width={600} height={400} />
                </div>
                  {location.activities.map((activity, actIndex) => (
                    <div className="schedule_activity_box">
                      <div className={`${activity.experience_slug === 'f-and-b' ?'fnb' : '' || activity.experience_slug === 'ombak-kids' ? 'ombakkids' : '' || activity.experience_slug === 'visual-arts-and-craft' ? 'visualarts' : '' || activity.experience_slug === 'music-and-performances' ? 'music' : ''}`} key={actIndex}>
                        <h4>{activity.title}</h4>
                        <span>{activity.time}</span>
                      </div>
                      {activity.addon_tag === '1' && <div className="addon_tag">Add-On</div>}
                    </div>
                  ))}
              </div>
            ))}
        </Slider>
        </div>
      ))}
      </div>
    </div>
  );
}
