export const spotifyToken = async () => {
  const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const client_secret_id = import.meta.env.VITE_SPOTIFY_SECRET_CLIENT;
  const base64 = btoa(`${client_id}:${client_secret_id}`);

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${base64}`,
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  return data.access_token;
};
