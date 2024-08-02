'use client';

import localFont from "next/font/local";
import styles from "./salesId.module.css";
import React, { useState } from 'react';


const sfui_regular = localFont({
  src: "../../../../fonts/sfui/SFUIDisplay-Regular.woff2",
});


const SalesId = () => {
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

   
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Submit form
    }
  };

  const nestedCategories = [
    {
      name: 'topic1',
      label: '',
      subCategories: [
        { name: 'connectivity', label: 'The promptness and responsiveness of the sales representative' },
        { name: 'speed', label: 'The sales representativeâ€™s understanding of your requirement and his/her recommendations' },
        { name: 'variety', label: 'The overall experience with us including your site visit' },
      ],
    },
   
  ];

 

  return (
    <section className={`${styles.whole} ${styles.left}`}>
      <div className={`${styles.container} ${sfui_regular.className}`}>
        <div className={`${styles.whole} ${styles.left} ${styles.bottomContainer} ${styles.feedbackForm}`}>
          <div className={`${styles.whole} ${styles.left}  ${styles.pc}`}>
            <h3 className={`${styles.feedbackTitle} ${styles.left} ${styles.fontTopic}`}>
            Please share your sales experience on the below parameters on a scale of 1 to 10 with 10 being the highest.
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

export default SalesId;
