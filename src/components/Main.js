import Stats from "./Stats"
import Type from "./Type"
const Main = ( {contents, formatString} ) => {
  return (
    <main>
        <img className='pokemonImg' src={contents.sprite} alt='Pokemon Sprite'/> 

        <div className="name">
          <h1 className="pokemonName">{contents.name}</h1>
          <div className="types">
            {contents.types?.map((type) => {
              return <Type type={type} />
            })}
          </div>
        </div>

        {contents.stats?.map((data) => {
          return <Stats stats={data} formatString={formatString}/>
        })}
    </main>
  )
}

export default Main