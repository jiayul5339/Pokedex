import { useState } from 'react'

const Header = ({setRequest, invalid}) => {
    const [ search, setSearch ] = useState('');

    // Setting search to value in input
    const handleChange = (e) => {
      e.preventDefault();
      setSearch(e.target.value);
    }

    // When submit, send a request for search value and clear search bar
    const handleSubmit = (e) => {
      e.preventDefault();
      setRequest(search);
      setSearch('');
      document.getElementById('searchBar').value = '';
    }

    // Get a random number between 1 and 1010, use as pokemonID
    const getRandom = () => {
      const randomNum = Math.floor(Math.random() * 1010) + 1;
      document.getElementById('searchBar').value = '';
      setRequest(randomNum);
    }

  return (
    <header>
        <img className="logo" src="../images/pokedex.png" alt='Pokedex Logo'/>
        <form onSubmit={handleSubmit}>
          <input id='searchBar' type='search' placeholder='Search for a Pok&#232;mon' 
              onChange={handleChange}
              onSubmit={handleSubmit}
          />
          <div className='pokeball' onClick={handleSubmit}>
            <div className='pokeball__button'></div>
          </div>
        </form>
        <button onClick={getRandom} className='randomBtn'>Random</button>
        {invalid ? <div className='errorMsg'>Not a valid Pok&#232;mon</div> : null}
    </header>
  )
}

export default Header