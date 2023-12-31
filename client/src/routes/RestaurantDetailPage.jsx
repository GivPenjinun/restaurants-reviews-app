import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantsFinder from "../apis/RestaurantsFinder";
import { useEffect } from "react";
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

function RestaurantDetailPage() {
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await RestaurantsFinder.get(`${id}`);
      setSelectedRestaurant(response.data.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderRating = (restaurant) => {
    return (
      <>
        <div className="d-flex col justify-content-center">
          <StarRating rating={restaurant.average_rating} />
          <span className="text-warning">
            {restaurant.count ? `(${restaurant.count})` : "(0)"}
          </span>
        </div>
      </>
    );
  };

  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1">
            {selectedRestaurant.restaurant.name}
          </h1>
          <div className="text-center">
            {renderRating(selectedRestaurant.restaurant)}
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
}

export default RestaurantDetailPage;
