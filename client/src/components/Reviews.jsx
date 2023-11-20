import React from "react";
import StarRating from "./StarRating";

export default function Reviews({ reviews }) {
  return (
    <div className="row row-cols-3 mb-2">
      {reviews &&
        reviews.map((review) => {
          return (
            <div
              key={review.id}
              class="card text-bg-primary mb-3 mx-3"
              style={{ maxWidth: "30%" }}
            >
              <div class="card-header d-flex justify-content-between">
                <span>{review.name}</span>
                <span>
                  <StarRating rating={review.rating} />
                </span>
              </div>
              <div class="card-body">
                <p class="card-text">{review.review}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
