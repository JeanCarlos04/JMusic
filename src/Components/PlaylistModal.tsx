import { useContextImport } from "../hooks/useContextImport";

export function PlaylistModal() {
  const { showPlaylistModal } = useContextImport();

  if (showPlaylistModal === "closed") return null;

  return (
    <div
      className={`${
        showPlaylistModal === "added" || showPlaylistModal === "MusicAdded"
          ? "bg-green-300"
          : "bg-[#d14343]"
      }  rounded-md w-auto fixed p-[20px] h-[30px] top-[85%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-[12px] z-[999]`}
    >
      <h1
        className={`${
          showPlaylistModal === "added" || showPlaylistModal === "MusicAdded"
            ? "text-black"
            : " text-white"
        }`}
      >
        {showPlaylistModal === "added"
          ? "Playlist created"
          : showPlaylistModal === "MusicAdded"
          ? `Music added to playlist`
          : showPlaylistModal === "MusicRemoved"
          ? "Music removed"
          : "Playlist deleted"}
      </h1>
      <img
        alt="heart icon"
        className="size-[30px]"
        src={`${
          showPlaylistModal === "added" || showPlaylistModal === "MusicAdded"
            ? "/icons/PlaylistAddedBlack.svg"
            : "/icons/PlaylistRemovedWhite.svg"
        }`}
      />
    </div>
  );
}
