"use client";
import localFont from "next/font/local";
import React, { useEffect, useState } from "react";
import styles from "./ticketId.module.css";
import axios from "axios";
import { usePathname } from "next/navigation";
import Swal from "sweetalert2";


const sfui_regular = localFont({
  src: "../../../../fonts/sfui/SFUIDisplay-Regular.woff2",
});

const Content = () => {
  const pathName = usePathname();

  console.log("rsrtr", pathName?.split("/")[pathName?.split("/")?.length - 1]);

  const [errors, setErrors] = useState({});

  const [ticketInfo, setTicketInfo] = useState();
  const [formData, setFormData] = useState({
    experienceRating: null,
    experienceRemarks: "",
  });
  const ticketId =
    "details?ticket_id=a0356d82c80d3093b4f78a0d85f03e91:124347bf86";
  const baseUrl = "https://gmlaravel.awfis.com/api/v1/ticket/";
  const baseUrl2 = "https://gmlaravel.awfis.com/api/v1/";
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

  const submitForm2 = async () => {
    try {
      const response1 = await axios.post(`${baseUrl2}send/tickect/feedback`, {
        ticket_id: pathName?.split("/")[pathName?.split("/")?.length - 1],
        rating: formData.experienceRating,
        remarks: formData.experienceRemarks,
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

  const validateForm = () => {
    const newErrors = {};
    if (formData.experienceRating === null) {
      newErrors.experienceRating = "* Please select.";
    }
    if (formData.experienceRemarks === "") {
      newErrors.experienceRemarks = "* Please select.";
    }

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
                <label
                  className={`${sfui_regular.className} ${styles.my_label}`}
                >
                  Ticket No.
                </label>
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

        <div>
          <div
            className={`${styles.whole} ${styles.left} ${styles.feedback} ${styles.revel}`}
          >
            <div className={`${styles.half} ${styles.left} ${styles.disc}`}>
              <span>Overall Experience</span>
            </div>
            <div className={`${styles.half} ${styles.left}`}>
              <div className={`${styles.whole} ${styles.flexD}`}>
                {[...Array(10)].map((_, index) => {
                  const value = index + 1;
                  return (
                    <div
                      className={`${styles.radioBtn} ${styles.wx}`}
                      key={value}
                    >
                      <input
                        type="radio"
                        id={`radio-${value}`}
                        name="rating"
                        className={styles.inputStyle}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            experienceRating: value,
                          })
                        }
                        checked={formData.experienceRating === value}

                        onClick={() =>
                          setErrors({ })
                        }
                      />
                      <label
                        htmlFor={`radio-${value}`}
                        className={`${styles.box} ${styles.colFormLabel} ${
                          formData.experienceRating === value
                            ? styles.selected
                            : ""
                        }`}
                      >
                        {value}
                      </label>
                    </div>
                  );
                
                })}
              </div>
              {errors.experienceRating && (
                <p className={styles.errorMessage}>{errors.experienceRating}</p>
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
              <div className={styles.radioBtn1}>
                <textarea
                  className={`${styles.whole} ${styles.textArea}`}
                  placeholder=" Please mention your remarks here..."
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      experienceRemarks: e?.target?.value,
                    })
                  }
                  onClick={() =>
                    setErrors({ })}


                ></textarea>
                 {errors.experienceRemarks && (
              <p className={styles.errorMessage}>{errors.experienceRemarks}</p>
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
