import Stats from "./Stats"
import Type from "./Type"
const Main = ( {contents, formatString} ) => {
  return (
    <main>
        <img className='pokemonImg' src={contents.sprite} alt='Pokemon Sprite'/> 

        <div className="name">
          <h1 className="pokemonName">{contents.name}</h1>
          <div className="types">
            {contents.types?.map((type, index) => {
              return <Type key={index} type={type} />
            })}
          </div>
        </div>

        {contents.stats?.map((data, index) => {
          return <Stats key={index} stats={data} formatString={formatString}/>
        })}
    </main>
  )
}

export default Main