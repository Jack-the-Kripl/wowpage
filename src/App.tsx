import React, { useRef, useState } from "react";
import './App.css';
import { api_namespace, create_api_url, paths } from "./api";
import { generate_token } from "./api_authorize";

function App() {
  const [items, setItems] = useState([]);
  const inputVal = useRef("");
  function handleChange(e: any) {
    inputVal.current = e.target.value;
  };

  function handleClick() {
    doSearch();
  }

  function doSearch() {
    generate_token().then(token => {
      fetch(create_api_url("search_item") + `?name.en_US=${inputVal.current}&_page=1`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Battlenet-Namespace': api_namespace
        }
      }).then(response => response.json()).then(data => setItems(data.results)).catch(console.log);
      
    })
  }

  return (
    <div className="App">
      <input type="text" onChange={handleChange}></input>
      <button onClick={handleClick}>Search</button>

      <div>
        {
          items.map((item: any) => <p key={"item_" + item.data.id}>{item.data.name.en_US}</p>)
        }
      </div>
    </div>
  );
}

export default App;
