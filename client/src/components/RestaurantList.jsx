import Reactm, { useContext, useEffect } from "react";
import RestaurantsFinder from "../apis/RestaurantsFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useNavigate } from "react-router-dom";

function RestaurantList(props) {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await RestaurantsFinder.get("/");
      setRestaurants(response.data.data.restaurants);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await RestaurantsFinder.delete(`/${id}`);
      //to update state after deleting
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/restaurants/${id}/update`);
  };

  const handleSelect = (id) => {
    navigate(`/restaurants/${id}`);
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Rating</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr
                  key={restaurant.id}
                  onClick={() => handleSelect(restaurant.id)}
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>Rating</td>
                  <td>
                    <button
                      onClick={() => handleUpdate(restaurant.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(restaurant.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default RestaurantList;
