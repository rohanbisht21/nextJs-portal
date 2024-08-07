"use client";

import localFont from "next/font/local";
import React, { useEffect, useState } from "react";
import styles from "./feedbackMeeting.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";

const sfui_regular = localFont({
  src: "../../../fonts/sfui/SFUIDisplay-Regular.woff2",
});

const options1 = [
  {
    value: "Please select reason",
    label: "Please select reason",
    isDisabled: true,
  },
  {
    value: "Furniture Comfort & Ergonomics",
    label: "Furniture Comfort & Ergonomics",
  },
  {
    value: "Projection /Internet/VC Services",
    label: "Projection /Internet/VC Services",
  },
  { value: "Pantry & F&B Service", label: "Pantry & F&B Service" },
  { value: "Housekeeping", label: "Housekeeping" },
  { value: "Arrival Experience", label: "Arrival Experience" },
];

const Content = () => {
  const [errors, setErrors] = useState({});
  const [bookingInfo, setBookingInfo] = useState(null);
  const [formData, setFormData] = useState({
    experienceRating: null,
    experienceRemarks: "",
    feedbackOptions: [],
  });

  const ticketId =
    "get_booking_info/MzkxNDUxfDExNzM0Mzl8aGFyc2hhZC5wcmFjaGFuZEB2ZXR0ZXJ0ZWMuY29t?form_id=2";
  const baseUrl = "https://gmlaravel.awfis.com/api/v1/";

  useEffect(() => {
    const fetchBookingInfo = async () => {
      try {
        const response = await axios.get(`${baseUrl}${ticketId}`, {
          params: {
            form_id: 2,
          },
        });
        setBookingInfo(response?.data?.booking_info?.data?.[0]);
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    };
    fetchBookingInfo();
  }, []);

  const submitForm = async () => {
    const data = [
      { id: 9, name: "Overall Experience", rating: formData?.experienceRating },
      {
        id: 10,
        name: "Please help us understand what went wrong",
        reason: formData?.feedbackOptions,
      },
      { id: 11, name: "Remarks", remarks: formData?.experienceRemarks },
    ];

    console.log("sddsfdsfds",bookingInfo?.booking_id)

    try {
      const response = await axios.post(`${baseUrl}submit_booking_feedback`, {
        booking_id: bookingInfo?.booking_id,
        data: JSON.stringify(data),
        form_id: 2,
        root_id: "1173439",
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Successful",
          text: "Data saved Successfully",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      Swal.fire({
        title: "Unsuccessful",
        text: "Please try again",
        icon: "error",
      });
    }
  };

  const handleRadio = (index) => {
    setFormData({
      ...formData,
      experienceRating: index,
    });

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.experienceRating;
      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.experienceRating === null) {
      newErrors.experienceRating = "* Please select.";
    }
    if (formData.experienceRemarks === "") {
      newErrors.experienceRemarks = "* Please enter your remarks.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      submitForm();
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
                <label className={styles.label}>{bookingInfo?.name}</label>
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
            <div className={`${styles.half}`}></div>
          </div>
        </div>

        <div className={`${styles.whole} ${styles.px}`}>
          <h3 className={`${styles.feedbackTitle} ${styles.left} ${styles.hx}`}>
            Please rate our services on the below parameters with 1 being the
            lowest and 10 being the highest.
          </h3>
        </div>

        <div>
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
                      id={`radio-${index + 1}`}
                      name="rating"
                      className={styles.inputStyle}
                      checked={formData.experienceRating === index + 1}
                      onChange={() => handleRadio(index + 1)}
                    />
                    <label
                      htmlFor={`radio-${index + 1}`}
                      className={`${styles.box} ${
                        formData.experienceRating === index + 1
                          ? styles.clicked
                          : ""
                      }`}
                    >
                      {index + 1}
                    </label>
                  </div>
                ))}
              </div>
              {errors.experienceRating && (
                <p className={styles.errorMessage}>{errors.experienceRating}</p>
              )}
            </div>
          </div>

          {formData.experienceRating < 7 &&
            formData.experienceRating !== null && (
              <div
                className={`${styles.whole} ${styles.left} ${styles.feedback} ${styles.revel}`}
              >
                <div className={`${styles.half} ${styles.left} ${styles.disc}`}>
                  <span>Please help us understand what went wrong</span>
                  <br />
                </div>
                <div className={`${styles.half} ${styles.left}`}>
                  <Select
                    isMulti
                    name="feedbackOptions"
                    options={options1}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Select some options"
                    value={formData.feedbackOptions}
                    onChange={(selectedOptions) => {
                      setFormData({
                        ...formData,
                        feedbackOptions: selectedOptions,
                      });
                      setErrors((prevErrors) => {
                        const newErrors = { ...prevErrors };
                        delete newErrors.feedbackOptions;
                        return newErrors;
                      });
                    }}
                  />
                </div>
              </div>
            )}

          <div
            className={`${styles.whole} ${styles.left} ${styles.feedback} ${styles.revel}`}
          >
            <div className={`${styles.half} ${styles.left} ${styles.disc}`}>
              <span>Remarks</span>
            </div>
            <div className={`${styles.half} ${styles.left} ${styles.flexD}`}>
              <div className={styles.radioBtn1}>
                <textarea
                  className={`${styles.whole} ${styles.textArea}`}
                  placeholder="Please mention your remarks here..."
                  value={formData.experienceRemarks}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      experienceRemarks: e.target.value,
                    });
                    setErrors((prevErrors) => {
                      const newErrors = { ...prevErrors };
                      delete newErrors.experienceRemarks;
                      return newErrors;
                    });
                  }}
                ></textarea>
                {errors.experienceRemarks && (
                  <p className={styles.errorMessage}>
                    {errors.experienceRemarks}
                  </p>
                )}
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
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
