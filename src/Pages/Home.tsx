import { Nav } from "../Components/Nav";
import { Aside } from "../Components/Aside";
import { Reproductor } from "../Components/Reproductor";
import { useState } from "react";
import { Albums } from "../Contexts/MainContext";
import { MoreButton } from "../Components/MoreButton";
import { AddedMusicModal } from "../Components/AddedMusicModal";
import { useContextImport } from "../hooks/useContextImport";

export default function Home() {
  const {
    setSearchSinger,
    searchSinger,
    albums,
    saveLikedMusics,
    setReproduceMusicArray,
  } = useContextImport();

  const [getSelectedMusic, setGetSelectedMusic] = useState<Albums | null>(null);
  const [musicIndex, setMusicIndex] = useState(0);

  return (
    <main className="w-full h-full z-[500]">
      <Nav setSearchSinger={setSearchSinger} />
      <Aside />
      <section className="xl:ml-[300px] md:ml-[270px] md:mr-[35px] md:pt-[130px] xl:pt-[130px]  xl:mr-[75px] flex flex-col gap-[35px] h-auto justify-cente mx-[20px] items-start pt-[170px]">
        <h2 className="xl:text-[25px] text-[20px] text-white font-bold max-w-full break-words">
          {searchSinger === undefined
            ? "Search your favorite musics"
            : "Founded for " + `"${searchSinger}"`}
        </h2>
        <div className="flex flex-col gap-[35px] bg-[#252525] md:px-[30px] md:py-[30px] xl:px-[50px] xl:py-[30px] p-[20px] mb-[30px] py-[20px] rounded-2xl w-full">
          {searchSinger === undefined && (
            <article className="flex flex-col items-center gap-[40px] p-[20px]">
              <img
                loading="lazy"
                alt="Search your musics icon"
                src="/icons/musicNotFounded.svg"
                className="size-[150px] md:size-[200px] xl:size-[200px]"
              />
            </article>
          )}
          {searchSinger !== "" ? (
            albums.map((items, index) => {
              return (
                <article key={items.id} className="flex flex-col">
                  <div className="flex xl:gap-[20px] md:gap-[20px] items-center justify-between">
                    <div className="flex xl:gap-5 md:gap-5 gap-4 items-center">
                      <div className="flex gap-4 items-center h-[25px]">
                        <button
                          className="flex items-center"
                          onClick={() => saveLikedMusics(items)}
                        >
                          <img
                            className="size-[25px] min-w-[25px] cursor-pointer hover:scale-[115%] duration-300"
                            alt="Liked music icon"
                            src={
                              items.liked
                                ? "/icons/heartAddGreen.svg"
                                : "/icons/heartAddWhite.svg"
                            }
                          />
                        </button>

                        <img
                          onClick={() => {
                            {
                              setMusicIndex(index);
                              setReproduceMusicArray(albums);
                            }
                          }}
                          alt={items.title + " Cover"}
                          className="size-[60px] rounded-xl"
                          src={items.album.cover}
                        />
                      </div>
                      <div className="flex flex-col gap-[6px]">
                        <h2
                          className="font-medium
                        text-white xl:text-lg xl:w-auto w-[150px] md:text-lg md:w-auto"
                        >
                          {items.title}
                        </h2>
                        <h3 className="text-sm text-[#adadad]">
                          {items.artist.name}
                        </h3>
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        setGetSelectedMusic(items);
                      }}
                    >
                      <MoreButton
                        musicCover={
                          getSelectedMusic ? getSelectedMusic?.album.cover : ""
                        }
                        musicValues={getSelectedMusic}
                      />
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <article className="flex flex-col items-center gap-[40px] p-[20px]">
              <img
                className="size-[150px] md:size-[200px] xl:size-[200px]"
                src="/icons/music-slash.svg"
              />
              <h2 className="font-bold text-xl text-white tracking-wider">
                Music not found :(
              </h2>
            </article>
          )}
        </div>
      </section>
      <AddedMusicModal />
      <Reproductor setMusicIndexes={setMusicIndex} musicIndexes={musicIndex} />
    </main>
  );
}
