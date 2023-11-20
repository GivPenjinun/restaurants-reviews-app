import React, { useContext, useState } from "react";
import { useEffect } from "react";
import RestaurantsFinder from "../apis/RestaurantsFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

function AddRestaurant() {
  const { addRestaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantsFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      //to update state after adding
      addRestaurants(response.data.data.restaurant);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  /*
  useEffect(() => {
    console.log(name);
    console.log(location);
    console.log(priceRange);
  }, [name, location, priceRange]);
*/
  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row d-flex row g-3 align-items-start mx-4 justify-content-center">
          <div className="col">
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col">
            <input
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="location"
            />
          </div>
          <div className="col">
            <select
              className="form-select mr-sm-2"
              value={priceRange}
              onChange={(e) => {
                setPriceRange(e.target.value);
              }}
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            className="btn btn-primary col-auto"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRestaurant;
