import Image from "next/image";
import Link from "next/link";
import HeroImage from "../public/images/hero-bg.png";

export default function Home() {
  return (
    <main className="px-[40px] text-center bg-yellow-400 min-h-screen pt-[100px]">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start max-w-[500px] w-full justify-start">
          <h1 className="text-[32px] font-semibold">
            <span className="font-bold">Find</span> all your favorite <span className="font-bold">Pokemon</span>
          </h1>
          <p className="text-[26px] text-left mt-5">
            You can know the type of Pokemon, its strengths, disadvantages and
            abilities
          </p>
          <Link className="bg-yellow-700 text-white rounded py-2 px-5 mt-5" href="/pokemon">
            See pokemons
          </Link>
        </div>
        <div className="max-w-[793px]">
          <Image className="w-full" src={HeroImage} alt="Images" width={793} height={680} />
        </div>
      </div>
    </main>
  );
}
