import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const[toys, setToys] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/toys")
    .then((resp) => resp.json())
    .then((toys) => setToys(toys))
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddNewToy(toy){
    setToys([toy, ...toys])
  }

  function handleRemoveToy(id){
    const updateToys = toys.filter((toy) => toy.id !== id)
    setToys(updateToys)
  }

  function handleDeleteToy(id){
    fetch('http://localhost:3001/toys/' + id, {
      method: "DELETE"
    })
    .then((resp) => {
      if(resp.status === 200){
        handleRemoveToy(id)
      }
    })
  }

  return (
    <>
      <Header />
      {showForm && <ToyForm handleAddNewToy={handleAddNewToy}/>}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer handleDeleteToy={handleDeleteToy} toys={toys}/>
    </>
  );
}

export default App;
