"use client";
import { useState, useEffect } from "react";
import parse from "html-react-parser";
import Image from "next/image";
import "../../styles/ombakkids.scss";

export default function OmbakKids() {
  const [masthead, setMasthead] = useState({
    thumbnail: "",
    title: "",
    description: "",
  });
  const [festival, setFestival] = useState();
  useEffect(() => {
    // Gantilah URL ini dengan URL API Anda
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/ombak-kids";
    console.log(apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Asumsikan struktur data dari API sesuai dengan yang kita butuhkan
        const masthead = data.data.detail;
        const festivalContent = data.data.detail.content;
        setMasthead({
          thumbnail: masthead.thumbnail,
          title: masthead.title,
          description: masthead.summary,
        });
        setFestival(festivalContent);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  let counter = 1; // Initialize the counter
  return (
    <div className="section_ombak_kids">
      <div className="ombak_kids_banner">
        <div className="ok_image">
          <Image
            src={masthead.thumbnail}
            alt={masthead.title}
            width={600}
            height={100}></Image>
        </div>
        <div className="ok_info">
          <div className="oki_box">
            <span className="sub_title">Experiences</span>
            <h3 className="title">{masthead.title}</h3>
            <p>{masthead.description}</p>
          </div>
        </div>
      </div>
      <div className="section_festival">
        <div className="container">
          {festival &&
            Object.entries(festival).map(([sectionId, sectionData]) => (
              <div key={sectionId} className="festival_section">
                {sectionData.contents &&
                  Object.entries(sectionData.contents).map(
                    ([contentId, contentData]) => (
                      <div key={contentId} className="festival_item">
                        {contentData.items && contentData.items.length > 0 && (
                          <div className="festival_item_content">
                            {contentData.v_page_element_alignment.startsWith(
                              "Left Text"
                            ) ? (
                              <div className="festival_box">
                                <div className="box_text">
                                  <h3>
                                    <span>
                                      {String(counter++).padStart(2, "0")}
                                    </span>
                                    {contentData.v_page_element_section}
                                  </h3>
                                  {contentData.items[0].v_page_element_text &&
                                  typeof contentData.items[0]
                                    .v_page_element_text === "string"
                                    ? parse(
                                        contentData.items[0].v_page_element_text
                                      )
                                    : null}
                                  {contentData.items[0]
                                    .v_page_element_button_label && (
                                    <button>
                                      {parse(
                                        contentData.items[0]
                                          .v_page_element_button_label
                                      )}
                                    </button>
                                  )}
                                </div>
                                <div className="box_image">
                                  <img
                                    src={
                                      contentData.items[0].v_page_element_image
                                    }
                                    alt={
                                      contentData.items[0]
                                        .v_page_element_image_title
                                    }
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="festival_box reverse">
                                <div className="box_text">
                                  <h3>
                                    <span>
                                      {String(counter++).padStart(2, "0")}
                                    </span>
                                    {contentData.v_page_element_section}
                                  </h3>
                                  {contentData.items[0].v_page_element_text &&
                                  typeof contentData.items[0]
                                    .v_page_element_text === "string"
                                    ? parse(
                                        contentData.items[0].v_page_element_text
                                      )
                                    : null}
                                  {contentData.items[0]
                                    .v_page_element_button_label && (
                                    <button>
                                      {parse(
                                        contentData.items[0]
                                          .v_page_element_button_label
                                      )}
                                    </button>
                                  )}
                                </div>
                                <div className="box_image">
                                  <img
                                    src={
                                      contentData.items[0].v_page_element_image
                                    }
                                    alt={
                                      contentData.items[0]
                                        .v_page_element_image_title
                                    }
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  )}
              </div>
            ))}
        </div>
      </div>
      <div className="more_experience">
        <div className="container">
          <h3>More Experiences</h3>
          <div className="row_flex">
            <div className="me_box">
              <h4>
                Culinary <br />
                &amp; Cuisine
              </h4>
              <div className="button">Explore</div>
            </div>
            <div className="me_box music_and_performance">
              <h4>
                Musik &amp; <br />
                Performances
              </h4>
              <div className="button">Explore</div>
            </div>
            <div className="me_box">
              <h4>
                Visual Arts <br />
                &amp; Craft
              </h4>
              <div className="button">Explore</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
