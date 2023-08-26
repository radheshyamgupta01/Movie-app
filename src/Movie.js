import React, { useEffect, useState } from 'react';
import "./Movie.css";

export default function Movie(props) {
    const [items, setItems] = useState([]); // Use an array for storing items

    useEffect(() => {
        fetch(`https://movieapp-f46d7-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json`)
            .then((res) => res.json())
            .then((body) => {
                const formattedItems = [];
                for (let key in body) {
                    const obj = {
                        title: body[key].title,
                        opening: body[key].opening,
                        releaseDate: body[key].releaseDate,
                        id: key
                    };
                    formattedItems.push(obj); 
                }
                setItems(formattedItems); 
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [items]);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`https://movieapp-f46d7-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${id}.json`, {
                method: "DELETE"
            });
            if (!res.ok) {
                throw new Error("Failed to delete");
            } else {
                alert("Item deleted");
                const updatedItems = items.filter(item => item.id !== id);
                setItems(updatedItems);
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <div className="movie">
            <div className="movieDiv">
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            <h2>{item.title}</h2>
                            <p>{item.opening}</p>
                            <p>{item.releaseDate}</p>
                            <button onClick={() => handleDelete(item.id)}>DELETE</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
