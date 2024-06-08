"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import "../../styles/info.scss";

export default function Info() {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag"); // Mengakses query parameter 'tag'

  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (tag) {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/info?tag=${tag}`;
      console.log(apiUrl);
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setDetails(data.data.detail);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          setError(error.message);
        });
    }
  }, [tag]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="section_info">
      <div className="container">
        <div className="info_middle">
          {details.map((detail) => (
            <Link
              className="resorts_card"
              key={detail.id}
              href={{
                pathname: "/info",
                query: { tag: detail.name.toLowerCase() },
              }}
              passHref>
              <div>
                <h3>{detail.name}</h3>
                {detail.detail ? (
                  detail.detail.map((item) => (
                    <div key={item.id}>
                      <h4>{item.question}</h4>
                      <p>{item.answer}</p>
                    </div>
                  ))
                ) : (
                  <p>{detail.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
