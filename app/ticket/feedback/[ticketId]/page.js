"use client";
import localFont from "next/font/local";
import React, { useEffect, useState } from "react";
import styles from "./ticketId.module.css";
import axios from "axios";

const sfui_regular = localFont({
  src: "../../../../fonts/sfui/SFUIDisplay-Regular.woff2",
});

const Content = () => {
  const [ratings, setRatings] = useState({});
  const [errors, setErrors] = useState({});
  const [ticketInfo, setTicketInfo] = useState(null);

  const ticketId =
    "details?ticket_id=a0356d82c80d3093b4f78a0d85f03e91:124347bf86";
  const baseUrl = "https://gmlaravel.awfis.com/api/v1/ticket/";
  useEffect(() => {
    const fetchTicketInfo = async () => {
      try {
        const response = await axios.get(`${baseUrl}${ticketId}`, {});
        setTicketInfo(response?.data?.data);
        console.log("asda", response);
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    };
    fetchTicketInfo();
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
                <label className={`${sfui_regular.className} ${styles.my_label}`}>Ticket No.</label>
              </div>
              <div
                className={`${styles.leedLabelM} ${styles.twoTenth} ${styles.textCenter}`}
              >
                <label className={styles.label}>-</label>
              </div>
              <div>
                <label className={styles.label}>{ticketInfo?.ticket_id}</label>
              </div>
            </div>
            <div className={`${styles.flexD} ${styles.half}`}>
              <div className={`${styles.twoTenth} ${styles.left}`}>
                <label className={styles.label}>Space</label>
              </div>
              <div
                className={`${styles.leedLabelM} ${styles.twoTenth} ${styles.textCenter}`}
              >
                <label className={styles.label}>-</label>
              </div>
              <div>
                <label className={styles.label}>{ticketInfo?.space}</label>
              </div>
            </div>
          </div>
          <div className={`${styles.flexDdesk} ${styles.whole}`}>
            <div className={`${styles.flexD} ${styles.half}`}>
              <div className={`${styles.twoTenth} ${styles.left}`}>
                <label className={styles.label}>Created Date</label>
              </div>
              <div
                className={`${styles.leedLabelM} ${styles.twoTenth} ${styles.textCenter}`}
              >
                <label className={styles.label}>-</label>
              </div>
              <div>
                <label className={styles.label}>
                  {ticketInfo?.created_date}
                </label>
              </div>
            </div>
            <div className={`${styles.flexD} ${styles.half}`}>
              <div className={`${styles.twoTenth} ${styles.left}`}>
                <label className={styles.label}>Company</label>
              </div>
              <div
                className={`${styles.leedLabelM} ${styles.twoTenth} ${styles.textCenter}`}
              >
                <label className={styles.label}>-</label>
              </div>
              <div>
                <label className={styles.label}>{ticketInfo?.company}</label>
              </div>
            </div>
          </div>
          <div className={`${styles.flexDdesk} ${styles.whole}`}>
            <div className={`${styles.flexD} ${styles.half}`}>
              <div className={`${styles.twoTenth} ${styles.left}`}>
                <label className={styles.label}>Created By</label>
              </div>
              <div
                className={`${styles.leedLabelM} ${styles.twoTenth} ${styles.textCenter}`}
              >
                <label className={styles.label}>-</label>
              </div>
              <div>
                <label className={styles.label}>
                  {" "}
                  {ticketInfo?.created_by}
                </label>
              </div>
            </div>
            <div className={`${styles.flexD} ${styles.half}`}>
              <div className={`${styles.twoTenth} ${styles.left}`}>
                <label className={styles.label}>Impacted User</label>
              </div>
              <div
                className={`${styles.leedLabelM} ${styles.twoTenth} ${styles.textCenter}`}
              >
                <label className={styles.label}>-</label>
              </div>
              <div>
                <label className={styles.label}>{ticketInfo?.user}</label>
              </div>
            </div>
          </div>
          <div className={`${styles.flexDdesk} ${styles.whole}`}>
            <div className={`${styles.flexD} ${styles.half}`}>
              <div className={`${styles.twoTenth} ${styles.left}`}>
                <label className={styles.label}>Ticket Status</label>
              </div>
              <div
                className={`${styles.leedLabelM} ${styles.twoTenth} ${styles.textCenter}`}
              >
                <label className={styles.label}>-</label>
              </div>
              <div>
                <label className={styles.label}>
                  {ticketInfo?.ticket_status}
                </label>
              </div>
            </div>
            <div className={`${styles.flexD} ${styles.half}`}>
              <div className={`${styles.twoTenth} ${styles.left}`}>
                <label className={styles.label}>Category</label>
              </div>
              <div
                className={`${styles.leedLabelM} ${styles.twoTenth} ${styles.textCenter}`}
              >
                <label className={styles.label}>-</label>
              </div>
              <div>
                <label className={styles.label}>{ticketInfo?.category}</label>
              </div>
            </div>
          </div>

          <div className={`${styles.flexDdesk} ${styles.whole}`}>
            <div className={`${styles.flexD} ${styles.half}`}>
              <div className={`${styles.twoTenth} ${styles.left}`}>
                <label className={styles.label}>Sub Category</label>
              </div>
              <div
                className={`${styles.leedLabelM} ${styles.twoTenth} ${styles.textCenter}`}
              >
                <label className={styles.label}>-</label>
              </div>
              <div>
                <label className={styles.label}>
                  {" "}
                  {ticketInfo?.subcategory}
                </label>
              </div>
            </div>
            <div className={` ${styles.half}`}></div>
          </div>
        </div>

        <div className={`${styles.whole} ${styles.px}`}>
          <h3 className={`${styles.feedbackTitle} ${styles.left} ${styles.hx}`}>
            Please rate on the below parameters with 1 being the lowest and 10
            being the highest.
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
