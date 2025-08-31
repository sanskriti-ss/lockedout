import { useEffect, useState } from "react";
import { fetchCover } from "../lib/spotify";

declare global {
  interface Window {
    Spotify: typeof Spotify;
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

interface SpotifyPlayerProps {
  token: string;
  playId?: string;
  isPlaying?: boolean;
}

export default function SpotifyPlayer({ token, playId, isPlaying }: SpotifyPlayerProps) {
  const [player, setPlayer] = useState<any>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [cover, setCover] = useState<string | null>(null);

  useEffect(() => {
    // load SDK
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const _player = new window.Spotify.Player({
        name: "My Web Player",
        getOAuthToken: (cb: any) => cb(token),
        volume: 0.5,
      });

      _player.addListener("ready", ({ device_id }: any) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      _player.addListener("player_state_changed", (state: any) => {
        if (!state) return;
        setIsPaused(state.paused);
      });

      _player.connect();
      setPlayer(_player);
    };
  }, [token]);

  useEffect(() => {
    if (playId && token) {
      fetchCover(playId, token).then(setCover);
    }
  }, [playId, token]);

  const startPlayback = async () => {
    if (!deviceId || !playId) return;
    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      body: JSON.stringify({
        context_uri: playId,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  // Automatically play when isPlaying becomes true
  useEffect(() => {
    if (isPlaying) {
      startPlayback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, deviceId, playId]);

  return (
    <div className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg max-w-md">
      {/* Album Cover */}
      {cover && (
        <img
          src={cover}
          alt="Album cover"
          className="w-14 h-14 rounded-lg object-cover shadow-md flex-shrink-0"
        />
      )}
      
      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <div className="text-white text-sm font-medium truncate">
          Current Track
        </div>
        <div className="text-zinc-400 text-xs truncate">
          Artist Name
        </div>
        <div className="flex items-center gap-1 mt-1">
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <span className="text-xs text-green-500 font-medium">Spotify</span>
          </div>
          <div className={`ml-2 w-1.5 h-1.5 rounded-full ${deviceId ? 'bg-green-500 animate-pulse' : 'bg-zinc-600'}`}></div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => player?.previousTrack()}
          className="p-1.5 text-zinc-400 hover:text-white transition-colors"
          disabled={!player}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
          </svg>
        </button>

        <button
          onClick={() => player?.togglePlay()}
          className="p-2 bg-white text-black rounded-full hover:bg-zinc-100 transition-colors shadow-md"
          disabled={!player}
        >
          {isPaused ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          )}
        </button>

        <button
          onClick={() => player?.nextTrack()}
          className="p-1.5 text-zinc-400 hover:text-white transition-colors"
          disabled={!player}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </button>

        <button
          onClick={startPlayback}
          className="p-1.5 text-zinc-400 hover:text-green-400 transition-colors ml-1"
          title="Load track"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  );
}