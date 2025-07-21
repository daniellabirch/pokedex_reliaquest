import React, { useState } from 'react';
import { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon, PokemonOption, useGetPokemons } from '../../hooks/useGetPokemons';
import { useGetPokemon } from '../../hooks/useGetPokemon';
import Dialog from '@mui/material/Dialog';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [query, setQuery] = React.useState('');
  const [list, setList] = React.useState<Array<Pokemon>>(pokemons);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = event.target.value;
      setQuery(newQuery);
      const filteredPokemon = pokemons.filter((el) => el.name.toLowerCase().includes(newQuery.toLowerCase()));
      setList(filteredPokemon);
  };
  useEffect(() => {
    setList(pokemons);
  }, [pokemons]);

  const location = useLocation();
  const [open, setOpen] = React.useState<boolean>(false);
  const [id, setId] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [dialogText, setDialogText] = React.useState<string>("some initial text about a pokemon");
  const { pokemon } = useGetPokemon(id, name);
  const navigate = useNavigate();
  const openModal = (id: string, name: string) => {
    setOpen(true);
    setId(id);
    setName(name);
  }
  const closeModal = () => {
    setOpen(false);
    navigate('/pokemon');
  }
  useEffect(() => {
    setDialogText(`hi my name is ${pokemon.name} and my flee rate is ${pokemon.fleeRate}`);
  }, [id, name, pokemon]);
  
  return (
    <div className={classes.root}>  
      <input
        className='search'
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />
      {loading && <div>Loading...</div>}
        {list.map((pkmn) => (
          <div key={pkmn.id}>
            <h2>{pkmn.number} - {pkmn.name}</h2>
            <Link to="pokemon" state={{ background: location }} onClick={(event) => openModal(pkmn.id, pkmn.name)}>
              <img className='image' src={pkmn.image}></img>
            </Link>
            <h3>Type:</h3>
            <ul>
              {pkmn.types.map((type)=>(
                <li>{type}</li>
              ))}
            </ul>
          </div>
        ))}
      <Dialog
        open={open}
      >
        <button className={classes.button} onClick={closeModal}>x close</button>
        {dialogText}
      </Dialog>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
      '& input':{
        color: '#000',
      },
      '& div p':{
        color: '#000',
      },
      '& div img':{
        '&:hover': {
          border: 'red solid 5px',
          cursor: 'pointer',
        },
      },
    },
    button: {
      color: '#000',
      textAlign: 'left',
      '&:hover': {
        borderBottom: 'black solid 2px',
        cursor: 'pointer',
      },
    }
  },
  { name: 'PokemonList' }
);