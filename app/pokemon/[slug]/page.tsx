"use client";
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
  description: string;
}

const SinglePage = () => {
  const router = useRouter();
  const { slug } = useParams();
  const [singlePokemon, setSinglePokemon] = useState<PokemonData | null>(null);
  const [pokemonInfo, setPokemonInfo] = useState<Array<PokemonInfoDetail>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/${slug}`;
        const response = await fetch(url);
        const data = await response.json();

        const pokemon: PokemonData = {
          id: data.id,
          name: data.name,
          image: data.sprites.other["official-artwork"].front_default,
          type: data.types,
          abilities: data.abilities
            .map((ability: any) => ability.ability.name)
            .join(" - "),
          info: {
            height: data.height,
            weight: data.weight,
            experience: data.base_experience,
          },
          stats: {
            health: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
          },
        };

        setSinglePokemon(pokemon);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        setLoading(false);
      }
    }
    async function fetchInfo() {
      try {
        const details = [];
        const url = `https://pokeapi.co/api/v2/pokemon-species/${slug}`;
        const response = await fetch(url);
        const data = await response.json();
        for (let i = 1; i <= 10; i++) {
          const info: PokemonInfoDetail = {
            description: data.flavor_text_entries[i].flavor_text,
          };
          details.push({
            ...info,
            id: i,
          });
        }
        setPokemonInfo(details);
      } catch (error) {
        console.error("Error fetching info:", error);
      } finally {
        // setLoading(false);
      }
    }

    fetchPokemon();
    fetchInfo();
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!singlePokemon) {
    return <p>Pokémon not found!</p>;
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
                <p className="text-sm">{item.description.replace("", " ")}</p>
              </div>
            );
          })}
        </div>
        <div>
          <img
            src={singlePokemon.image}
            alt={singlePokemon.name}
            className="h-[400px] object-cover"
            width={400}
            height={400}
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
