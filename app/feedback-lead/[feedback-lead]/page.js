"use client";

import localFont from "next/font/local";
import React, { useEffect, useState } from "react";
import styles from "./feedbackLead.module.css";
import axios from "axios";
import { usePathname } from "next/navigation";
import Swal from "sweetalert2";

const sfui_regular = localFont({
  src: "../../../fonts/sfui/SFUIDisplay-Regular.woff2",
});

const Content = () => {
  const pathName = usePathname();

  console.log("rsrtr",pathName?.split("/")[pathName?.split("/")?.length-1])

  const [formData, setFormData] = useState({
    salesRemark: null,
    experienceRating: null,
    experienceRemarks: "",
    requirements: null,
    callFeedback: null,
    otherReasonText: "",
    multiReason: "",
  });

  // onClick={()=>setFormData({
  //   ...formData,
  //   salesRemark:false
  // })}

  // onClick={()=>setFormData({
  //   ...formData,
  //   salesRemark:true
  // })}

  // const [ratings, setRatings] = useState({});
  const [errors, setErrors] = useState({});
  const [feedbackLeadInfo, setFeedbackLeadInfo] = useState(null);

  const ticketId =
    `detail?lead_id=${pathName?.split("/")[pathName?.split("/")?.length-1]}`;
  const baseUrl = "https://gmlaravel.awfis.com/api/v1/";
  
  useEffect(() => {
    const fetchFeedbackLeadInfo = async () => {
      try {
        const response = await axios.get(`${baseUrl}get/lead/${ticketId}`, {
         
        });
        setFeedbackLeadInfo(response?.data?.data);
        console.log("asda", response);
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    };
    fetchFeedbackLeadInfo();
  }, []);

  const submitForm1 = async () => {
    try {
      const myData = [
        {
          id:1,
          name:"Have you received a call from our sales representative?",
          remark:formData?.salesRemark === true ? 'yes':'no'
        },

        {
          id: 2,
        name: "On the scale of 10, how would you rate your experience with our sales representative, so far?",
        rating:formData?.experienceRating,
        },

        {
        id: 3,
        name: "Is there anything more that we can do to improve your experience?",
        remark: formData?.experienceRemarks
        },

        {
          id: 4,
          name: "Did we meet your requirements?",
          remark: formData?.requirements
      },
      {
          id: 5,
          name: "Please help us understand what did not work for you:",
          remark: formData?.multiReason
      },
      {
          id: 6,
          name: "Please mention your reason for deciding to not go ahead with us.",
          remark: formData?.otherReasonText
      },
      {
          id: 7,
          name: "Would you like to share your feedback with us over a call?",
          remark: formData?.callFeedback
      }
      ]
      await axios.post(`${baseUrl}lead/feedback`,{
        data:JSON.stringify(myData),
        form_id:3,
        lead_id:pathName?.split("/")[pathName?.split("/")?.length-1]
      });
      if (response1.status === 200) {
        Swal.fire({
          title: "Successful",
          text: "Data saved Successfully",
          icon: "success"
        });
      }
    } catch (error) {}
  };

 

  const validateForm = () => {
    const newErrors = {};
    if (formData.salesRemark === null) {
      newErrors.salesRemark = "* Please select.";
    }
    if (formData.experienceRating === null) {
      newErrors.experienceRating = "* Please select.";
    }
    
    if (formData.requirements === null) {
      newErrors.requirements = "* Please select.";
    }
    if (formData.multiReason ===  null ) {
      newErrors.multiReason = "* Please select.";
    }
    
    if(formData?.multiReason?.includes("Other Reasons")){
      if (formData.otherReasonText ===  "") {
        newErrors.otherReasonText = "* Please select.";
      }
    }
    
    if (formData.callFeedback === null) {
      newErrors.callFeedback = "* Please select.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
 

  const handleSubmit = () => {
    if (validateForm()) {
      submitForm1();
      console.log("asdsa")
    }
  };

  const handleAdditionalFeedback = (response) => {
    setFormData((prevState) => {
      const { multiReason } = prevState;
      if (multiReason.includes(response)) {
        return {
          ...prevState,
          multiReason: multiReason.filter((reason) => reason !== response)
        };
      } else {
        return {
          ...prevState,
          multiReason: [...multiReason, response]
        };
      }
    });
  };
  

  const handleOtherReasonChange = (event) => {
    setOtherReasonText(event.target.value);
  };

  

  return (
    <div className={`${styles.container} container ${sfui_regular.className}`}>
      <div
        className={`${styles.whole} ${styles.left} ${styles.bottomContainer} ${styles.feedbackForm}`}
      >
        <div >
          <div
            className={`${styles.whole} ${styles.left}  ${styles.bgSky} ${styles.px} ${styles.widthresponsive}`}
          >
            <div
              className={`${styles.flexDdesk} ${styles.whole} ${styles.vCentre}  ${styles.left} ${styles.flexD}`}
            >
              <div
                className={`${styles.flexD} ${styles.detailWidth}  ${styles.mx}`}
              >
                <div className={``}>
                  <label className={styles.label}>Lead ID</label>
                </div>
                <div className={`${styles.leedLabelM}`}>
                  <label className={styles.label}>-</label>
                </div>
                <div>
                  <label className={styles.label}>{feedbackLeadInfo?.id}</label>
                </div>
              </div>
              <div
                className={`${styles.flexD} ${styles.detailWidth}  ${styles.mx}`}
              >
                <div className={``}>
                  <label className={styles.label}>Date</label>
                </div>
                <div className={`${styles.leedLabelM}`}>
                  <label className={styles.label}>-</label>
                </div>
                <div>
                  <label className={styles.label}>
                    {feedbackLeadInfo?.added_on}
                  </label>
                </div>
              </div>

              <div
                className={`${styles.flexD} ${styles.detailWidth}  ${styles.mx}`}
              >
                <div className={``}>
                  <label className={styles.label}>Product Name</label>
                </div>
                <div className={`${styles.leedLabelM} `}>
                  <label className={styles.label}>-</label>
                </div>
                <div>
                  <label className={styles.label}>
                    {feedbackLeadInfo?.inventor_type_name}
                  </label>
                </div>
              </div>
            </div>

            <div
              className={`${styles.flexDdesk} ${styles.whole} ${styles.vCentre}  ${styles.left} ${styles.flexD}`}
            >
              <div
                className={`${styles.flexD} ${styles.detailWidth}  ${styles.mx}`}
              >
                <div className={``}>
                  <label className={styles.label}>Company name</label>
                </div>
                <div className={`${styles.leedLabelM}`}>
                  <label className={styles.label}>-</label>
                </div>
                <div>
                  <label className={styles.label}>
                    {feedbackLeadInfo?.company_name}
                  </label>
                </div>
              </div>
              <div
                className={`${styles.flexD} ${styles.detailWidth}  ${styles.mx}`}
              >
                <div className={``}>
                  <label className={styles.label}>Name</label>
                </div>
                <div className={`${styles.leedLabelM}`}>
                  <label className={styles.label}>-</label>
                </div>
                <div>
                  <label className={styles.label}>
                    {feedbackLeadInfo?.name}
                  </label>
                </div>
              </div>

              <div
                className={`${styles.flexD} ${styles.detailWidth}  ${styles.mx}`}
              >
                <div className={``}>
                  <label className={styles.label}>Email</label>
                </div>
                <div className={`${styles.leedLabelM} `}>
                  <label className={styles.label}>-</label>
                </div>
                <div>
                  <label className={styles.label}>
                    {feedbackLeadInfo?.email}
                  </label>
                </div>
              </div>
            </div>

            <div
              className={`${styles.flexDdesk1} ${styles.whole} ${styles.vCentre}  ${styles.left} ${styles.flexD}`}
            >
              <div
                className={`${styles.flexD} ${styles.detailWidth}  ${styles.mx}`}
              >
                <div className={``}>
                  <label className={styles.label}>Contact no</label>
                </div>
                <div className={`${styles.leedLabelM}`}>
                  <label className={styles.label}>-</label>
                </div>
                <div>
                  <label className={styles.label}>
                    {feedbackLeadInfo?.mobile}
                  </label>
                </div>
              </div>
              <div
                className={`${styles.flexD} ${styles.detailWidth}  ${styles.mx}`}
              >
                <div className={``}>
                  <label className={styles.label}>City</label>
                </div>
                <div className={`${styles.leedLabelM}`}>
                  <label className={styles.label}>-</label>
                </div>
                <div>
                  <label className={styles.label}>
                    {feedbackLeadInfo?.city_name}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className={``}>
            <h3 className={`${styles.title1} ${styles.left}`}>
              Please update your valuable feedback
            </h3>
          </div>

          <div
            className={`${styles.whole} ${styles.left} ${styles.feedback} ${styles.revel}`}
          >
            <div
              className={`${styles.blockView} ${styles.left} ${styles.disc}`}
            >
              <span>
                Have you received a call from our Sales Representative?
              </span>
            </div>
            <div
              className={`${styles.yesNOButton} ${styles.small} ${styles.blockView} ${styles.left} ${styles.whole} ${styles.flexD} ${styles.wx} ${styles.radioBtn} ${styles.cont1}`}
            >
              <button
                type="button"
                className={`${styles.box1} ${styles.buttonStyle1} ${
                  formData.salesRemark === true ? styles.selectedYesNo : ""
                }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    salesRemark: true,
                  })
                }
              >
                Yes
              </button>
              <button
                type="button"
                className={`${styles.box1} ${styles.buttonStyle1} ${
                  formData.salesRemark === false ? styles.selectedYesNo : ""
                }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    salesRemark: false,
                    
                    
                  })
                }
              >
                No
              </button>
            </div>
            {errors.salesRemark && <p className={styles.errorMessage}>{errors.salesRemark}</p>}
          </div>

          <div
            className={`${styles.whole} ${styles.left} ${styles.feedback} ${styles.revel}`}
          >
            <div
              className={`${styles.blockView} ${styles.left} ${styles.disc}`}
            >
              <span className={styles.text1}>
                On the scale of 10, how would you rate your experience with our
                sales representative, so far?*
              </span>
              <br />
              <span className={styles.subText}>
                (1 being the lowest and 10 being the highest)
              </span>
            </div>

            <div className={`${styles.blockView} ${styles.left1}`}>
              <div
                className={`${styles.whole} ${styles.flexD} ${styles.cont1}`}
              >
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
              {errors.experienceRating && <p className={styles.errorMessage}>{errors.experienceRating}</p>}
            </div>
          </div>

          <div
            className={`${styles.whole} ${styles.left} ${styles.feedback} ${styles.revel}`}
          >
            <div
              className={`${styles.blockView} ${styles.left} ${styles.disc}`}
            >
              <span>
                Is there anything more that we can do to improve your
                experience?
              </span>
            </div>
            <div className={`${styles.blockView} ${styles.left}`}>
              <div
                className={`${styles.whole} ${styles.flexD} ${styles.cont1}`}
              >
                <div className={`${styles.whole} ${styles.left}`}>
                  <textarea
                    className={`${styles.whole} ${styles.textArea}`}
                    value={formData.experienceRemarks}
                    onChange={(e)=>setFormData({
                      ...formData,
                      experienceRemarks:e?.target?.value
                    })}
                  ></textarea>
                   {errors.experienceRemarks && <p className={styles.errorMessage}>{errors.experienceRemarks}</p>}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${styles.whole} ${styles.left} ${styles.feedback} ${styles.revel}`}
          >
            <div
              className={`${styles.blockView} ${styles.left} ${styles.disc}`}
            >
              <span>Did we meet your requirements? *</span>
            </div>

            <div
              className={`${styles.yesNOButton} ${styles.small} ${styles.blockView} ${styles.left} ${styles.whole} ${styles.flexD} ${styles.wx} ${styles.radioBtn} ${styles.cont1}`}
            >
              <button
                type="button"
                className={`${styles.box1} ${styles.buttonStyle1} ${
                  formData.requirements === true ? styles.selectedYesNo : ""
                }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    requirements: true,
                  })
                }
              >
                Yes
              </button>
              <button
                type="button"
                className={`${styles.box1} ${styles.buttonStyle1} ${
                  formData.requirements === false ? styles.selectedYesNo : ""
                }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    requirements: false,
                  })
                }
              >
                No
              </button>
            </div>
            {errors.requirements && <p className={styles.errorMessage}>{errors.requirements}</p>}
          </div>

          {formData.requirements === false && (
            <div
              className={`${styles.whole} ${styles.left} ${styles.feedback} ${styles.revel}`}
            >
              <div
                className={`${styles.blockView} ${styles.left} ${styles.disc}`}
              >
                <span>
                  Please help us understand what did not work for you: *
                </span>
                <br />
                <span className={styles.subText}>
                  (You can choose multiple responses)
                </span>
              </div>

              <div
                className={`${styles.blockView} ${styles.left} ${styles.whole} ${styles.flexD} ${styles.wx} ${styles.radioBtn} ${styles.cont1}`}
              >
                {[
                  "Proposed costing",
                  "Quality of service",
                  "Design & aesthetics",
                  "Amenities",
                  "Location",
                  "Other reasons",
                ].map((response) => (
                  <button
                    type="button"
                    key={response}
                    className={`${styles.box1} ${styles.buttonStyle1} ${
                      formData?.multiReason?.includes(response)
                        ? styles.selectedYesNo
                        : ""
                    }`}
                    onClick={() => handleAdditionalFeedback(response)}
                  >
                    {response}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Conditionally render additional textarea */}
          {formData.multiReason?.includes("Other reasons") && (
            <div
              className={`${styles.whole} ${styles.left} ${styles.feedback} ${styles.revel}`}
            >
              <div
                className={`${styles.blockView} ${styles.left} ${styles.disc}`}
              >
                <span>
                  Please mention your reason for deciding to not go ahead with
                  us:
                </span>
              </div>
              <div className={`${styles.blockView} ${styles.left}`}>
              <textarea
                    className={`${styles.whole} ${styles.textArea}`}
                    value={formData.otherReasonText}
                    onChange={(e)=>setFormData({
                      ...formData,
                      otherReasonText:e?.target?.value
                    })}
                  ></textarea>
              </div>
              {errors.otherReasonText && <p className={styles.errorMessage}>{errors.otherReasonText}</p>}
            </div>
          )}

          <div
            className={`${styles.whole} ${styles.left} ${styles.feedback} ${styles.revel}`}
          >
            <div
              className={`${styles.blockView} ${styles.left} ${styles.disc}`}
            >
              <span>
                Would you like to share your feedback with us over a call?
              </span>
            </div>

            <div
              className={`${styles.yesNOButton} ${styles.small} ${styles.blockView} ${styles.left} ${styles.whole} ${styles.flexD} ${styles.wx} ${styles.radioBtn} ${styles.cont1}`}
            >
              <button
                type="button"
                className={`${styles.box1} ${styles.buttonStyle1} ${
                  formData.callFeedback === true ? styles.selectedYesNo : ""
                }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    callFeedback: true,
                  })
                }
              >
                Yes
              </button>
              <button
                type="button"
                className={`${styles.box1} ${styles.buttonStyle1} ${
                  formData.callFeedback === false ? styles.selectedYesNo : ""
                }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    callFeedback: false,
                  })
                }
              >
                No
              </button>
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
