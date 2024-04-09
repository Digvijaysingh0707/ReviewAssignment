import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import ReviewManagement from "./components/ReviewManagement";
import CreateOrUpdateReview from "./components/CreateOrUpdateReview";

const RivewRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<ReviewManagement />} />
          <Route path="/add-review" element={<CreateOrUpdateReview />} />
          <Route path="/edit-review/:id" element={<CreateOrUpdateReview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RivewRoutes;