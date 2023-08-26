import React, { useRef, useState } from 'react';
import "./AddMovue.css";

export default function AddMovie() {
  const titleInputValue = useRef("");
  const openingTextValue = useRef("");
  const releaseDateValue = useRef("");
   const [data,setdata]=useState([])

  const buttonHandler = () => {
    const arr=[]
    const movieDetail = {
      title: titleInputValue.current.value,
      opening: openingTextValue.current.value,
      releaseDate: releaseDateValue.current.value,
    };
    console.log(movieDetail);
    fetch("https://movieapp-f46d7-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json", {
      method: "post",
      body: JSON.stringify(movieDetail), 
      headers: {
        "Content-Type": "application/json", 
      },
    }).then((res) => {
      return res.json();
      
    })
    .then((body)=>{
        setdata((prvData)=>[
            ...prvData,{title:body.title,opening:body.opening,releaseDate:body.releaseDate}]
         )
         console.log(data)
         alert("added succefully")
  })
    .catch((err) => {
      console.log(err);
    });

    titleInputValue.current.value = "";
    openingTextValue.current.value = "";
    releaseDateValue.current.value = "";
    console.log(data,"this is data from backend")
    
  }
 

  return (
    <div className="addmovie">
      <label>Title</label>
      <input ref={titleInputValue} />
      <label>Opening Text</label>
      <textarea ref={openingTextValue} />
      <label>Release Date</label>
      <input ref={releaseDateValue} />
      <button className="add" onClick={buttonHandler}>Add Movies</button>
    </div>
  )
}
