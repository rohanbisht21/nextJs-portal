"use client";
import localFont from "next/font/local";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./support.module.css";
import { usePathname } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";
import Swal from "sweetalert2";

const sfui_regular = localFont({
  src: "../../../fonts/sfui/SFUIDisplay-Regular.woff2",
});

const Content = () => {
  const pathName = usePathname();
  const ticketId =
    "28bcf163bc6d1909297d46792adf414c:77d6716f6dc10d614fce35a7fc8efb1e54";
    const ticketId2 =
    "history?ticket_id=28bcf163bc6d1909297d46792adf414c:77d6716f6dc10d614fce35a7fc8efb1e54";
  const [errors, setErrors] = useState({});
  const [ticketData, setTicketData] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [timelineHistory, setTimelineHistory] = useState([]);

  // Function to fetch ticket data
  const fetchTicketData = async () => {
    try {
      const response = await axios.get(
        `https://gmlaravel.awfis.com/api/v1/get/ticket?ticket_id=${ticketId2}`
      );
     
      setTicketData(response.data.data);
      console.log("sdasd", response.data.data);
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    }
  };

  // Funtion to fetch history data  IISE KRNA H HISTORY API FECTH KRRO
  const fetchTicketData2 = async () => {
    try {
      const response = await axios.get(
        `https://gmlaravel.awfis.com/api/v1/get/ticket/${ticketId}`
      );
     
      
      setTimelineHistory(response); // Assuming timeline is part of the ticket data
      console.log("aaaaa", response);
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    }
  };

  useEffect(() => {
    fetchTicketData();
    fetchTicketData2();
  }, []);

  const submitForm2 = async () => {
    try {
      const payload = {
        id: pathName?.split("/")[pathName?.split("/")?.length - 1],
        remarks: editorContent,
      };

      const response1 = await axios.post(`https://gmlaravel.awfis.com/api/v1/update/ticket/comment`, payload);
      console.log("asdas", response1);
      if (response1.status === 200) {
        Swal.fire({
          title: "Successful",
          text: "Data saved Successfully",
          icon: "success",
        });

        // Update the timeline history with the new remark
        setTimelineHistory((prevHistory) => [
          ...prevHistory,
          {
            timestamp: new Date().toISOString(),
            author: "Author name", // Replace with actual author name if available
            status: ticketData?.ticket_status_name, // Replace with actual status if available
            remark: editorContent,
          },
        ]);
        setEditorContent(""); // Clear the editor content
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      Swal.fire({
        title: "Unsuccessful",
        text: "Please try again",
        icon: "error",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (editorContent === "") {
      newErrors.editorContent = Swal.fire({
        title: "Warning",
        text: "Comment is mandatory!",
        icon: "warning",
      });
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
    <div className={`${styles.container} container`}>
      <div className={styles.headingContainer}>
        <p className={styles.headingContainerText}>Ticket History</p>
        <p className={styles.headingContainerText}>
          Issue: {ticketData?.subject}
        </p>
      </div>

      <div className={`${styles.fullTextArea} ${styles.left} ${styles.bgLowSky} ${styles.px}`}>
        <div className={`${styles.oneHalf} ${styles.left} `}>
          <div className={styles.flexD}>
            <label className={styles.oneForthBold}>Ticket No</label>
            <span className={styles.px}>-</span>
            <label className={styles.oneForth}>{ticketData?.id}</label>
          </div>

          <div className={styles.flexD}>
            <label className={styles.oneForthBold}>Created Date</label>
            <span className={styles.px}>-</span>
            <label className={styles.oneForth}>{ticketData?.modified_on}</label>
          </div>

          <div className={styles.flexD}>
            <label className={styles.oneForthBold}>Created By</label>
            <span className={styles.px}>-</span>
            <label className={styles.oneForth}>{ticketData?.added_by_name}</label>
          </div>

          <div className={styles.flexD}>
            <label className={styles.oneForthBold}>Space</label>
            <span className={styles.px}>-</span>
            <label className={styles.oneForth}>{ticketData?.space_name}</label>
          </div>
        </div>

        <div className={`${styles.oneHalf} ${styles.left} `}>
          <div className={styles.flexD}>
            <label className={styles.oneForthBold}>Customer Type</label>
            <span className={styles.px}>-</span>
            <label className={styles.oneForth}>
              {ticketData?.customer_type == 1 ? "Awfis" : "Clients"}
            </label>
          </div>

          <div className={styles.flexD}>
            <label className={styles.oneForthBold}>Company</label>
            <span className={styles.px}>-</span>
            <label className={styles.oneForth}>{ticketData?.company_name}</label>
          </div>

          <div className={styles.flexD}>
            <label className={styles.oneForthBold}>Impacted User</label>
            <span className={styles.px}>-</span>
            <label className={styles.oneForth}>{ticketData?.user_email}</label>
          </div>

          <div className={styles.flexD}>
            <label className={styles.oneForthBold}>Mobile</label>
            <span className={styles.px}>-</span>
            <label className={styles.oneForth}>{ticketData?.user_mobile}</label>
          </div>

          <div className={styles.flexD}>
            <label className={styles.oneForthBold}>Email Id</label>
            <span className={styles.px}>-</span>
            <label className={styles.oneForth}>{ticketData?.user_email}</label>
          </div>
        </div>
      </div>

      <div className={`${styles.fullTextArea} ${styles.left} ${styles.bgLowSky} ${styles.px}`}>
        <div className={`${styles.oneHalf} ${styles.left} `}>
          <div className={styles.flexD}>
            <label className={styles.oneForthBold}>Super Category</label>
            <span className={styles.px}>-</span>
            <label className={styles.oneForth}>{ticketData?.super_category}</label>
          </div>

          <div className={styles.flexD}>
            <label className={styles.oneForthBold}>Category</label>
            <span className={styles.px}>-</span>
            <label className={styles.oneForth}>{ticketData?.category}</label>
          </div>
        </div>

        <div className={`${styles.oneHalf} ${styles.left} `}>
          <div className={styles.flexD}>
            <label className={styles.oneForthBold}>SubCategory</label>
            <span className={styles.px}>-</span>
            <label className={styles.oneForth}>{ticketData?.sub_category}</label>
          </div>

          <div className={styles.flexD}>
            <label className={styles.oneForthBold}>Ticket Type</label>
            <span className={styles.px}>-</span>
            <label className={styles.oneForth}>{ticketData?.type_key}</label>
          </div>
        </div>
      </div>

      <div className={styles.TextEditorContainer}>
        <label className={styles.oneForthBold}>Remark</label>
      </div>

      <Editor
        apiKey="1n7tl604g02302lpjqg3tg5lkjfevb6f2sp0p6yd6s725ar8"
        init={{
          plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          ai_request: (request, respondWith) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
        }}
        initialValue=""
        onEditorChange={(content) => setEditorContent(content)}
      />

      <div className={`${styles.whole} ${styles.left} ${styles.mt}`}>
        <div className={`${styles.whole} ${styles.flexD}`}>
          <label className={`${styles.imageText}`}>Images</label>
          <div className={`${styles.left} ${styles.revel}`}>
            <input
              type="file"
              className={`${styles.attach} `}
              placeholder="attach file"
            />
            <label
              className={`${styles.fileAttach} ${styles.flexD} ${styles.itemsCenter}`}
            >
              <img src="https://gomile.awfis.com/images/attachment.png" />{" "}
              <p>attach file</p>
            </label>
          </div>
        </div>
      </div>

      <div className={`${styles.whole} ${styles.left} ${styles.flexD} ${styles.bgLowSky} ${styles.itemsCenter} ${styles.mth} ${styles.px}`}>
        <div className={`${styles.flexD} ${styles.oneHalf}`}>
          <label className={styles.onFourth}>Ticket Status</label>
          <span className={styles.px}>-</span>
          <div className={`${styles.flexD} ${styles.onFourth}`}>
            <div className={styles.left}>
              <label className="">{ticketData?.ticket_status_name} </label>
            </div>
          </div>
        </div>

        <div className={`${styles.flexD} ${styles.oneHalf}`}>
          <div className={`${styles.textRight} ${styles.whole} ${styles.left}`}>
            <button type="submit" className={styles.button} onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className={`${styles.timelineContainer} `}>
        <h5 className={styles.leadHead}>Timeline</h5>
        <div>
          {timelineHistory.map((entry, index) => (
            <p key={index} className={`${styles.hisCircle} ${styles.timelineText}`}>
              <span className={`${styles.whole} ${styles.left} `}>
                {new Date(entry.timestamp).toLocaleString()} : {ticketData?.added_by_name}  updated as{" "}
                <br />
              </span>
              <span className={styles.textNarration}>
                <span className={`${styles.whole} ${styles.left} ${styles.textNarrationColor}`}>
                  Ticket impacted user changed to {ticketData?.added_by_name} <br />
                </span>
              </span>
              <br />
              <span className={styles.textNarration}>
                <span
                  className={`${styles.whole} ${styles.left}`}
                  dangerouslySetInnerHTML={{ __html: entry.remark }}
                ></span>
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
