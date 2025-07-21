import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type Pokemon = {
  id: string;
  name: string;
  number: number;
  types: string[];
  fleeRate: string;
  image: string;
};

export const GET_POKEMON = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      name
      number
      types
      fleeRate
      image
    }
  }
`;

export const useGetPokemon = (id: string, name: string) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON, {
    variables: {
      id: id,
      name: name,
    },
  });

  const pokemon: Pokemon = useMemo(() => data?.pokemon || {}, data);

  return {
    pokemon,
    ...queryRes,
  };
};
