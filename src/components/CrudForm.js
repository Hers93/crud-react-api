import React, { useEffect, useState } from "react";

const initialForm = {
  name: "",
  constellation: "",
  id: null,
};

const CrudForm = ({createData,updateData, dataToEdit, setDataToEdit} ) => {
  const [form, setForm] = useState(initialForm);
  /*  const [form, setForm] = useState({})
  const [form, setForm] = useState({}) */
  useEffect(()=>{
    if(dataToEdit){
      setForm(dataToEdit);
    }else{
      setForm(initialForm);
    }
  },[dataToEdit])

  const handleChange = (e) => {
    setForm({
        ...form,[e.target.name]:e.target.value,
    })
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!form.name ||!form.constellation){
        alert('Datos incompletos')
        document.getElementById("inputName").focus()
        return;
    }

    if(form.id ===null){
        createData(form)
    }else{
        updateData(form)
    }

    handleReset()
  };
  const handleReset = (e) => {
    setForm(initialForm)
    setDataToEdit(null)
  };
  return (
    <div>
      <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          value={form.name}
          id="inputName"
        />
        <input
          type="text"
          name="constellation"
          placeholder="Constelacion"
          onChange={handleChange}
          value={form.constellation}
        />
        <input type="submit" value="Enviar" />
        <input type="reset" value="Limpiar" onClick={handleReset} />
      </form>
    </div>
  );
};

export default CrudForm;
