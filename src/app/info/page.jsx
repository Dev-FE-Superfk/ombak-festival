"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import "../../styles/info.scss";

function Info() {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag"); // Mengakses query parameter 'tag'

  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const [visibleItems, setVisibleItems] = useState({});

  useEffect(() => {
    setVisibleItems({})
    if (tag) {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/info?tag=${tag}`;
      console.log(apiUrl);
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
          setDetails(data.data.detail);
          
          toggleVisibility(data.data.detail[0].id, true)
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          setError(error.message);
        });
    }
  }, [tag]);

  const toggleVisibility = (id, val = true) => {
    setVisibleItems((prev) => ({
      ...prev,
      [id]: val,
    }));
  };

  useEffect(() => {
    console.log(visibleItems, 'test')
  }, [visibleItems])
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!details) {
    return <div>Loading...</div>;
  }


  return (
    <div className="section_info">
      <div className="si_top">
        <div className="container">
          <h3>Festival Info</h3>
        </div>
      </div>
      <div className="si_nav">
        <div className="container">
          <div className={`si_nav_box ${tag === "info" ? "active" : ""}`}>
            <Link scroll={false} href="/info?tag=info">Getting Here</Link>
          </div>
          <div className={`si_nav_box ${tag === "faq" ? "active" : ""}`}>
            <Link scroll={false} href="/info?tag=faq">FAQs</Link>
          </div>
        </div>
      </div>
      <div className="info_middle">
        <div className="container">
          <div className="title_box">
            {tag === "info" ? (
              <>
                <h3>Getting Here</h3>
              </>
            ) : tag === "faq" ? (
              <>
                <h3>FAQs</h3>
              </>
            ) : null}
          </div>
          {details.map((detail, index) => (
            <div className="info_box">
              <div className="info_title">
                <h3>{detail.name}</h3>
                <div
                  className={`toggle_btn ${
                    visibleItems[detail.id] ? "active" : ""
                  }`}
                  onClick={() => toggleVisibility(detail.id, !visibleItems[detail.id])}></div>
              </div>
              {visibleItems[detail.id] && (
                <div>
                  {detail.detail ? (
                    detail.detail.map((item) => (
                      <div key={item.id} className="info_content">
                        <div className="info_question">
                          <h4>{item.question}</h4>
                        </div>
                        <div className="info_answer">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.answer,
                            }}></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="info_content">
                      <div className="info_answer">
                        <div
                              dangerouslySetInnerHTML={{
                                __html: detail.description,
                              }}>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function infoWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Info />
    </Suspense>
  );
}
