import Header from "./components/Header";
import Main from "./components/Main";
import { useState, useEffect } from "react"

function App() {
  const [ request, setRequest ] = useState("1");
  const [contents, setContents] = useState({});
  const [ invalid, setInvalid] = useState(false);
  
  const API_URL=`https://pokeapi.co/api/v2/pokemon/${request}`;

  // Format strings
  const formatString = (string) => {
    return (string.charAt(0).toUpperCase() + string.slice(1)).replace('-', ' ');
  } 

  // Fetch new data with changes in requests
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const data = await response.json();
        // Get data for pokemon's name, stats, types, and img sprites
        setContents({
          name: formatString(data.name), 
          stats: data.stats,
          types: data.types,
          sprite: data.sprites.front_default
        });
        // Set as a valid pokemon 
        setInvalid(false);

      } catch(err) {
        // Return error statement and set as invalid pokemon
        console.log("Error collecting data")
        setInvalid(true);
      }
    } 
    // Call to fetch data
    fetchData();
  }, [API_URL]);

  return (
    <div className="App">
      <Header setRequest={setRequest} invalid={invalid}/>
      <Main contents={contents} formatString={formatString}/>
    </div>
  );
}

export default App;
