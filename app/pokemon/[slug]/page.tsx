"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonStats {
  health: number;
  attack: number;
  defense: number;
  speed: number;
}

interface PokemonInfo {
  height: number;
  weight: number;
  experience: number;
}

interface PokemonData {
  id: number;
  name: string;
  image: string;
  type: PokemonType[];
  abilities: string;
  info: PokemonInfo;
  stats: PokemonStats;
}

interface PokemonInfoDetail {
  id?: number;
  flavor_text: string;
}

interface PokemonAbilities {
  ability: {
    name: string;
  };
}

const SinglePage = () => {
  const router = useRouter();
  const { slug } = useParams();
  const [singlePokemon, setSinglePokemon] = useState<PokemonData | null>(null);
  const [pokemonInfo, setPokemonInfo] = useState<Array<PokemonInfoDetail>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const [pokemonResponse, speciesResponse] = await Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`),
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${slug}`),
        ]);
        const pokemonData = await pokemonResponse.json();
        const speciesData = await speciesResponse.json();

        const pokemon: PokemonData = {
          id: pokemonData.id,
          name: pokemonData.name,
          image: pokemonData.sprites.other["official-artwork"].front_default,
          type: pokemonData.types,
          abilities: pokemonData.abilities
            .map((ability: PokemonAbilities) => ability?.ability?.name)
            .join(" - "),
          info: {
            height: pokemonData.height,
            weight: pokemonData.weight,
            experience: pokemonData.base_experience,
          },
          stats: {
            health: pokemonData.stats[0]?.base_stat || 0,
            attack: pokemonData.stats[1]?.base_stat || 0,
            defense: pokemonData.stats[2]?.base_stat || 0,
            speed: pokemonData.stats[5]?.base_stat || 0,
          },
        };

        const details = speciesData.flavor_text_entries
          .slice(0, 10)
          .map((entry: PokemonInfoDetail, index: number) => ({
            id: index + 1,
            flavor_text: entry.flavor_text,
          }));

        setSinglePokemon(pokemon);
        setPokemonInfo(details);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonData();
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!singlePokemon) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>No Pokemon found!</p>
      </div>
    );
  }

  return (
    <div className="py-[20px] pt-[100px] px-10">
      <div>
        <span
          onClick={() => router.back()}
          className="cursor-pointer py-[10px] block"
        >
          Back to main
        </span>
        <h1 className="text-3xl font-bold capitalize mb-4">
          {singlePokemon.name}
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="max-w-[600px]">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          {pokemonInfo.map((item: PokemonInfoDetail) => {
            return (
              <div key={item.id} className="mb-4">
                <p className="text-sm">{item.flavor_text}</p>
              </div>
            );
          })}
        </div>
        <div>
          <Image
            src={singlePokemon.image}
            alt={singlePokemon.name}
            className="h-[400px] object-cover"
            width={400}
            height={400}
            priority
          />
        </div>
        <div>
          <h2 className="text-2xl mb-2">Details</h2>
          <p>
            <strong>Abilities:</strong> {singlePokemon.abilities}
          </p>
          <p>
            <strong>Height:</strong> {singlePokemon.info.height} decimetres
          </p>
          <p>
            <strong>Weight:</strong> {singlePokemon.info.weight} hectograms
          </p>
          <p>
            <strong>Base Experience:</strong> {singlePokemon.info.experience}
          </p>

          <h2 className="text-2xl mt-4 mb-2">Stats</h2>
          <ul>
            <li>
              <strong>Health:</strong> {singlePokemon.stats.health}
            </li>
            <li>
              <strong>Attack:</strong> {singlePokemon.stats.attack}
            </li>
            <li>
              <strong>Defense:</strong> {singlePokemon.stats.defense}
            </li>
            <li>
              <strong>Speed:</strong> {singlePokemon.stats.speed}
            </li>
          </ul>
        </div>
        {/* <div>
            {
                singlePokemon.moves.map((move, index) => (
                    <div key={index} className="bg-gray-200 p-4 rounded mb-4"></div>
                ))
            }
        </div> */}
      </div>
    </div>
  );
};

export default SinglePage;
