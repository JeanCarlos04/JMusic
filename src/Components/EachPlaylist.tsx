import { Nav } from "../Components/Nav";
import { Aside } from "../Components/Aside";
import { Reproductor } from "../Components/Reproductor";
import { useState, useEffect } from "react";
import { Albums, LikedMusics } from "../Contexts/MainContext";
import { PlaylistModal } from "./PlaylistModal";
import { BtnPlay_Shuffle } from "./BtnPlay_Shuffle";
import { useContextImport } from "../hooks/useContextImport";

export function EachPlaylist() {
  const { eachPlaylist, removeEachPlaylistMusic, setReproduceMusicArray } =
    useContextImport();

  const [allMusics, setAllMusics] = useState<(Albums | LikedMusics)[]>([]);
  const [playAllMusic, setPlayAllMusic] = useState(false);
  const [restart, setRestart] = useState(true);
  const [randomMusicIndex, setRandomMusicIndex] = useState<number>();
  const [activeRandomMusic, setActiveRandomMusic] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);

  const handleRandomIndex = () => {
    if (allMusics !== undefined && allMusics?.length > 0) {
      const randomIndex = Math.floor(Math.random() * allMusics?.length);
      setRandomMusicIndex(randomIndex);
    }
  };

  const handlePlaylistMusicType = (
    music: Albums | LikedMusics,
  ): music is LikedMusics => {
    return music && "likedMusics" in music;
  };

  useEffect(() => {
    if (eachPlaylist?.playlist.musics) {
      setAllMusics([...eachPlaylist.playlist.musics]);
    } else {
      setAllMusics([]);
    }
  }, [eachPlaylist?.playlist.musics]);

  const handleRestartPlaylist = () => {
    setRestart(!restart);
  };

  return (
    <main>
      <Nav setSearchSinger={() => {}} />
      <Aside />
      <section className="xl:ml-[300px] md:ml-[270px] md:mr-[35px] flex flex-col h-auto justify-cente mx-[20px] items-start pt-[170px] xl:pt-[130px] md:pt-[130px]">
        <BtnPlay_Shuffle
          playlistCover={eachPlaylist?.cover}
          headerValuesPlaylist={eachPlaylist}
          setPlayAllMusic={setPlayAllMusic}
          playAllMusic={playAllMusic}
          setActiveRandomMusic={setActiveRandomMusic}
          activeRandomMusic={activeRandomMusic}
          handleRandomIndex={handleRandomIndex}
          handleRestartPlaylist={handleRestartPlaylist}
        />
        ;
        <article className="flex flex-col gap-[30px] bg-[#252525] xl:px-[50px] md:px-[50px] md:py-[30px] xl:py-[30px] p-[20px] mb-[30px] py-[20px] rounded-2xl w-full">
          {eachPlaylist?.playlist.musics.map((music) => {
            const isLikedMusic = handlePlaylistMusicType(music);
            const id = isLikedMusic ? music.likedMusics.id : music.id;
            const albumCover = isLikedMusic
              ? music.likedMusics.album.cover
              : music.album.cover;
            const title = isLikedMusic ? music.likedMusics.title : music.title;
            const artistName = isLikedMusic
              ? music.likedMusics.artist.name
              : music.artist.name;

            return (
              <div
                className="flex gap-[15px] justify-between items-center"
                key={id}
              >
                <div className="flex gap-5 items-center">
                  <img
                    alt={`${albumCover} cover`}
                    onClick={() =>
                      setReproduceMusicArray(eachPlaylist?.playlist.musics)
                    }
                    className="size-[60px] md:size-[65px] xl:size-[65px] rounded-xl "
                    src={albumCover}
                  />
                  <div>
                    <h2 className="font-semibold text-lg text-white">
                      {title}
                    </h2>

                    <h3 className="text-sm text-[#adadad]"> {artistName}</h3>
                  </div>
                </div>
                <button
                  onClick={() => removeEachPlaylistMusic(music)}
                  className="size-[30px] rounded-full flex justify-end items-center cursor-pointer"
                >
                  <img
                    className="size-[22px]"
                    alt="Cancel icon"
                    src="/JMusic/icons/Cancel.svg"
                  />
                </button>
              </div>
            );
          })}
        </article>
      </section>
      <PlaylistModal />
      <Reproductor
        setMusicIndexes={setMusicIndex}
        musicIndexes={musicIndex}
        activeRandomMusic={activeRandomMusic}
        onClick={handleRandomIndex}
        playAllMusic={playAllMusic}
        allMusics={allMusics}
        randomIndex={randomMusicIndex}
      />
    </main>
  );
}
