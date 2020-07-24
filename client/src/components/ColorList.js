import React, { useState } from "react";
import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, fetchColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  // const addColor = e => {
  //   e.preventDefault();

  //   const newID = colors[colors.length-1].id+1
  //   setColorToEdit({
  //     ...colorToEdit,
  //     id: newID
  //   })
  //   axiosWithAuth().post('/api/colors', colorToEdit)
  //     .then(res => {
  //       setEditing(false)
  //       updateColors(res.data)
  //       console.log(res)
  //     })
  //     .catch(err => console.log(err))
  // };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        setEditing(false)
        let newColors = colors.map(color => {
          if (color.id === colorToEdit.id) {
            return colorToEdit
          }
          return color
        })
        updateColors(newColors)
        // updateColors(res.data)
        // deleteColor(colorToEdit)
        console.log(res)
      })
      .catch(err => console.log(err))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`/api/colors/${color.id}`)
      .then(res => fetchColors())
      .catch(err => console.error(err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            {/* <button onChange={addColor}>add as new color</button> */}
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
