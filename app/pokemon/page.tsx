"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface PokemonData {
  id: number;
  name: string;
  image: string;
}

const Pokemon = () => {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const promises = [];

        for (let i = 1; i <= 24; i++) {
          const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
          promises.push(fetch(url).then((res) => res.json()));
        }
        Promise.all(promises).then((results) => {
          const pokemon = results.map((result) => ({
            id: result.id,
            name: result.name,
            image: result.sprites.other["official-artwork"].front_default,
          }));
          setPokemons(pokemon);
        });
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-[40px] py-[20px] mt-[100px]">
      <h1 className="text-[32px]">Pokemons</h1>
      <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-between lg:gap-10 sm:gap-5 gap-0 mt-5">
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <Link
              href={`/pokemon/${pokemon.name.toLowerCase()}`}
              className="w-full flex flex-col justify-center items-center shadow hover:shadow-md cursor-pointer hover:bg-gray-100"
            >
              <Image
                src={pokemon.image}
                width={200}
                height={200}
                alt={pokemon.name}
                className="object-cover"
              />
              <p className="py-5 capitalize">{pokemon.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pokemon;
