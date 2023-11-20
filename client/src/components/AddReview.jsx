import React, { useState, useContext } from "react";
import RestaurantsFinder from "../apis/RestaurantsFinder";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";

function AddReview() {
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");

  const fetchData = async () => {
    try {
      const response = await RestaurantsFinder.get(`${id}`);
      setSelectedRestaurant(response.data.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantsFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-2">
      <form action="">
        <div className="form-row d-flex row my-4">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              id="name"
              placeholder="name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              className="form-select"
              id="rating"
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
              }}
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group my-3">
          <label htmlFor="review" className="">
            Review
          </label>
          <textarea
            id="review"
            className="form-control"
            value={reviewText}
            onChange={(e) => {
              setReviewText(e.target.value);
            }}
          ></textarea>
        </div>
        <button
          onClick={(e) => handleSubmitReview(e)}
          className="btn btn-primary my-3"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddReview;
