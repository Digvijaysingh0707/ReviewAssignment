import React from "react";
import moment from "moment";
import { deleteReview } from "../config/services/review";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ReviewListing = ({ options, getReviewList }) => {

  const navigate = useNavigate();
  const handleEditClick = (row) => {
    let id = row?._id;
    navigate(`/edit-review/${id}`, {
      state:  row
    });
  };

 const handleDelete = async (row) => {
   try {
     let params = {
       _id: row?._id,
     };

     const res = await deleteReview(params);
     if (res?.status === 200) {
       toast.success("Entry deleted successfully!",{duration:5000});
       await getReviewList();
     } else {
       toast.error("Entry not Deleted",{duration:5000});
     }
   } catch (error) {
     console.error("Error deleting review:", error);
   }
 };


  return (
    <div>
      <table
        aria-label="customized table"
        className="custom-table datasets-table"
      >
        <thead>
          <tr className="cm_table_head">
            <th>S.No.</th>
            <th>Title</th>
            <th>Content</th>
            <th>Date-Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {options &&
            options.length > 0 &&
            options.map((row, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{row?.title}</td>
                <td>{row?.content}</td>
                <td>{moment(row?.createdAt).format("DD-MM-YYYY (HH:mm A)")}</td>
                <td className="edit-cell action-cell">
                  <button
                    className="form_icon"
                    onClick={() => handleEditClick(row)}
                  >
                    Edit
                  </button>
                  <button
                    className="form_icon"
                    onClick={() => handleDelete(row)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewListing;