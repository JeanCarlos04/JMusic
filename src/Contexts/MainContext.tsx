import { createContext, useEffect, useRef, useState } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";

type MainContextProp = {
  children: React.ReactNode;
};

type ContextType = {
  albums: Albums[];
  searchSinger: string | undefined;
  likedMusics: LikedMusics[];
  saveLikedMusics: (musicLiked: Albums) => void;
  setSearchSinger: React.Dispatch<React.SetStateAction<string | undefined>>;
  removeLikedMusics: (likedMusics: LikedMusics) => void;
  savePlaylist: (
    name: string,
    cover: string,
    musics: Albums | LikedMusics
  ) => void;
  playlist: Playlists[];
  removePlaylist: (playlistID: Playlists) => void;
  getEachPlaylistData: (playlistData: Playlists) => void;
  eachPlaylist: Playlists | undefined;
  addMusicToPlaylist: (newSong: Albums | LikedMusics) => void;
  isMusicLikedInPlaylist: (music: Albums | LikedMusics) => boolean;
  showLikedModal: ModalState;
  showPlaylistModal: ModalState;
  removeEachPlaylistMusic: (music: Albums | LikedMusics) => void;
  setReproduceMusicArray: React.Dispatch<
    React.SetStateAction<
      Albums[] | LikedMusics[] | (Albums | LikedMusics)[] | undefined
    >
  >;
  reproduceMusicArray:
    | Albums[]
    | LikedMusics[]
    | (Albums | LikedMusics)[]
    | undefined;
};

const contextTypeDefault: ContextType = {
  albums: [],
  searchSinger: undefined,
  likedMusics: [],
  saveLikedMusics: () => {},
  setSearchSinger: () => {},
  removeLikedMusics: () => {},
  savePlaylist: () => {},
  playlist: [],
  removePlaylist: () => {},
  getEachPlaylistData: () => {},
  eachPlaylist: undefined,
  addMusicToPlaylist: () => {},
  isMusicLikedInPlaylist: () => false,
  showLikedModal: "closed",
  showPlaylistModal: "closed",
  removeEachPlaylistMusic: () => {},
  setReproduceMusicArray: () => {},
  reproduceMusicArray: undefined,
};

export type Albums = {
  id: number;
  title: string;
  artist: { name: string };
  album: { cover: string };
  preview: string;
  liked: boolean;
};

export type LikedMusics = {
  likedMusics: Albums;
};

export type Playlists = {
  id: number;
  cover: string;
  playlist: {
    name: string;
    musics: (Albums | LikedMusics)[];
  };
};

export type ModalState =
  | "removed"
  | "added"
  | "closed"
  | "MusicAdded"
  | "MusicRemoved";

const MainContext = createContext<ContextType>(contextTypeDefault);

