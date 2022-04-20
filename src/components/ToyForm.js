import React, { useState } from "react";

const initialState = {
  name: "",
  image: ""
}

function ToyForm({ handleAddNewToy }) {
  const [formData, setFormData] = useState(initialState)


  function handleChange(event){
    setFormData({
      ...formData,
      [event.target.name] : event.target.value
    })
  }

  function handleSubmit(event){
    event.preventDefault()

    const newToy= {
      ...formData,
      likes: 0,
    }

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(newToy)
    })
    .then((resp) => resp.json())
    .then((toy) => handleAddNewToy(toy))
    
    setFormData(initialState)
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          onChange={handleChange}
          value={formData.name}
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          onChange={handleChange}
          value={formData.image}
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
