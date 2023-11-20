import React from "react";
import { useParams } from "react-router-dom";
import UpdateRestaurant from "../components/UpdateRestaurant";

function UpdatePage() {
  const params = useParams();
  return (
    <div>
      <h1 className="text-center m-5">Update Restaurant</h1>
      <UpdateRestaurant />
    </div>
  );
}

export default UpdatePage;
