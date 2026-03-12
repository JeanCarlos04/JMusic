import { Albums, LikedMusics } from "../Contexts/MainContext";

type BtnsReproductorProps = {
  musicIndexes: number;
  setMusicIndexes: React.Dispatch<React.SetStateAction<number>>;
  musicValuesType: LikedMusics[] | Albums[] | undefined;
};

export function BtnsReproductor({
  musicIndexes,
  setMusicIndexes,
  musicValuesType,
}: BtnsReproductorProps) {
  const btnBackOnClick = () => {
    return musicIndexes === 0
      ? setMusicIndexes(musicValuesType!.length - 1)
      : setMusicIndexes((prev) => prev - 1);
  };

  const btnForwardOnClick = () => {
    return musicIndexes === musicValuesType!.length - 1
      ? setMusicIndexes(0)
      : setMusicIndexes((prev) => prev + 1);
  };

  return (
    <div className="flex gap-[5px]">
      <button
        onClick={btnBackOnClick}
        className="size-[25px] hover:scale-110 duration-100"
      >
        <img
          className="size-[20px] rotate-180 cursor-pointer"
          alt="Play back icon"
          src="/JMusic/icons/playWhite.svg"
        />
      </button>
      <button
        onClick={btnForwardOnClick}
        className="size-[25px]  hover:scale-110 duration-100"
      >
        <img
          className="size-[20px] cursor-pointer"
          alt="Play forward icon"
          src="/JMusic/icons/playWhite.svg"
        />
      </button>
    </div>
  );
}
