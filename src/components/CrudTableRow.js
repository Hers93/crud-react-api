import React from "react";

export const CrudTableRow = ({value, setDataToEdit, deleteData}) => {
  let {name, constellation, id} = value
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{constellation}</td>
        <td>
          <button onClick = {() =>setDataToEdit(value)}>Editar</button>
          <button onClick = {() =>deleteData(id)}>Eliminar</button>
        </td>
      </tr>
    </>
  );
};
