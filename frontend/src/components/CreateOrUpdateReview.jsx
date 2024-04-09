import React, { useEffect, useState } from "react";
import { addReview, updateReview } from "../config/services/review";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const CreateOrUpdateReview = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isUpdate, setIsupdate] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    if (state === null || state === undefined) return;
    if (Object.keys(state)?.length > 0) {
      setContent(state?.content);
      setTitle(state?.title);
      setIsupdate(true);
    }
  }, [state]);


  const handleSubmit = async (event) => {
    if (!isUpdate)
    {
      event.preventDefault();
    try {
      let params = {
        title: title,
        content: content,
      };
      const res = await addReview(params);
      if (res?.status === 200) {
        toast.success("Review Added Successfully!");
        navigate("/");
      } else {
        toast.error("Review Not Addded Some error occured");
      }
    } catch (err) {
      console.error(err);
    }
      
    }
    else {
      event.preventDefault();
      try {
        let params = {
          title: title,
          content: content,
          _id: state?._id,
        };
        const res = await updateReview(params);
        if (res?.status === 200) {
          toast.success("Review Updated Successfully!");
          navigate("/");
        } else {
          toast.error("Review Not Addded Some error occured");
        }
      } catch (err) {
        console.error(err);
      }
    }
    
  };

  const handleReset = () => {
    setTitle("");
    setContent("");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="form-container">
      <h1>New Review</h1>
      <form onSubmit={handleSubmit} className="review-form">
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input-field"
        />
        <br />
        <br />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="input-field"
        ></textarea>
        <br />
        <br />
        <div className="button-container">
        <button type="submit" className="submit-button">{isUpdate ? "Update" : "Save"}</button>
        <button type="button" onClick={handleReset} className="reset-button">Reset</button>
        <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
      </div>
      </form>
    </div>
  );
};

export default CreateOrUpdateReview;