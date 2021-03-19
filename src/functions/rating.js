import React from 'react';
import StarRating from 'react-star-ratings';

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;

    let length = ratingsArray.length;

    let init = 0;
    ratingsArray.map((r) => (init += r.star));
    let result = init / length;

    // let total = [];
    // ratingsArray.map((r) => total.push(r.star));
    // let totalReduced = total.reduce((p, n) => p + n, 0);
    // let highest = length * 5;
    // let result = (totalReduced * 5) / highest;

    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRating
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="red"
            rating={result}
            editing={false}
          />
          ({p.ratings.length})
        </span>
      </div>
    );
  }
};
