"use client";

import localFont from "next/font/local";
import React, { useEffect, useState } from "react";
import styles from "./feedbackLead.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const sfui_regular = localFont({
  src: "../../../fonts/sfui/SFUIDisplay-Regular.woff2",
});


const Content = () => {
  const router = useRouter();

  // console.log("rsrtr",router)

  const [formData, setFormData] = useState({
    salesRemark: null,
    experienceRating: null,
    experienceRemarks: "",
    requirements: null,
    callFeedback: null,
    otherReasonText: "",
    multiReason:""
  });


  
  const [errors, setErrors] = useState({});
  const [feedbackLeadInfo, setFeedbackLeadInfo] = useState(null);
  

  const ticketId =
    "detail?lead_id=79a0836a60a21d3aef66896dee62dde6:7417b1210bbaafc5cfea943a238c";
  const baseUrl = "https://gmlaravel.awfis.com/api/v1/get/lead/";
  useEffect(() => {
    const fetchFeedbackLeadInfo = async () => {
      try {
        const response = await axios.get(`${baseUrl}${ticketId}`, {
          params: {
            form_id: 2,
          },
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
      let formData = {
        data: [],
        form_id: 1,
        lead_id: 2,
      };
      formData.data.push();
      const response = await axios.post(`${baseUrl}${ticketId}`, formData);

      if (response.status === 200) {
        //modal kholna h idhr
      }
    } catch (error) {
      console.error("gjjyki", error);

      // Handle errors
    }
  };

  const handleYesNo = (question, value) => {
    setFormData((prevFormData) => ({
      requirements: {
        ...prevFormData.requirements,
        [question]: value,
      },
    }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[question];
      return newErrors;
    });
  };

  const handleTextareaChange = (event) => {
    const value = event.target.value;
    setTextareaValue(value);

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (value) {
        delete newErrors.textarea;
      }
      return newErrors;
    });
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

  const handleSubmit = (event) => {
    event.preventDefault();
    let newErrors = {};

    // Validate ratings
    if (!ratings["overallExperience"]) {
      newErrors["overallExperience"] = "* Please select.";
    }

    // Validate yes/no questions
    const requiredYesNoQuestions = [
      "callReceived",
      "requirementsMet",
      "shareFeedback",
    ];
    requiredYesNoQuestions.forEach((question) => {
      if (!yesNoAnswers[question]) {
        newErrors[question] = "* Please select.";
      }
    });

    // Validate textarea
    if (!textareaValue) {
      newErrors["textarea"] = "Please provide your feedback.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Submit form
    }
    submitForm1();
  };

  return (
    <div className={`${styles.container} container ${sfui_regular.className}`}>
      <div
        className={`${styles.whole} ${styles.left} ${styles.bottomContainer} ${styles.feedbackForm}`}
      >
        <form onSubmit={handleSubmit}>
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
                  formData.salesRemark === "Yes"
                    ? styles.selectedYesNo
                    : ""
                }`}
                onClick={() => handleYesNo("callReceived", "Yes")}
              >
                Yes
              </button>
              <button
                type="button"
                className={`${styles.box1} ${styles.buttonStyle1} ${
                  formData.salesRemark === "No" ? styles.selectedYesNo : ""
                }`}
                onClick={() => handleYesNo("callReceived", "No")}
              >
                No
              </button>
            </div>
            {errors.callReceived && (
              <div className={styles.errorMessage}>{errors.callReceived}</div>
            )}
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
                        onChange={() => setFormData({
                          ...formData,
                          experienceRating:value
                        })}
                        checked={formData.experienceRating === value}
                      />
                      <label
                        htmlFor={`radio-${value}`}
                        className={`${styles.box} ${styles.colFormLabel} ${
                          formData.experienceRating === value ? styles.selected : ""
                        }`}
                      >
                        {value}
                      </label>
                    </div>
                  );
                })}
              </div>
              {errors.overallExperience && (
                <div className={styles.errorMessage}>
                  {errors.overallExperience}
                </div>
              )}
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
                    onChange={handleTextareaChange}
                  ></textarea>
                  {errors.textarea && (
                    <div className={styles.errorMessage}>{errors.textarea}</div>
                  )}
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
                  formData.requirements === "Yes"
                    ? styles.selectedYesNo
                    : ""
                }`}
                onClick={() => handleYesNo("requirementsMet", "Yes")}
              >
                Yes
              </button>
              <button
                type="button"
                className={`${styles.box1} ${styles.buttonStyle1} ${
                  formData.requirements === "No"
                    ? styles.selectedYesNo
                    : ""
                }`}
                onClick={() => handleYesNo("requirementsMet", "No")}
              >
                No
              </button>
            </div>
            {errors.requirements && (
              <div className={styles.errorMessage}>
                {errors.requirements}
              </div>
            )}
          </div>

          {formData.requirements === "No" && (
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
                        ? styles.selectedResponse
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
          {/* {otherReason && (
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
                  value={otherReasonText}
                  onChange={handleOtherReasonChange}
                ></textarea>
              </div>
            </div>
          )} */}

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
                  formData.shareFeedback === "Yes"
                    ? styles.selectedYesNo
                    : ""
                }`}
                onClick={() => handleYesNo("shareFeedback", "Yes")}
              >
                Yes
              </button>
              <button
                type="button"
                className={`${styles.box1} ${styles.buttonStyle1} ${
                  formData.shareFeedback === "No"
                    ? styles.selectedYesNo
                    : ""
                }`}
                onClick={() => handleYesNo("shareFeedback", "No")}
              >
                No
              </button>
            </div>
            {errors.shareFeedback && (
              <div className={styles.errorMessage}>{errors.shareFeedback}</div>
            )}
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
        </form>
      </div>
    </div>
  );
};

export default Content;
