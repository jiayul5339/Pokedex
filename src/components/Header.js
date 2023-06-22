import { useState } from 'react'

const Header = ({request, setRequest, invalid, pokemonData}) => {
    const [ search, setSearch ] = useState('');
    const [ selectedItem, setSelectedItem ] = useState(-1);
    const searchBar = document.getElementById('searchBar');
    const body = document.getElementById('body');
    let suggestionSize = 0;
    
    body.addEventListener('click', (e) => {
      setSearch('');
      setSelectedItem(-1);
    })
    
    // Setting search to value in input
    const handleChange = (e) => {
      e.preventDefault();
      setSearch(e.target.value.toLowerCase());
    }

    // Resets search bar
    const reset = () => {
      setSearch('');
      searchBar.value = '';
      setSelectedItem(-1);
    }

    // When submit, send a request for search value and clear search bar
    const handleSubmit = (e) => {
      e.preventDefault();
      setRequest(search.toLowerCase());
      reset();
    }

    // Handles arrow key and enter  suggestions functionality
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' && selectedItem > 0) {
        setSelectedItem(prev => prev - 1);
      }
      else if (e.key === 'ArrowDown' && selectedItem < suggestionSize) {
        setSelectedItem(prev => prev + 1);

      }
      else if (e.key === 'Enter' && selectedItem >= 0) {
        setSearch(document.getElementById(selectedItem).getAttribute('data-value'))
      }
    }

    // Get a random number between 1 and 1010, use as pokemonID
    const getRandom = () => {
      const randomNum = Math.floor(Math.random() * 1010) + 1;
      searchBar.value = '';
      setRequest(randomNum);
    }
  
  return (
    <header>
        <img className="logo" src="../images/pokedex.png" alt='Pokedex Logo'/>
        <form onSubmit={handleSubmit}>

          <input 
              id='searchBar' 
              type='search' 
              placeholder='Search for a Pok&#232;mon' 
              autoComplete='off'
              value={search}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
          />

          <div className='dropdown'>
            {pokemonData?.filter(item => {
              return search && item.name.startsWith(search);
            }).slice(0, 12)
            .map((item, index) => {
              if (index >= suggestionSize) {
                suggestionSize = index;
              }
              return <div key={index} id={index} data-value={item.name} className={selectedItem === index ? 'dropdown-item active': 'dropdown-item'} 
              onClick={() => {
                setRequest(item.name);
                reset();
              }}>
                {item.name}
              </div>})}
          </div>

          <div className='pokeball' onClick={handleSubmit}>
            <div className='pokeball__button'></div>
          </div>

        </form>
        <button onClick={getRandom} className='randomBtn'>Random</button>
        {invalid ? <div className='errorMsg'><b>{request}</b> is not a valid Pok&#232;mon</div> : null}
    </header>
  )
}

export default Header