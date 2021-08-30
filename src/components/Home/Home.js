import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios';
function Home() {
    const [pokedex,setpokedex]=useState([])
    const [q,setq]=useState("")
    useEffect(() => {
        const fetchData = async ()=>{
            try {
              let data=[]
              for (let i = 1; i <= 150; i++) {
                const res = await axios.get('https://pokeapi.co/api/v2/pokemon/' + i);
                data.push(res.data)
            }
              setpokedex(data); 
            }
            catch(err){
    
            }
        }
    
        fetchData();
    }, [pokedex])
    function search(data){
        return data.filter((pokemon)=>pokemon.name.toLowerCase().indexOf(q)>-1);
    }
    return (
        <div className="container-fluid">

          <h2>PokeBook</h2>
          <div>
              <input type="text" value={q} onChange={(e)=>setq(e.target.value)} placeholder="Search your pokemon"/>
          </div>
          <div className=" row">
            {search(pokedex).map(pokemon => (
                <div className="card col-lg-2 col-md-4 col-sm-3"  key={pokemon.id}>
                <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"} className="sprite" alt={pokemon.name} />
              
                <div className="card-body">
                    <h3 className="pokemon-name">{pokemon.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
    )
}

export default Home
