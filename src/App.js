import Header from "./components/Header";
import Main from "./components/Main";
import { useState, useEffect } from "react"

function App() {
  const [ request, setRequest ] = useState("1");
  const [contents, setContents] = useState({});
  const [ invalid, setInvalid] = useState(false);
  const [ pokemonData, setPokemonData ] = useState([])
  
  const API_URL='https://pokeapi.co/api/v2/pokemon';

  // Format strings
  const formatString = (string) => {
    return (string.charAt(0).toUpperCase() + string.slice(1)).replace('-', ' ');
  } 

  // Fetch new data with changes in requests
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/${request}`);
        if (!response.ok) throw Error("Did not receive expected data");
        const data = await response.json();
        // Get data for pokemon's name, stats, types, and img sprites
        setContents({
          id: data.id,
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
  }, [API_URL, request]);

  // Fetch data of pokemon names
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}?limit=100000&offset=0`);
        if (!response.ok) throw Error("Did not receive expected data");
        const data = await response.json();

        // Set the data in state array
        setPokemonData(data.results);
    
      } catch(err) {
        console.log("Error collecting data")
      }
    } 
    // Call to fetch data
    fetchData();
  }, []);

  return (
    <div className="App">
      <Header request={request} setRequest={setRequest} invalid={invalid} pokemonData={pokemonData} />
      <Main contents={contents} formatString={formatString}/>
    </div>
  );
}

export default App;
