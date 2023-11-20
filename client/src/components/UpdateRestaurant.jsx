import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantsFinder from "../apis/RestaurantsFinder";

function UpdateRestaurant(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const fetchData = async () => {
    try {
      const response = await RestaurantsFinder.get(`/${id}`);
      setName(response.data.data.name);
      setLocation(response.data.data.location);
      setPriceRange(response.data.data.price_range);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantsFinder.put(`/${id}`, {
        name,
        location,
        price_range: priceRange,
      });
      navigate("/");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <form action="" className="row g-4 mt-5">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="name"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            id="location"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <select
            value={priceRange}
            onChange={(e) => {
              setPriceRange(e.target.value);
            }}
            className="form-select mr-sm-2"
          >
            <option disabled>Price Range</option>
            <option value={1}>$</option>
            <option value={2}>$$</option>
            <option value={3}>$$$</option>
            <option value={4}>$$$$</option>
            <option value={5}>$$$$$</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-primary"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateRestaurant;
