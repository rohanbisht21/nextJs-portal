'use client';

import styles from "./feedback.module.css";
import React, { useState } from 'react';

const BookingId = () => {
  const [ratings, setRatings] = useState({});
  const [feedback, setFeedback] = useState({});
  const [errors, setErrors] = useState({});

  const handleRadio = (category, subCategory, index) => {
    if (subCategory === null) {
      setRatings((prevRatings) => ({
        ...prevRatings,
        [category]: index,
      }));
    } else {
      setRatings((prevRatings) => ({
        ...prevRatings,
        [category]: {
          ...prevRatings[category],
          [subCategory]: index,
        },
      }));
    }

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (subCategory === null) {
        delete newErrors[category];
      } else {
        delete newErrors[`${category}-${subCategory}`];
      }
      return newErrors;
    });
  };

  const handleFeedbackChange = (category, event) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [category]: event.target.value,
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
    nestedCategories.forEach((nestedCategory) => {
      nestedCategory.subCategories.forEach((subCategory) => {
        if (!ratings[nestedCategory.name]?.[subCategory.name]) {
          newErrors[`${nestedCategory.name}-${subCategory.name}`] = '* Please select.';
        }
      });
    });

    // Validate feedback
    if (!feedback[feedbackTopic.name]) {
      newErrors[feedbackTopic.name] = '* Please select.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Submit form
    }
  };

  const nestedCategories = [
    {
      name: 'wifi',
      label: 'Wifi',
      subCategories: [
        { name: 'connectivity', label: 'Connectivity' },
        { name: 'speed', label: 'Speed' },
      ],
    },
    {
      name: 'foodAndBeverages',
      label: 'Food & Beverages',
      subCategories: [
        { name: 'quality', label: 'Quality' },
        { name: 'variety', label: 'Variety' },
      ],
    },
    {
      name: 'cleanliness&hygiene',
      label: 'Cleanliness & Hygiene',
      subCategories: [
        { name: 'yourworkspace', label: 'Your Workspace' },
        { name: 'commonareas', label: 'Common Areas' },
      ],
    },
    {
      name: 'communityengagement',
      label: 'Community Engagement',
      subCategories: [
        { name: 'frequencyofevents', label: 'Frequency of Events' },
        { name: 'typeofevents', label: 'Type of Events' },
      ],
    },
    {
      name: 'YourCommunityTeam',
      label: 'Your Community Team',
      subCategories: [
        { name: 'CommunityManager', label: 'Community Manager' },
        { name: 'CentreStaff', label: 'Centre Staff (Housekeeping, Security, Café staff etc)' },
      ],
    },
  ];

  const feedbackTopic = { name: 'additionalFeedback', label: 'How can we improve your experience with Awfis?' };

  return (
    <section className={`${styles.whole} ${styles.left}`}>
      <div className={styles.container}>
        <div className={`${styles.whole} ${styles.left} ${styles.bottomContainer} ${styles.feedbackForm}`}>
          <div className={`${styles.whole} ${styles.left}  ${styles.pc}`}>
            <h3 className={`${styles.feedbackTitle} ${styles.left} ${styles.fontTopic}`}>
              Please share your experience on the below parameters on a scale of 1 to 10 with 10 being the highest.
            </h3>

            <form onSubmit={handleSubmit}>
              {/* Nested categories */}
              {nestedCategories.map((nestedCategory) => (
                <div key={nestedCategory.name} className={`${styles.whole} ${styles.left} ${styles.revel}`}>
                  <div className={`${styles.whole} ${styles.left}`}>
                    <h3 className={`${styles.categoryTitle} ${styles.left}`}>{nestedCategory.label}</h3>
                  </div>
                  {nestedCategory.subCategories.map((subCategory) => (
                    <div key={subCategory.name} className={`${styles.whole} ${styles.feedback} ${styles.left}`}>
                      <div className={`${styles.half} ${styles.left} ${styles.disc}`}>
                        <span className={styles.subCategoryTitle}>{subCategory.label}</span>
                      </div>
                      <div className={`${styles.half} ${styles.left} ${styles.threeTenths}`}>
                        <div className={`${styles.whole} ${styles.flexD}`}>
                          {[...Array(10)].map((_, index) => (
                            <div key={index} className={styles.radioBtn}>
                              <input
                                type="radio"
                                id={`${nestedCategory.name}-${subCategory.name}-rating-${index + 1}`}
                                name={`${nestedCategory.name}-${subCategory.name}-rating`}
                                className={styles.radiohide}
                                checked={ratings[nestedCategory.name]?.[subCategory.name] === index + 1}
                                onChange={() => handleRadio(nestedCategory.name, subCategory.name, index + 1)}
                              />
                              <label
                                htmlFor={`${nestedCategory.name}-${subCategory.name}-rating-${index + 1}`}
                                className={`${styles.box} ${styles.colFormLabel} ${ratings[nestedCategory.name]?.[subCategory.name] === index + 1 ? styles.clicked : ''}`}
                                onClick={() => handleRadio(nestedCategory.name, subCategory.name, index + 1)}
                              >
                                {index + 1}
                              </label>
                            </div>
                          ))}
                        </div>
                        {errors[`${nestedCategory.name}-${subCategory.name}`] && (
                          <span className={styles.error}>{errors[`${nestedCategory.name}-${subCategory.name}`]}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {/* New topic with feedback textarea */}
              <div className={`${styles.whole} ${styles.left} ${styles.revel}`}>
                <div className={`${styles.whole} ${styles.left}`}>
                  <h3 className={`${styles.categoryTitle} ${styles.left}`}>{feedbackTopic.label}</h3>
                </div>
                <div className={`${styles.whole} ${styles.left}`}>
                  <textarea
                    className={`${styles.whole} ${styles.textarea}`}
                    value={feedback[feedbackTopic.name] || ''}
                    onChange={(event) => handleFeedbackChange(feedbackTopic.name, event)}
                    placeholder=""
                  ></textarea>
                  {errors[feedbackTopic.name] && (
                    <span className={styles.error}>{errors[feedbackTopic.name]}</span>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className={`${styles.whole} ${styles.left} ${styles.feedback} ${styles.revel}`}>
                <div className={`${styles.textCenter} ${styles.disc} ${styles.left} ${styles.whole}`}>
                  <button type="submit" className={`${styles.mobiltyBtn} ${styles.btn}`}>Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingId;
