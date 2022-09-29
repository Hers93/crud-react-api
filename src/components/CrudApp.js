import { isValidDateValue } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import CrudForm from "./CrudForm";
import { CrudTable } from "./CrudTable";

const initialDb = [
  {
    id: 1,
    name: "Seiya",
    constellation: "Pegaso",
  },
  {
    id: 2,
    name: "Shiryu",
    constellation: "Dragon",
  },
  {
    id: 3,
    name: "Hyoga",
    constellation: "Cisne",
  },
  {
    id: 4,
    name: "Shun",
    constellation: "Andromeda",
  },
  {
    id: 5,
    name: "Ikki",
    constellation: "Fenix",
  },
];

const CrudApp = () => {
  const [db, setDb] = useState(initialDb);
  const [dataToEdit, setDataToEdit] = useState(null);

  const createData = (data) => {
    data.id = Date.now();
    setDb([...db, data]);
  };

  const updateData = (data) => {
    let newData = db.map((value) => (value.id === data.id ? data : value));
    setDb(newData);
  };
  const deleteData = (id) => {
    let isDelete = window.confirm(
      `esta seguro de eliminar el registro con el id '${id}'`
    );

    if (isDelete) {
      let newData = db.filter((value) => value.id !== id);
      console.log(newData);
      setDb(newData);
    } else {
      return;
    }
  };

  return (
    <div>
      <h2>Crud App</h2>
      <article className="grid-1-2">
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />

        <CrudTable
          data={db}
          deleteData={deleteData}
          setDataToEdit={setDataToEdit}
        />
      </article>
    </div>
  );
};

export default CrudApp;
