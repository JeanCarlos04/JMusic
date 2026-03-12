import { useState, useEffect } from "react";
import { Albums } from "../Contexts/MainContext";
import { LikedMusics } from "../Contexts/MainContext";
import { PlaylistModal } from "./PlaylistModal";
import { useContextImport } from "../hooks/useContextImport";

type PopOverMoreProps = {
  musicValues: Albums | LikedMusics | null;
  musicCover: string;
};

export function MoreButton({ musicValues, musicCover }: PopOverMoreProps) {
  const { savePlaylist, playlist, addMusicToPlaylist, getEachPlaylistData } =
    useContextImport();
  const [selectedMusic, setSelectedMusic] = useState(false);
  const [openPlaylists, setOpenPlaylists] = useState(false);
  const [playlistAlias, setPlaylistAlias] = useState("");
  const [internalCover, setInternalCover] = useState<string>(musicCover);

  useEffect(() => {
    if (!internalCover && musicCover) {
      setInternalCover(musicCover);
    }
  }, [internalCover, musicCover]);

  const isMusicAlbumType = (
    musicValue: Albums | LikedMusics,
  ): musicValue is Albums => {
    return musicValue && "liked" in musicValue;
  };

  const currentMusicType = isMusicAlbumType(musicValues!)
    ? musicValues
    : musicValues;

  return (
    <>
      <button
        onClick={() => {
          setOpenPlaylists(!openPlaylists);
          setSelectedMusic(!selectedMusic);
        }}
        className="text-[#a3a3a3] h-[20px] text-4xl cursor-pointer"
      >
        <img
          alt="Ellipsis icon"
          className="w-[20px]"
          src="/JMusic/icons/ellipsis.svg"
        />
      </button>

      {openPlaylists === true ? (
        <section
          onClick={(e) => {
            setOpenPlaylists(!openPlaylists);
            e.stopPropagation();
          }}
          className="w-screen h-screen rounded-xl  fixed top-0 left-0 backdrop-brightness-60"
        >
          <article
            onClick={(e) => e.stopPropagation()}
            className="xl:w-[450px] w-[350px] rounded-xl h-[400px] bg-[#2c2c2c] gap-[30px] p-[30px] fixed flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto"
          >
            <h1 className=" text-white font-medium text-center text-lg">
              Add your favorite music to your playlists
            </h1>
            <form
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-[20px] xl:gap-[15px] xl:flex-row flex-col"
            >
              <input
                required
                maxLength={50}
                onChange={(e) => setPlaylistAlias(e.target.value)}
                className="bg-white text-sm xl:w-[250px] w-full outline-0 h-[34px] rounded-md pl-[17px] placeholder:text-[#848484]"
                placeholder="Name of your playlist"
              />
              <button
                onClick={() => {
                  {
                    savePlaylist(
                      playlistAlias,
                      internalCover,
                      currentMusicType!,
                    );
                    getEachPlaylistData(playlist[0]);
                  }
                }}
                className="bg-[#04f685] w-auto h-[30px] text-[13px] font-[500] px-3 rounded-md items-center flex"
              >
                New playlist
              </button>
            </form>
            <ul className="flex flex-col gap-[25px] xl:pl-[25px]">
              {playlist.map((list) => {
                return (
                  <li
                    onClick={() => {
                      addMusicToPlaylist(musicValues!);
                    }}
                    key={list.id}
                    className="flex gap-[15px] cursor-pointer w-full"
                  >
                    <img
                      alt="Green table icon"
                      className="w-[20px]"
                      src="/JMusic/icons/tableGreen.svg"
                    />
                    <h2 className="text-white font-small text-lg w-full break-words truncate">
                      {list.playlist.name}{" "}
                    </h2>
                  </li>
                );
              })}
            </ul>
          </article>
          <PlaylistModal />
        </section>
      ) : null}
    </>
  );
}
