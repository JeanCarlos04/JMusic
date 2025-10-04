import { useState } from "react";
import { useNavigateHook } from "../hooks/useNavigateHook";
import { Link } from "react-router-dom";

type NavProps = {
  setSearchSinger: React.Dispatch<React.SetStateAction<string | undefined>>;
};

enum url {
  homeUrl = "/",
  likedMusicUrl = "/likedMusics",
  playlist = "/playlist",
}

export function Nav({ setSearchSinger }: NavProps) {
  const [inputValue, setInputValue] = useState("");

  const redirect = useNavigateHook();

  const getViewportSize = window.innerWidth;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchSinger(inputValue);
    setInputValue("");
  };

  return (
    <nav className="w-full fixed h-[90px] bg-[#282828] flex items-center md:gap-[30px] gap-[50px] xl:gap-[35px] md:pl-[30px] xl:pl-[30px] z-[50] px-[15px]">
      <div
        onClick={() => redirect(url.homeUrl)}
        className="flex w-auto h-auto items-center cursor-pointer"
      >
        <img
          loading="lazy"
          alt="JMusic logo web"
          src="/svg/JMusicLogo.webp"
          className="w-[45px] h-[60px] rotate-12 md:w-[55px] md:h-[70px] xl:w-[55px] xl:h-[70px] "
        />
        <h2 className="xl:text-3xl md:text-3xl text-2xl font-semibold text-white">
          <span className="text-green-400">J</span>Music
        </h2>
      </div>
      <div className="relative flex items-center">
        <form onSubmit={handleSubmit}>
          <input
            value={inputValue}
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-white w-auto md:w-[300px] xl:w-[400px] outline-0 h-[38px] rounded-md pl-[20px] md:pl-[20px] xl:pl-[20px] placeholder:text-[#848484] placeholder:text-[15px] font-normal"
            placeholder="Search your musics"
          />
        </form>
        <img
          alt="Magnifying glass icon"
          className="xl:size-[20px] md:size-[20px] size-[18px] absolute right-3 md:right-5 xl:right-5"
          src="/icons/LupaIcon.svg"
        />
      </div>
      {getViewportSize > 640 ? (
        <>
          <Link
            to={"/likedMusics"}
            className="text-white hover:scale-110 duration-300 font-normal text-[18px] w-auto flex items-center gap-3 cursor-pointer"
          >
            <img
              alt="heart icon"
              src="/icons/heartWhite.svg"
              className="size-[20px]"
            />{" "}
            Likes
          </Link>
          <Link
            to={"/playlist"}
            className="text-white hover:scale-110 duration-300 font-normal text-[18px] w-auto flex items-center gap-3 cursor-pointer"
          >
            <img
              alt="list icon"
              src="/icons/playlistWhite.svg"
              className="size-[23px]"
            />
            Playlists
          </Link>
        </>
      ) : (
        ""
      )}
    </nav>
  );
}
