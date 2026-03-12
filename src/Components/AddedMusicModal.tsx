import { useContextImport } from "../hooks/useContextImport";

export function AddedMusicModal() {
  const { showLikedModal } = useContextImport();

  if (showLikedModal === "closed") return null;

  return (
    <div
      className={`${
        showLikedModal === "added" ? "bg-green-300" : "bg-[#d14343]"
      } rounded-md w-auto fixed p-[20px] h-[30px] top-[85%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-[12px]`}
    >
      <h1
        className={`${
          showLikedModal === "added" ? "text-black" : " text-white"
        } inline-bloc w-[250px]`}
      >
        {showLikedModal === "added"
          ? "Added to your liked songs"
          : "Removed from your liked songs"}
      </h1>
      <img
        alt="heart icon"
        className="size-[20px]"
        src={`${
          showLikedModal === "added"
            ? "/JMusic/icons/heart.svg"
            : "/JMusic/icons/heartCrackWhite.svg"
        }`}
      />
    </div>
  );
}
