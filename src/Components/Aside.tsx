import { useRef } from "react";
import { useNavigateHook } from "../hooks/useNavigateHook";
import { Link } from "react-router-dom";
import { useContextImport } from "../hooks/useContextImport";
import { FaRegHeart } from "react-icons/fa6";

export function Aside() {
  const { likedMusics, playlist, getEachPlaylistData } = useContextImport();
  const selectPlaylist = useRef("");
  const getViewportSize = window.innerWidth;
  const redirect = useNavigateHook();

  return (
    <>
      {getViewportSize > 500 ? (
        <aside className="w-[230px] gap-[30px] fixed h-full bg-[#282828] flex flex-col mt-[var(--nav-height)] pt-6 z-[10]">
          <h2 className="pl-0 text-[#999999]  text-center ">Your collection</h2>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 pl-8">
                <button className="text-white font-medium text-lg w-auto flex items-center gap-3 cursor-pointer">
                  <img
                    alt="List icon "
                    src="/JMusic/icons/listWhite.svg"
                    className="size-[20px]"
                  />
                  Playlists
                </button>
              </div>

              <ul className="flex flex-col gap-4">
                {playlist !== undefined && playlist.length > 0 ? (
                  playlist &&
                  playlist
                    .slice(0, 3)
                    .reverse()
                    .map((playlist) => {
                      return (
                        <li
                          className="flex gap-3 items-center pl-8"
                          onClick={() => {
                            getEachPlaylistData(playlist);
                            selectPlaylist.current = playlist.playlist.name;
                            redirect(playlist?.playlist.name);
                          }}
                          key={playlist.id}
                        >
                          <img
                            className="size-[25px]"
                            alt="Playlist icon"
                            src="/JMusic/icons/eachPlaylistWhite.svg"
                          />
                          <h3 className="text-[#c2c2c2] text-[16px] cursor-pointer truncate">
                            {playlist.playlist.name}
                          </h3>
                        </li>
                      );
                    })
                ) : (
                  <li className="flex flex-col items-center w-full gap-4">
                    <img
                      alt="Heart cracked icon"
                      className="size-[50px]"
                      src="/JMusic/icons/NoPlaylist.svg"
                    />

                    <h3 className="text-[#999999] text-sm text-center">
                      No playlist created
                    </h3>
                  </li>
                )}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 pl-8">
                <button
                  className="text-white text-lg w-auto
                  font-medium flex items-center gap-3 cursor-pointer"
                >
                  <FaRegHeart className="size-[20px]" />
                  Likes
                </button>
              </div>
              <div className="w-full">
                <h2 className=" text-[#999999] text-center text-sm">
                  Recent Likes
                </h2>
              </div>
              <ul className="flex flex-col gap-[20px]">
                {likedMusics !== undefined && likedMusics.length > 0 ? (
                  likedMusics
                    .slice(0, 3)
                    .reverse()
                    .map((music) => {
                      return (
                        <li key={music.likedMusics.id}>
                          <h3 className="text-[#e5e5e5] font-medium text-[15px] pl-8">
                            {music.likedMusics.title}
                          </h3>
                          <h4 className="text-[#969696] text-[14px] pl-8">
                            {music.likedMusics.artist.name}
                          </h4>
                        </li>
                      );
                    })
                ) : (
                  <li className="flex flex-col items-center w-full gap-[20px]">
                    <img
                      alt="Heart cracked icon"
                      className="size-[45px]"
                      src="/JMusic/icons/heartCrackGreen.svg"
                    />
                    <h3 className="text-[#999999]">No musics liked</h3>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </aside>
      ) : (
        <aside className="flex w-screen h-10 fixed top-[90px] bg-[#313131] items-center justify-center gap-24">
          <Link to={"/"}>
            <img
              alt="Maginifying glass icon"
              className="size-[22px] cursor-pointer"
              src="/JMusic/icons/LupaGreen.svg"
            />
          </Link>
          <Link to={"/likedMusics"}>
            <img
              alt="Green heart icon"
              className="size-[23px] cursor-pointer"
              src="/JMusic/icons/heartAddGreen.svg"
            />
          </Link>
          <Link to={"/playlist"}>
            <img
              alt="Playlist icon"
              className="size-[28px] cursor-pointer"
              src="/JMusic/icons/PlaylistAdded.svg"
            />
          </Link>
        </aside>
      )}
    </>
  );
}
