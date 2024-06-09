"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../../styles/schedule.scss";

export default function Schedule() {
  const [schedules, setSchedules] = useState(null);

  useEffect(() => {
    // Replace this URL with your actual API URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/schedules";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Assume the data structure from the API is as expected
        setSchedules(data.data.schedules);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  if (!schedules) {
    return <div>Loading...</div>;
  }

  return (
    <div className="section_schedule">
      <div className="container">
        <div className="schedule_box">
          <h2>Schedule</h2>
          {schedules.map((schedule) => (
            <div key={schedule.id}>
              <Image
                src={schedule.image}
                alt="Schedule Image"
                width={600}
                height={400}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
