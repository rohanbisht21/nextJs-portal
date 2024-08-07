'use client';

import localFont from "next/font/local";
import styles from "./salesId.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


const sfui_regular = localFont({
  src: "../../../../fonts/sfui/SFUIDisplay-Regular.woff2",
});

const SalesId = () => {
  const [bookingInfo, setBookingInfo] = useState();
  const [feedback, setFeedback] = useState({});
  const [errors, setErrors] = useState({});
  const [ticketInfo, setTicketInfo] = useState([]);

  const ticketId = "MzQ0MDI5fDYyNzIxN3xuaXRpbi5yYWh1amFAYXdmaXMuY29t?form_id=8";
  const baseUrl= "https://gmlaravel.awfis.com/api/v1/";
  const baseUrl2 = "https://gmlaravel.awfis.com/api/v1/get_booking_info/";

  useEffect(() => {
    const fetchTicketInfo = async () => {
      try {
        const response = await axios.get(`${baseUrl2}${ticketId}`, {});
        setTicketInfo(
          response?.data?.heads_info?.data?.map((item) => ({
            id: item?.id,
            name: item?.name,
            rating: null,
          }))
        );

        setBookingInfo({
          info:response?.data?.booking_info?.data[0],
          root_email:response?.data?.root_email,
          root_id:response?.data?.root_id,
        })
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    };
    fetchTicketInfo();
  }, []);


  const submitForm2 = async () => {
    try {
      const response1 = await axios.post(`${baseUrl}submit_booking_feedback`, {
        booking_id:bookingInfo?.info?.booking_id,
        data:JSON.stringify(ticketInfo),
        form_id:"9",
        root_email:bookingInfo?.root_email,
        root_id:"627235",
      });
      console.log("asdas", response1);
      if (response1.status === 200) {
        Swal.fire({
          title: "Successful",
          text: "Data saved Successfully",
          icon: "success"
        });
      }
   
    } catch (error) {
      console.error("Error fetching ticket data:", error);
      Swal.fire({
        title: "Unsuccessful",
        text: "Please try again",
        icon: "error"
       
      });
      
    }
   
  };



  const handleRadio = (ticketIndex, newRating) => {
    setTicketInfo((prevTicketInfo) => {
      const updatedTicketInfo = [...prevTicketInfo];
      updatedTicketInfo[ticketIndex] = {
        ...updatedTicketInfo[ticketIndex],
        rating: newRating,
      };
      return updatedTicketInfo;
    });

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[`ratings${ticketIndex + 1}`];
      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    ticketInfo.forEach((item, index) => {
      if (item.rating === null) {
        newErrors[`ratings${index + 1}`] = "* Please select.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      submitForm2();
    }
  };

  return (
    <section className={`${styles.whole} ${styles.left}`}>
      <div className={`${styles.container} ${sfui_regular.className}`}>
        <div
          className={`${styles.whole} ${styles.left} ${styles.bottomContainer} ${styles.feedbackForm}`}
        >
          <div className={`${styles.whole} ${styles.left} ${styles.pc}`}>
            <h3
              className={`${styles.feedbackTitle} ${styles.left} ${styles.fontTopic}`}
            >
              Please share your onboarding experience on the below parameters on
              a scale of 1 to 10 with 10 being the highest.
            </h3>

            <form onSubmit={handleSubmit}>
              <div className={`${styles.whole} ${styles.px}`}>
                {ticketInfo?.map((item, ticketIndex) => (
                  <div
                    key={item?.id}
                    className={`${styles.whole} ${styles.left} ${styles.feedback} ${styles.revel}`}
                  >
                    <div
                      className={`${styles.half} ${styles.left} ${styles.disc}`}
                    >
                      <span>{item?.name}</span>
                    </div>
                    <div className={`${styles.half} ${styles.left}`}>
                      <div className={`${styles.whole} ${styles.flexD}`}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                          <div
                            className={`${styles.radioBtn} ${styles.wx}`}
                            key={value}
                          >
                            <input
                              type="radio"
                              id={`radio-${item?.id}-${value}`}
                              name={`rating-${item?.id}`}
                              className={styles.inputStyle}
                              onClick={() => handleRadio(ticketIndex, value)}
                            />
                            <label
                              htmlFor={`radio-${item?.id}-${value}`}
                              className={`${styles.box} ${
                                styles.colFormLabel
                              } ${
                                item?.rating === value ? styles.selected : ""
                              }`}
                            >
                              {value}
                            </label>
                          </div>
                        ))}
                      </div>
                      {errors[`ratings${ticketIndex + 1}`] && (
                        <p className={styles.errorMessage}>
                          {errors[`ratings${ticketIndex + 1}`]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className={`${styles.whole} ${styles.left} ${styles.feedback} ${styles.revel}`}
              >
                <div
                  className={`${styles.textCenter} ${styles.disc} ${styles.left} ${styles.whole}`}
                >
                  <button
                    type="submit"
                    className={`${styles.mobiltyBtn} ${styles.btn}`}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesId;
