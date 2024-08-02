"use client";

import localFont from "next/font/local";
import React, { useEffect, useState } from "react";
import styles from "./feedbackMeeting.module.css";
import axios from "axios";


const sfui_regular = localFont({
  src: "../../../fonts/sfui/SFUIDisplay-Regular.woff2",
});


const Content = () => {
  const [ratings, setRatings] = useState({});
  const [errors, setErrors] = useState({});
  const [bookingInfo, setBookingInfo] = useState(null);

  const ticketId =
    "MzkxNDUxfDExNzM0Mzl8aGFyc2hhZC5wcmFjaGFuZEB2ZXR0ZXJ0ZWMuY29t?form";
  const baseUrl = "https://pl.awfis.com/api/v1/get_booking_info/";
  useEffect(() => {
    const fetchBookingInfo = async () => {
      try {
        const response = await axios.get(`${baseUrl}${ticketId}`, {
          params: {
            form_id: 2,
          },
        });
        setBookingInfo(response?.data?.booking_info?.data?.[0]);
        console.log("asda", response);
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    };
    fetchBookingInfo();
  }, []);

  const handleRadio = (category, index) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [category]: index,
    }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[category];
      return newErrors;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newErrors = {};

    // Validate ratings
    if (!ratings["overallExperience"]) {
      newErrors["overallExperience"] = "Please select.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Submit form
    }
  };

  return (
    <div className={`${styles.container} container ${sfui_regular.className}`}>
      <div
        className={`${styles.whole} ${styles.left} ${styles.bottomContainer} ${styles.feedbackForm}`}
      >
        <div
          className={`${styles.whole} ${styles.left} ${styles.pLabel} ${styles.bgSky} ${styles.px}`}
        >
          <div className={`${styles.flexDdesk} ${styles.whole}`}>
            <div className={`${styles.flexD} ${styles.half}`}>
              <div className={`${styles.twoTenth} ${styles.left}`}>
                <label className={styles.label}>City</label>
              </div>
              <div
                className={`${styles.leedLabelM} ${styles.twoTenth} ${styles.textCenter}`}
              >
                <label className={styles.label}>-</label>
              </div>
              <div>
                <label className={styles.label}>{bookingInfo?.city_name}</label>
              </div>
            </div>
            <div className={`${styles.flexD} ${styles.half}`}>
              <div className={`${styles.twoTenth} ${styles.left}`}>
                <label className={styles.label}>Booking Id</label>
              </div>
              <div
                className={`${styles.leedLabelM} ${styles.twoTenth} ${styles.textCenter}`}
              >
                <label className={styles.label}>-</label>
              </div>
              <div>
                <label className={styles.label}>
                  {bookingInfo?.booking_id}
                </label>
              </div>
            </div>
          </div>
          <div className={`${styles.flexDdesk} ${styles.whole}`}>
            <div className={`${styles.flexD} ${styles.half}`}>
              <div className={`${styles.twoTenth} ${styles.left}`}>
                <label className={styles.label}>Center Name</label>
              </div>
              <div
                className={`${styles.leedLabelM} ${styles.twoTenth} ${styles.textCenter}`}
              >
                <label className={styles.label}>-</label>
              </div>
              <div>
                <label className={styles.label}>
                  {bookingInfo?.space_name}
                </label>
              </div>
            </div>
            <div className={`${styles.flexD} ${styles.half}`}>
              <div className={`${styles.twoTenth} ${styles.left}`}>
                <label className={styles.label}>No. of Seats</label>
              </div>
              <div
                className={`${styles.leedLabelM} ${styles.twoTenth} ${styles.textCenter}`}
              >
                <label className={styles.label}>-</label>
              </div>
              <div>
                <label className={styles.label}>{bookingInfo?.capacity}</label>
              </div>
            </div>
          </div>
          <div className={`${styles.flexDdesk} ${styles.whole}`}>
            <div className={`${styles.flexD} ${styles.half}`}>
              <div className={`${styles.twoTenth} ${styles.left}`}>
                <label className={styles.label}>Name</label>
              </div>
              <div
                className={`${styles.leedLabelM} ${styles.twoTenth} ${styles.textCenter}`}
              >
                <label className={styles.label}>-</label>
              </div>
              <div>
                <label className={styles.label}> {bookingInfo?.name}</label>
              </div>
            </div>
            <div className={`${styles.flexD} ${styles.half}`}>
              <div className={`${styles.twoTenth} ${styles.left}`}>
                <label className={styles.label}>Start - End Date</label>
              </div>
              <div
                className={`${styles.leedLabelM} ${styles.twoTenth} ${styles.textCenter}`}
              >
                <label className={styles.label}>-</label>
              </div>
              <div>
                <label className={styles.label}>
                  {bookingInfo?.valid_from} - {bookingInfo?.valid_upto}
                </label>
              </div>
            </div>
          </div>
          <div className={`${styles.flexDdesk} ${styles.whole}`}>
            <div className={`${styles.flexD} ${styles.half}`}>
              <div className={`${styles.twoTenth} ${styles.left}`}>
                <label className={styles.label}>Company Name</label>
              </div>
              <div
                className={`${styles.leedLabelM} ${styles.twoTenth} ${styles.textCenter}`}
              >
                <label className={styles.label}>-</label>
              </div>
              <div>
                <label className={styles.label}>
                  {bookingInfo?.company_name}
                </label>
              </div>
            </div>
            <div className={` ${styles.half}`}></div>
          </div>
        </div>

        <div className={`${styles.whole} ${styles.px}`}>
          <h3 className={`${styles.feedbackTitle} ${styles.left} ${styles.hx}`}>
            Please rate our services on the below parameters with 1 being the
            lowest and 10 being the highest.
          </h3>
        </div>

        <div onSubmit={handleSubmit}>
          <div
            className={`${styles.whole} ${styles.left} ${styles.feedback} ${styles.revel}`}
          >
            <div className={`${styles.half} ${styles.left} ${styles.disc}`}>
              <span>Overall Experience</span>
            </div>
            <div className={`${styles.half} ${styles.left}`}>
              <div className={`${styles.whole} ${styles.flexD}`}>
                {[...Array(10)].map((_, index) => (
                  <div key={index} className={styles.radioBtn}>
                    <input
                      type="radio"
                      id={`overallExperience-rating-${index + 1}`}
                      name="overallExperience-rating"
                      className={styles.radiohide}
                      checked={ratings["overallExperience"] === index + 1}
                      onChange={() =>
                        handleRadio("overallExperience", index + 1)
                      }
                    />
                    <label
                      htmlFor={`overallExperience-rating-${index + 1}`}
                      className={`${styles.box} ${
                        ratings["overallExperience"] === index + 1
                          ? styles.clicked
                          : ""
                      }`}
                      onClick={() =>
                        handleRadio("overallExperience", index + 1)
                      }
                    >
                      {index + 1}
                    </label>
                  </div>
                ))}
              </div>
              {errors["overallExperience"] && (
                <span className={styles.error}>
                  {errors["overallExperience"]}
                </span>
              )}
            </div>
          </div>

          <div
            className={`${styles.whole} ${styles.left} ${styles.feedback} ${styles.revel}`}
          >
            <div className={`${styles.half} ${styles.left} ${styles.disc}`}>
              <span>Remarks</span>
            </div>
            <div className={`${styles.half} ${styles.left} ${styles.flexD}`}>
              <div className={styles.radioBtn}>
                <textarea  
                  className={`${styles.whole} ${styles.textArea}`}
                  placeholder="Please mention your remarks here..."
                ></textarea>
              </div>
            </div>
          </div>

          <div
            className={`${styles.whole} ${styles.left} ${styles.feedback} ${styles.revel}`}
          >
            <div
              className={`${styles.whole} ${styles.textCenter} ${styles.left} ${styles.disc}`}
            >
              <button
                type="submit"
                className={`${styles.mobiltyBtn} ${styles.btn}`}
              >
                Submit
              </button>
            </div>
          </div>
          {/* Submit button */}
          {/* <div className={`${styles.whole} ${styles.left} ${styles.feedback} ${styles.revel}`}>
            <div className={`${styles.textCenter} ${styles.disc} ${styles.left} ${styles.whole}`}>
              <button type="submit" className={`${styles.mobiltyBtn} ${styles.btn}`}>Submit</button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Content;
