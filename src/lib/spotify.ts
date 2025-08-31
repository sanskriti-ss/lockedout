export const fetchCover = async (uri: string, token: string) => {
  const parts = uri.split(":");
  if (parts.length < 3) return null;

  const type = parts[1];
  const id = parts[2];
  let endpoint = "";

  if (type === "playlist") endpoint = `https://api.spotify.com/v1/playlists/${id}`;
  if (type === "album") endpoint = `https://api.spotify.com/v1/albums/${id}`;
  if (type === "artist") endpoint = `https://api.spotify.com/v1/artists/${id}`;
  if (!endpoint) return null;

  const res = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data.images?.[0]?.url || null;
};
