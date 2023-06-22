import Header from "./components/Header";
import Main from "./components/Main";
import { useState, useEffect } from "react"

function App() {
  const [ request, setRequest ] = useState("1");
  const [contents, setContents] = useState({});
  const [ invalid, setInvalid] = useState(false);
  
  const API_URL=`https://pokeapi.co/api/v2/pokemon/${request}`;

  const formatString = (string) => {
    return (string.charAt(0).toUpperCase() + string.slice(1)).replace('-', ' ');
  } 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const data = await response.json();
        setContents({
          name: formatString(data.name), 
          stats: data.stats,
          types: data.types,
          sprite: data.sprites.front_default
        });
        setInvalid(false);

      } catch(err) {
        console.log("Error collecting data")
        setInvalid(true);
      }
    } 
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
