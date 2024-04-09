import React, { useState, useEffect } from "react";
import ReviewTable from "./ReviewListing";
import { listRivews } from "../config/services/review";
import Pagination from "../components/CustomPagination";

const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};

const ReviewManagement = () => {
  const [pageNo, setPagination] = useState(1);
  const [itemsPerPage] = useState(10);
  const [search, setSearchValue] = useState("");
  const [lastPage, setLastPage] = useState(false);
  const [loader, setLoading] = useState(false);
  const [searchBy, setSearchBy] = useState("");
  const [reviewsList, setReviewsList] = useState([]);
  const [sortObj, setSortObj] = useState({ sortKey: 'updatedAt', sortOrder: 'desc' })

  const getReviewList = async () => {
    let params = {
      pageNo: (pageNo - 1),
      count: itemsPerPage,
      search: search,
      ...sortObj
    };
    try {
      setLastPage(false);
      let result = await listRivews(params);
      let list = result?.data?.data;
      if (list?.length > 0) {
        setReviewsList(list);
        if (list?.length < itemsPerPage) setLastPage(true);
      } else {
        setReviewsList([]);
        setLastPage(true);
      }
    } catch (err) {
      console.error("Error occurred while fetching reviews:", err);
    }
  };

  const handleSort = (key) => {
    let newOrder = sortObj?.sortOrder === 'desc' ? 'asc' : 'desc'
    setSortObj({ sortKey: key, sortOrder: newOrder })
  }

  const handleSearch = (e) => {
    let value = e?.target?.value;
    console.log(value, 'value')
    let finalValue = value.trim()
    if (finalValue !== "") setSearchValue(finalValue);
    else setSearchValue("")

  };
  const debouncedHandleSearch = debounce(handleSearch, 800);

  useEffect(() => {
    getReviewList();
  }, [itemsPerPage, search, pageNo, sortObj]);

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
                <h3>Review Listing</h3>
              </div>
              <div class="right">
                <a href="/add-review">
                  <div class="submitBtn">Create</div>
                </a>
              </div>
            </div>
            <input
              style={{ marginBottom: "20px" }}
              class="inputRounded search-input width-100"
              type="search"
              placeholder="Search By Title"
              maxlength="100"
              onChange={debouncedHandleSearch}
            />
            <div id="loader"></div>
            <div id="hardwarePartVariantTable">
              <ReviewTable options={reviewsList} getReviewList={getReviewList} handleSort={handleSort} sortObj={sortObj} />
            </div>
          </div>
          <div class="pagination">
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