const clientId = "d0625dc1d23e4aeb9502e9e3120d5869";
const redirectUri = "https://bf06f50f7fa7.ngrok-free.app/callback";
const playlistUri = "spotify:playlist:7kEHF8x9dHDohbqUJYXdHk";
const scopes = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-modify-playback-state",
];

export function loginToSpotify() {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes.join(" "))}`;

  window.location.href = authUrl;
}