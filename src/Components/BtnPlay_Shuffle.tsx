import { LikedMusics, Playlists } from "../Contexts/MainContext";

type BtnPlay_ShuffleProps = {
  headerValuesPlaylist?: Playlists | undefined;
  headerValuesLikedMusics?: LikedMusics[];
  setPlayAllMusic: React.Dispatch<React.SetStateAction<boolean>>;
  playAllMusic: boolean;
  setActiveRandomMusic: React.Dispatch<React.SetStateAction<boolean>>;
  activeRandomMusic: boolean;
  handleRestartPlaylist?: () => void;
  handleRandomIndex: () => void;
  playlistCover?: string | undefined;
};

export function BtnPlay_Shuffle({
  headerValuesPlaylist,
  headerValuesLikedMusics,
  setPlayAllMusic,
  playAllMusic,
  setActiveRandomMusic,
  activeRandomMusic,
  handleRestartPlaylist,
  handleRandomIndex,
  playlistCover,
}: BtnPlay_ShuffleProps) {
  const handleBtnPlay = () => {
    setPlayAllMusic(!playAllMusic);
    if (handleRestartPlaylist !== undefined) handleRestartPlaylist();
  };

  const handleBtnShuffle = () => {
    handleRandomIndex();
    setActiveRandomMusic(!activeRandomMusic);
  };

  return (
    <div className="flex md:flex-row xl:flex-row flex-col gap-[25px] items-center xl:items-end md:items-start w-full">
      <div
        className={`${
          headerValuesLikedMusics ? "rounded-2xl bg-white" : "md:rounded-2xl"
        } size-[300px] xl:size-[250px] md:size-[200px] flex   xl:rounded-2xl justify-center items-center`}
      >
        <img
          alt="icon of a disc"
          className={`${
            headerValuesLikedMusics
              ? "xl:size-[170px] md:size-[120px]"
              : "xl:size-[250px] md:size-[200px] size-[300px] xl:rounded-xl"
          }  size-[220px]`}
          src={
            headerValuesLikedMusics
              ? "/icons/heartCheckGreen.svg"
              : `${playlistCover}`
          }
        />
      </div>
      <div className="flex flex-col gap-[25px] xl:mb-[40px] md:mb-[40px] xl:w-auto md:w-auto md:items-start xl:items-start w-full items-center max-w-[300px]">
        <h1
          className={`${
            headerValuesPlaylist?.playlist.name
              ? "md:text-[22px] md:w-[290px]"
              : ""
          } font-semibold text-xl md:text-3xl md:text-start xl:text-3xl text-[white] xl:px-0 w-full xl:w-[500px] break-words text-center xl:text-start`}
        >
          {headerValuesPlaylist?.playlist.name
            ? headerValuesPlaylist?.playlist.name
            : "Your favorites songs"}
          {headerValuesPlaylist?.playlist.name ? " playlist" : ""}
        </h1>

        <h2 className="font-semibold text-lg xl:text-xl text-[#04f685]">
          {headerValuesPlaylist?.playlist.musics.length ||
            headerValuesLikedMusics?.length}{" "}
          songs
        </h2>
        <div className="flex gap-[20px]">
          <button
            onClick={handleBtnPlay}
            className={`${
              playAllMusic ? "bg-green-400" : "bg-white"
            }  rounded-md w-[120px] duration-200 h-[35px] cursor-pointer flex justify-center items-center gap-[7px]`}
          >
            Play
            <img
              alt="Play icon"
              src="/icons/playBlack.svg"
              className="size-[19px]"
            />
          </button>
          <button
            onClick={handleBtnShuffle}
            className={`${
              activeRandomMusic ? "bg-green-400 " : "bg-white"
            } duration-200 rounded-md w-[120px] h-[35px] cursor-pointer flex justify-center items-center gap-[7px]`}
          >
            <img
              alt="shuffle arrows icon"
              className="size-[21px]"
              src="/icons/shuffleIcon.svg"
            />
            Shuffle
          </button>
        </div>
      </div>
    </div>
  );
}
