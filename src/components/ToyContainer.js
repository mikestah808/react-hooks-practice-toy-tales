import React from "react";
import { render } from "react-dom";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, handleDeleteToy, handleToyLikes }) {
  const renderToys = toys.map((toy) => {
    return <ToyCard key={toy.id} id={toy.id} toy={toy} handleDeleteToy={handleDeleteToy} handleToyLikes={handleToyLikes}/>
  })

  return (
    <div id="toy-collection">{renderToys}</div>
  );
}

export default ToyContainer;
