import React from "react";

function ToyCard({ toy, handleDeleteToy, handleToyLikes }) {
  const {name, image, likes, id} = toy
  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={() => handleToyLikes(id, likes)}>Like {"<3"}</button>
      <button className="del-btn" onClick={() => handleDeleteToy(id)}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
