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

  function handleUpdateNewToy(id, t){
    const oldToys = toys.filter((toy) => id !== toy.id)
    const newToysList = [...oldToys, t].sort((a, b) => a.id - b.id > 0)
    setToys(newToysList)

  }



  function handleToyLikes(id, likes){
    console.log(toys)
    fetch("http://localhost:3001/toys/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        likes: likes + 1,

      })
    })
    .then((resp) => resp.json())
    .then((toy) => handleUpdateNewToy(id, toy))
  }

  return (
    <>
      <Header />
      {showForm && <ToyForm handleAddNewToy={handleAddNewToy}/>}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer handleDeleteToy={handleDeleteToy} toys={toys} handleToyLikes={handleToyLikes}/>
    </>
  );
}

export default App;
