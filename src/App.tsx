import { Route, Routes, useLocation } from "react-router-dom";
import { EachPlaylist } from "./Components/EachPlaylist";
import { MainContext } from "./Contexts/MainContext";
import { useContext, useEffect, lazy, Suspense } from "react";

const Home = lazy(() => import("./Pages/Home"));
const LikedMusics = lazy(() => import("./Pages/LikedMusics"));
const Playlist = lazy(() => import("./Pages/Playlist"));

function App() {
  const { eachPlaylist } = useContext(MainContext);
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "JMusic | Inicio";
        break;
      case "/likedMusics":
        document.title = "JMusic | Liked Musics";
        break;
      case "/playlist":
        document.title = "JMusic | My playlists";
        break;
      case `/${eachPlaylist?.playlist.name}`:
        document.title = `JMusic | ${eachPlaylist?.playlist.name} playlist`;
        break;
    }
  }, [location.pathname, eachPlaylist]);

  return (
    <div>
      <Suspense fallback={<h1>Loading Home...</h1>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/likedMusics" element={<LikedMusics />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route
            path={`/${eachPlaylist?.playlist.name}`}
            element={<EachPlaylist />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
