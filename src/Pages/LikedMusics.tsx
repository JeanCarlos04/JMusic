import { Nav } from "../Components/Nav";
import { Aside } from "../Components/Aside";
import { MoreButton } from "../Components/MoreButton";
import { useState } from "react";
import { Reproductor } from "../Components/Reproductor";
import type { LikedMusics } from "../Contexts/MainContext";
import { AddedMusicModal } from "../Components/AddedMusicModal";
import { useContextImport } from "../hooks/useContextImport";
import { BtnPlay_Shuffle } from "../Components/BtnPlay_Shuffle";

export default function LikedMusics() {
  const { likedMusics, removeLikedMusics, setReproduceMusicArray } =
    useContextImport();

  const [playAllMusic, setPlayAllMusic] = useState(false);
  const [randomMusicIndex, setRandomMusicIndex] = useState<number>();
  const [activeRandomMusic, setActiveRandomMusic] = useState(false);
  const [getSelectedMusic, setGetSelectedMusic] = useState<LikedMusics | null>(
    null
  );
  const [hoveredMusic, setHoveredMusic] = useState(false);
  const [hoveredMusicId, setHoveredMusicId] = useState<number | null>(null);
  const handleRandomIndex = () => {
    if (likedMusics !== undefined && likedMusics?.length > 0) {
      const randomIndex = Math.floor(Math.random() * likedMusics?.length);
      setRandomMusicIndex(randomIndex);
    }
  };
  const [musicIndex, setMusicIndex] = useState(0);

  return (
    <main className="w-full h-full z-[500]">
      <Nav setSearchSinger={() => {}} />
      <Aside />

      <section className="xl:ml-[300px] md:ml-[270px] md:mr-[35px] xl:mr-[75px] flex flex-col gap-[35px] h-auto justify-cente mx-[20px] items-start pt-[170px] xl:pt-[130px] md:pt-[130px] ">
        <BtnPlay_Shuffle
          headerValuesLikedMusics={likedMusics}
          setPlayAllMusic={setPlayAllMusic}
          playAllMusic={playAllMusic}
          setActiveRandomMusic={setActiveRandomMusic}
          activeRandomMusic={activeRandomMusic}
          handleRandomIndex={handleRandomIndex}
        />

        <article className="flex flex-col gap-[30px] bg-[#252525] md:px-[50px] xl:px-[50px] md:py-[30px] xl:py-[30px] p-[20px] mb-[30px] py-[20px] rounded-2xl w-full">
          {likedMusics.length === 0 && (
            <article className="flex flex-col items-center gap-[20px] p-[20px]">
              <img
                alt="icon about not liked musics yet"
                src="/icons/heartCrackGreen.svg"
                className="w-[120px]"
              />
              <h2 className="text-xl text-white font-semibold">
                No liked musics yet{" "}
              </h2>
            </article>
          )}
          {likedMusics.map((music) => {
            return (
              <div
                className="flex gap-[15px] justify-between"
                key={music.likedMusics.id}
              >
                <div className="flex gap-5 items-center">
                  <button
                    onClick={(e) => {
                      removeLikedMusics(music);
                      e.stopPropagation();
                    }}
                  >
                    <img
                      onMouseEnter={() => {
                        setHoveredMusicId(music.likedMusics.id);
                        setHoveredMusic(true);
                      }}
                      onMouseLeave={() => setHoveredMusic(false)}
                      className="w-[25px] min-w-[25px] hover:scale-[115%] duration-300"
                      alt="Liked music icon"
                      src={
                        hoveredMusic && hoveredMusicId === music.likedMusics.id
                          ? "/icons/heartCrackWhite.svg"
                          : "/icons/heartAddGreen.svg"
                      }
                    />
                  </button>
                  <img
                    onClick={() => {
                      setReproduceMusicArray(likedMusics);
                      setPlayAllMusic(false);
                    }}
                    className="size-[60px] md:size-[65px] xl:size-[65px] rounded-xl"
                    src={music.likedMusics.album.cover}
                  />
                  <div>
                    <h2 className="font-semibold text-lg text-white">
                      {music.likedMusics.title}
                    </h2>

                    <h3 className="text-sm text-[#adadad]">
                      {" "}
                      {music.likedMusics.artist.name}
                    </h3>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setGetSelectedMusic(music);
                  }}
                  className="flex items-center"
                >
                  <MoreButton
                    musicCover={
                      getSelectedMusic !== null
                        ? getSelectedMusic.likedMusics.album.cover
                        : ""
                    }
                    musicValues={getSelectedMusic}
                  />
                </div>
              </div>
            );
          })}
        </article>
      </section>
      <AddedMusicModal />
      <Reproductor
        setMusicIndexes={setMusicIndex}
        musicIndexes={musicIndex}
        activeRandomMusic={activeRandomMusic}
        onClick={handleRandomIndex}
        randomIndex={randomMusicIndex}
        playAllMusic={playAllMusic}
        allLikedMusic={likedMusics}
      />
    </main>
  );
}