function MainContextProvider({ children }: MainContextProp) {
  const [searchSinger, setSearchSinger] = useState<string | undefined>(
    undefined
  );
  const [reproduceMusicArray, setReproduceMusicArray] = useState<
    Albums[] | LikedMusics[] | (Albums | LikedMusics)[]
  >();
  const [albums, setAlbums] = useState<Albums[]>([]);
  const [showLikedModal, setShowLikedModal] = useState<ModalState>("closed");
  const [showPlaylistModal, setShowPlaylistModal] =
    useState<ModalState>("closed");

  const modalFunctions = {
    ADDED: "added",
    REMOVED: "removed",
    ClosedModal: "closed",
    MusicAdded: "MusicAdded",
    MusicRemoved: "MusicRemoved",
  } as const;

  const timeOutID = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const delayFetch = setTimeout(() => {
      const musicAPI = async () => {
        if (!searchSinger) return;
        const res = await fetch(
          `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${searchSinger}`
        );

        const data = await res.json();

        const formattedData = data.data.map((item: Albums) => ({
          ...item,
          liked: false,
        }));

        setAlbums(formattedData);
      };

      musicAPI();
    }, 500);

    return () => clearTimeout(delayFetch);
  }, [searchSinger]);

  const [playlist, setPlaylist] = useLocalStorageState<Playlists[]>(
    "playlist",
    []
  );

  const [likedMusics, setLikedMusics] = useLocalStorageState<LikedMusics[]>(
    "likedMusic",
    []
  );

  const [eachPlaylist, setEachPlaylist] = useLocalStorageState<
    Playlists | undefined
  >("eachPlaylist", undefined);

  useEffect(() => {
    if (eachPlaylist) {
      const eachPlaylistUpdated = playlist.find(
        (p) => p.id === eachPlaylist.id
      );

      if (eachPlaylistUpdated) {
        setEachPlaylist(eachPlaylistUpdated);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlist]);

  const saveLikedMusics = (musicLiked: Albums) => {
    setLikedMusics((prev) => {
      if (timeOutID.current) {
        clearTimeout(timeOutID.current);
      }
      const alreadyLiked = prev.some(
        (item) => item.likedMusics.id === musicLiked.id
      );
      if (alreadyLiked) {
        const deletedMusic = likedMusics.filter(
          (music) => music.likedMusics.id !== musicLiked.id
        );
        setShowLikedModal(modalFunctions.REMOVED);
        timeOutID.current = setTimeout(() => {
          setShowLikedModal(modalFunctions.ClosedModal);
        }, 2000);
        return deletedMusic;
      }
      setShowLikedModal(modalFunctions.ADDED);
      timeOutID.current = setTimeout(() => {
        setShowLikedModal(modalFunctions.ClosedModal);
      }, 2000);
      return [...prev, { likedMusics: musicLiked }];
    });

    setAlbums((prev) =>
      prev.map((album) =>
        album.id === musicLiked.id ? { ...album, liked: !album.liked } : album
      )
    );
  };

  const savePlaylist = (
    name: string,
    cover: string,
    musics: Albums | LikedMusics
  ) => {
    if (name === "" || name === undefined || name === null) {
      return;
    } else {
      if (timeOutID.current) {
        clearTimeout(timeOutID.current);
      }

      setPlaylist((prev) => [
        ...prev,
        {
          id: playlist.length + 1,
          cover: cover,
          playlist: { name: name, musics: [musics] },
        },
      ]);

      setShowPlaylistModal(modalFunctions.ADDED);

      timeOutID.current = setTimeout(() => {
        setShowPlaylistModal(modalFunctions.ClosedModal);
      }, 2000);
    }
  };

  const addMusicToPlaylist = (newSong: Albums | LikedMusics) => {
    if (timeOutID.current) {
      clearTimeout(timeOutID.current);
    }
    if ("likedMusics" in newSong) {
      setPlaylist((prev) =>
        prev.map((playlistMusics) =>
          newSong.likedMusics.id !== playlistMusics.id
            ? {
                ...playlistMusics,
                playlist: {
                  name: playlistMusics.playlist.name,
                  musics: [...playlistMusics.playlist.musics, newSong],
                },
              }
            : playlistMusics
        )
      );
    } else {
      setPlaylist((prev) =>
        prev.map((playlistMusics) =>
          newSong.id !== playlistMusics.id
            ? {
                ...playlistMusics,
                playlist: {
                  name: playlistMusics.playlist.name,
                  musics: [...playlistMusics.playlist.musics, newSong],
                },
              }
            : playlistMusics
        )
      );
    }
    setShowPlaylistModal(modalFunctions.MusicAdded);

    timeOutID.current = setTimeout(() => {
      setShowPlaylistModal(modalFunctions.ClosedModal);
    }, 2000);
  };

  const removeLikedMusics = (liked: LikedMusics) => {
    if (timeOutID.current) {
      clearTimeout(timeOutID.current);
    }
    setShowLikedModal(modalFunctions.REMOVED);

    const deletedMusics = likedMusics.filter(
      (music) => music.likedMusics.id !== liked.likedMusics.id
    );

    setAlbums((prev) =>
      prev.map((musicLiked) =>
        musicLiked.id === liked.likedMusics.id
          ? { ...musicLiked, liked: !musicLiked.liked }
          : musicLiked
      )
    );

    timeOutID.current = setTimeout(() => {
      setShowLikedModal(modalFunctions.ClosedModal);
    }, 2000);

    setLikedMusics(deletedMusics);
  };

  const removePlaylist = (playlistID: Playlists) => {
    if (timeOutID.current) {
      clearTimeout(timeOutID.current);
    }
    setPlaylist(playlist.filter((playlist) => playlist.id !== playlistID.id));
    setShowPlaylistModal(modalFunctions.REMOVED);

    timeOutID.current = setTimeout(() => {
      setShowPlaylistModal(modalFunctions.ClosedModal);
    }, 2000);
  };

  const getEachPlaylistData = (playlistData: Playlists) => {
    setEachPlaylist(playlistData);
  };

  const isMusicLikedInPlaylist = (music: Albums | LikedMusics): boolean => {
    const likedID = "likedMusics" in music ? music.likedMusics.id : music.id;
    return likedMusics.some(
      (musicsLiked) => musicsLiked.likedMusics.id === likedID
    );
  };

  const removeEachPlaylistMusic = (musicToRemove: Albums | LikedMusics) => {
    if (timeOutID.current) {
      clearTimeout(timeOutID.current);
    }
    const updatedPlaylists = playlist.map((playlistValue) => {
      const filteredMusics = playlistValue.playlist.musics.filter(
        (musicValue) => musicValue !== musicToRemove
      );

      return {
        ...playlistValue,
        playlist: {
          ...playlistValue.playlist,
          musics: filteredMusics,
        },
      };
    });

    setPlaylist(updatedPlaylists);
    setShowPlaylistModal(modalFunctions.MusicRemoved);

    timeOutID.current = setTimeout(() => {
      setShowPlaylistModal(modalFunctions.ClosedModal);
    }, 2000);
  };

  return (
    <MainContext.Provider
      value={{
        removeEachPlaylistMusic,
        isMusicLikedInPlaylist,
        getEachPlaylistData,
        eachPlaylist,
        playlist,
        albums,
        savePlaylist,
        searchSinger,
        likedMusics,
        setSearchSinger,
        saveLikedMusics,
        removeLikedMusics,
        removePlaylist,
        addMusicToPlaylist,
        showLikedModal,
        showPlaylistModal,
        setReproduceMusicArray,
        reproduceMusicArray,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export { MainContext, MainContextProvider };
