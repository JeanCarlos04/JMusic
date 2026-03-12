import { Nav } from "../Components/Nav";
import { Aside } from "../Components/Aside";
import { Reproductor } from "../Components/Reproductor";
import { useNavigate } from "react-router-dom";
import { PlaylistModal } from "../Components/PlaylistModal";
import { useContextImport } from "../hooks/useContextImport";
import { useState } from "react";

export default function Playlist() {
  const [musicIndex, setMusicIndex] = useState(0);
  const { playlist, eachPlaylist, removePlaylist, getEachPlaylistData } =
    useContextImport();
  const navigate = useNavigate();

  const goToPlaylists = () => {
    if (eachPlaylist) {
      navigate(`/${eachPlaylist.playlist.name}`);
    }
  };

  return (
    <main>
      <Nav setSearchSinger={() => {}} />
      <Aside />
      <section className="xl:ml-[300px] md:ml-[270px] md:mr-[35px] xl:mr-[75px] flex flex-col gap-[35px] h-auto justify-cente mx-[20px] items-start pt-[170px] md:pt-[130px] xl:pt-[130px]">
        <div className="flex gap-[25px] items-end w-full">
          <div className="size-[180px] md:size-[200px] xl:size-[250px] flex bg-white rounded-2xl justify-center items-center">
            <img
              alt="icon of a disc"
              className="xl:size-[170px] md:size-[130px] size-[120px] animate-[spin_6s_linear_infinite]"
              src="/JMusic/icons/discGreen.svg"
            />
          </div>
          <div className="flex flex-col gap-[25px] md:gap-[10px] xl:gap-[10px] mb-[40px]">
            <h2 className="font-semibold text-2xl xl:text-4xl text-[white] text-start xl:text-end">
              Your playlists
            </h2>
            <h3 className="font-semibold text-xl text-[#04f685]">
              {playlist.length} playlists
            </h3>
          </div>
        </div>

        <article
          className={
            `${
              playlist.length === 0
                ? "flex flex-col justify-center items-center"
                : ""
            }` +
            `grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-[30px] mr-[50px] w-full bg-[#252525] p-[50px] py-[20px] rounded-2xl`
          }
        >
          {playlist.length === 0 && (
            <article className="flex flex-col items-center gap-[20px] p-[20px]">
              <img
                alt="icon about not plalist created yet"
                src="/JMusic/icons/NoPlaylist.svg"
                className="w-[120px]"
              />
              <h2 className="text-white font-semibold text-xl text-center">
                You don’t have any playlists yet
              </h2>
            </article>
          )}
          {playlist.map((playlistMusic) => {
            return (
              <div
                className="flex gap-[15px] justify-between"
                key={playlistMusic.id}
              >
                <div className="group flex flex-col gap-3 md:gap-4 break-words xl:max-w-none max-w-[100px] w-[150px] relative">
                  <div>
                    <img
                      alt={`${playlistMusic.playlist.name} " " cover`}
                      onClick={() => {
                        getEachPlaylistData(playlistMusic);
                        goToPlaylists();
                      }}
                      className="xl:size-[150px] size-[100px] rounded-xl group-hover:brightness-90"
                      src={playlistMusic.cover}
                    />
                    <div className="group-hover:opacity-100 duration-200 absolute bottom-[70px] opacity-0 flex w-full">
                      <button className="cursor-pointer w-[30px] h-[30px] flex justify-center items-center absolute left-[10px] bg-[#00a95a] rounded-full">
                        <img
                          alt="Play icon"
                          className="w-[13px] h-auto"
                          src="/JMusic/icons/playWhite.svg"
                        />
                      </button>
                      <button
                        className="cursor-pointer absolute w-[30px] h-[30px] right-[10px] flex justify-center items-center rounded-full bg-[#2c2c2c]"
                        onClick={() => removePlaylist(playlistMusic)}
                      >
                        <img
                          alt="Trash can icon"
                          className="w-[18px]"
                          src="/JMusic/icons/TrashCanWhite.svg"
                        />
                      </button>
                    </div>
                  </div>
                  <h2 className="font-semibold text-base truncate  text-white">
                    {playlistMusic.playlist.name}
                  </h2>
                </div>
              </div>
            );
          })}
        </article>
      </section>
      <PlaylistModal />
      <Reproductor setMusicIndexes={setMusicIndex} musicIndexes={musicIndex} />
    </main>
  );
}
