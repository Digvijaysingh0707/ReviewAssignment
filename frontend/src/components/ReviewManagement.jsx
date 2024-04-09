import React, { useState, useEffect } from "react";
import ReviewTable from "./ReviewListing";
import { listRivews } from "../config/services/review";
import Pagination from "../components/CustomPagination";

const ReviewManagement = () => {
  const [pageNo, setPagination] = useState(1);
  const [itemsPerPage] = useState(10);
  const [search, setSearchValue] = useState("");
  const [lastPage, setLastPage] = useState(false);
  const [loader, setLoading] = useState(false);
  const [searchBy, setSearchBy] = useState("");
  const [reviewsList, setReviewsList] = useState([]);

  const getRivewList = () => {
    let params = {};
    setLoading(true);
    setLastPage(false);
    listRivews(params)
      .then((res) => {
        console.log(res, "............res");
        let list = res?.data?.data;
        setReviewsList(list);
        if (res?.data?.part_variants.length < itemsPerPage) setLastPage(true);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getRivewList();
  }, [itemsPerPage, search, pageNo]);

  return (
    <>
      <div class="tableCardContainer">
        <div class="paper">
          <div class="mainContainer">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <div class="left">
                <h3>Manage Reviews</h3>
              </div>
              <div class="right">
                <a href="/add-review">
                  <div class="submitBtn">Create</div>
                </a>
              </div>
            </div>
            <input
              style={{ marginBottom: "20px" }}
              class="inputRounded search-input width-auto"
              type="search"
              placeholder="Search By Title"
              oninput="handleSearch(event)"
              maxlength="100"
            />
            <div id="loader"></div>
            <div id="hardwarePartVariantTable">
              <ReviewTable options={reviewsList} getRivewList={getRivewList} />
            </div>
          </div>
          <div class="center cm_pagination">
            <div id="pagination">
              <Pagination
                pageNo={pageNo}
                setPagination={setPagination}
                lastPage={lastPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewManagement;