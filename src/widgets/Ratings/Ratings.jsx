import React, { useState, useEffect } from "react";
import axios from "axios";
import { url, API_TOKEN } from "/config.js";
import StarRating from "../shared/StarRating.jsx";
import RatingsCharts from "./RatingsCharts.jsx";
import ReviewsList from "./ReviewsList.jsx";
import Sort from "./Sort.jsx";

// import Star from "../shared/Star.jsx";

const Ratings = (props) => {
  const [reviews, setReviews] = useState([]);
  const [metaData, setMetaData] = useState([]);

  useEffect(() => {
    if (props.product.id !== undefined) {

      axios
        .get(`${url}reviews?product_id=${props.product.id}&sort=newest&count=999999`, {
          headers: { Authorization: API_TOKEN },
        })
        .then((response) => {
          var sortedReviews = sortByRelevance(response.data.results);
          setReviews(sortedReviews);
        })
        .catch((error) => {
          console.log(error);
        });

      axios.get(`${url}reviews/meta?product_id=${props.product.id}`, {
        headers: { Authorization: API_TOKEN },
      })
        .then(response => {
          setMetaData(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.product.id]);

  var sortByRelevance = (reviews) => {
    var helpfulRev = [];
    var nonHelpfulRev = [];
    reviews.forEach((value) => {
      if (value.helpfulness > 0) {
        helpfulRev.push(value);
      } else {
        nonHelpfulRev.push(value);
      }
    });
    helpfulRev = helpfulRev.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    nonHelpfulRev = nonHelpfulRev.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    var sortedReviews = [...helpfulRev, ...nonHelpfulRev];

    return sortedReviews;
  }

  var handleSort = (event) => {
    var sortedReviews = [...reviews];
    var sortBy = event.target.value;

    if (sortBy === "helpfulness") {
      sortedReviews = sortedReviews.sort((a, b) => {
        return b.helpfulness - a.helpfulness;
      });
      setReviews(sortedReviews);
    } else if (sortBy === 'newest') {
      sortedReviews = sortedReviews.sort((a, b) => {
        console.log(a)
        return new Date(b.date) - new Date(a.date);
      });
      setReviews(sortedReviews);
    } else if (sortBy === 'relevance') {
      sortedReviews = sortByRelevance(sortedReviews);
      setReviews(sortedReviews);
    }
  };

  return (
    <div className="ratings-main-component" id="ratings">
      <div>RATINGS & REVIEWS</div>
      <div className="ratings-flex-container">
        <RatingsCharts reviews={reviews} metaData={metaData} />
        <div className="ratings-reviews-container">
          <div>
            <Sort reviews={reviews} handleSort={handleSort} />
            <ReviewsList product={props.product.id} reviews={reviews} characteristics={metaData.characteristics}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ratings;
