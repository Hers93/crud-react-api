import { isValidDateValue } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import CrudForm from "./CrudForm";
import { CrudTable } from "./CrudTable";
import {helpHttp} from "../helpers/helpHttp";
import Loader from "./Loader";
import Message from "./Message";



const CrudApi = () => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoanding] = useState(false)

  let api = helpHttp();
  let url = "http://localhost:5000/santos";

  useEffect(()=>{
    setLoanding(true)
    setTimeout (() => {
      api.get(url).then(res => {
        if(!res.err){
          setDb(res);
          setError(null)
        }else{
          alert(res.status)
          setDb(null)
          setError(res)
        }
        setLoanding(false)
      })
    },300)
    
    
  },[])

 

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
      <h2>Crud Api</h2>
      <article className="grid-1-2">
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        {loading &&<Loader/>}
        {error && <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545"/>}
        {db && <CrudTable
          data={db}
          deleteData={deleteData}
          setDataToEdit={setDataToEdit}
        />}
        
        
        
      </article>
    </div>
  );
};

export default CrudApi;