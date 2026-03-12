import { useEffect, useState } from "react";
import type { Albums, LikedMusics } from "../Contexts/MainContext";
import React from "react";
import { BtnsReproductor } from "./BtnsReproductor";
import { useContextImport } from "../hooks/useContextImport";

type ReproductorProps = {
  allLikedMusic?: LikedMusics[] | undefined;
  playAllMusic?: boolean;
  randomIndex?: number;
  allMusics?: (LikedMusics | Albums)[];
  onClick?: () => void;
  activeRandomMusic?: boolean;
  musicIndexes?: number;
  setMusicIndexes?: React.Dispatch<React.SetStateAction<number>>;
};

export const Reproductor = React.memo(function Reproductor({
  allLikedMusic,
  playAllMusic,
  randomIndex,
  activeRandomMusic,
  allMusics,
  onClick,
  musicIndexes,
  setMusicIndexes,
}: ReproductorProps) {
  const { reproduceMusicArray } = useContextImport();
  const [musicIndex, setMusicIndex] = useState(0);
  const [indexType, setIndexType] = useState<number>(0);

  const isLikedMusic = (
    music: Albums | LikedMusics | undefined,
  ): music is LikedMusics => {
    if (music !== undefined) return music && "likedMusics" in music;

    return false;
  };

  useEffect(() => {
    const musicsIndex = playAllMusic ? musicIndex : randomIndex;
    if (musicsIndex !== undefined && musicType !== undefined)
      setIndexType(musicsIndex);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicIndex, randomIndex]);

  const handleIsLikedMusic = (
    music: Albums[] | LikedMusics[] | (Albums | LikedMusics)[] | undefined,
  ): music is LikedMusics[] => {
    return (
      Array.isArray(music) &&
      music.length > 0 &&
      music[0] !== undefined &&
      "likedMusics" in music[0]
    );
  };

  const currentReproductorType = handleIsLikedMusic(reproduceMusicArray)
    ? reproduceMusicArray.map((music) => music as LikedMusics)
    : reproduceMusicArray?.map((music) => music as Albums);

  const reproductorMusicType = (
    music: LikedMusics[] | Albums[],
  ): music is Albums[] => {
    return (
      Array.isArray(music) &&
      music.length > 0 &&
      music[0] !== undefined &&
      "likedMusics" in music[0]
    );
  };

  const musicType = reproductorMusicType(allLikedMusic!)
    ? allLikedMusic.map((music) => music as LikedMusics)
    : allMusics?.map((music) => music as Albums);

  return (
    <>
      {currentReproductorType !== undefined ? (
        <article className="fixed md:w-auto xl:w-auto w-screen gap-[20px] flex xl:rounded-xl md:rounded-xl md:h-[100px] md:flex-row xl:h-[100px] h-[155px] bg-[#222222] rounded-none bottom-0 right-0 items-center px-[20px] xl:flex-row flex-col justify-center">
          <div className="flex gap-[20px] items-center w-[100%] md:w-auto xl:w-auto">
            <img
              className="size-[70px] rounded-xl"
              alt={`${
                handleIsLikedMusic(currentReproductorType)
                  ? currentReproductorType?.[musicIndexes!]?.likedMusics.title
                  : (currentReproductorType?.[musicIndexes!] as Albums)?.title
              }} cover`}
              src={
                handleIsLikedMusic(currentReproductorType)
                  ? currentReproductorType?.[musicIndexes!]?.likedMusics.album
                      .cover
                  : (currentReproductorType?.[musicIndexes!] as Albums)?.album
                      .cover
              }
            />
            <div className="flex flex-col gap-[2px] justify-center">
              <h3 className="font-semibold text-base xl:text-xl md:text-xl text-white">
                {handleIsLikedMusic(currentReproductorType)
                  ? currentReproductorType?.[musicIndexes!]?.likedMusics.title
                  : (currentReproductorType?.[musicIndexes!] as Albums)?.title}
              </h3>
              <p className=" text-[#adadad]">
                {handleIsLikedMusic(currentReproductorType)
                  ? currentReproductorType?.[musicIndexes!]?.likedMusics.artist
                      .name
                  : (currentReproductorType?.[musicIndexes!] as Albums)?.artist
                      .name}
              </p>
            </div>
            <BtnsReproductor
              musicIndexes={musicIndexes!}
              setMusicIndexes={setMusicIndexes!}
              musicValuesType={currentReproductorType}
            />
          </div>

          <audio
            className="h-[40px] w-[100%] md:w-[295px] xl:w-[300px] md:h-[54px] xl:h-[54px] rounded-none"
            autoPlay
            controls
            src={
              handleIsLikedMusic(currentReproductorType)
                ? currentReproductorType?.[musicIndexes!]?.likedMusics.preview
                : (currentReproductorType?.[musicIndexes!] as Albums)?.preview
            }
          />
        </article>
      ) : null}

      {(allLikedMusic !== undefined &&
        allLikedMusic.length !== musicIndex &&
        (playAllMusic === true || activeRandomMusic === true)) ||
      (allMusics &&
        allMusics.length !== musicIndex &&
        (playAllMusic === true || activeRandomMusic === true)) ? (
        <article className="fixed md:w-auto xl:w-auto w-screen gap-[20px] flex xl:rounded-xl md:rounded-xl md:h-[100px] xl:h-[100px] h-[155px] bg-[#222222] rounded-none bottom-0 right-0 items-center px-[20px] xl:flex-row md:flex-row flex-col justify-center">
          <div className="flex gap-[20px] items-center w-[100%] md:w-auto xl:w-auto">
            <img
              alt={`${
                isLikedMusic(musicType?.[indexType])
                  ? musicType?.[indexType]?.likedMusics.title
                  : (musicType?.[indexType] as Albums)?.title
              } cover`}
              className="size-[70px] rounded-xl"
              src={`${
                isLikedMusic(musicType?.[indexType])
                  ? musicType?.[indexType]?.likedMusics.album.cover
                  : (musicType?.[indexType] as Albums)?.album.cover
              }`}
            />
            <div className="flex flex-col gap-[2px] justify-center">
              <h3 className="font-semibold text-base md:text-xl xl:text-xl text-white">
                {isLikedMusic(musicType?.[indexType])
                  ? musicType?.[indexType]?.likedMusics.title
                  : (musicType?.[indexType] as Albums)?.title}
              </h3>
              <p className=" text-[#adadad]">
                {isLikedMusic(musicType?.[indexType])
                  ? musicType?.[indexType]?.likedMusics.artist.name
                  : (musicType?.[indexType] as Albums)?.artist.name}
              </p>
            </div>
            <BtnsReproductor
              musicIndexes={musicIndexes!}
              setMusicIndexes={setMusicIndexes!}
              musicValuesType={musicType}
            />
          </div>

          <audio
            className="h-[40px] w-[100%] md:w-[297px] xl:w-[300px] md:h-[54px] xl:h-[54px] rounded-none"
            onEnded={() => {
              if (musicType && musicIndex < musicType.length)
                setMusicIndex((prev) => prev + 1);

              if (onClick !== undefined) onClick();
            }}
            autoPlay
            controls
            src={
              isLikedMusic(musicType?.[indexType])
                ? musicType?.[indexType]?.likedMusics.preview
                : (musicType?.[indexType] as Albums)?.preview
            }
          />
        </article>
      ) : null}
    </>
  );
});
