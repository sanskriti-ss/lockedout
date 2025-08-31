import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// helper function to resolve covers from Spotify URIs
async function fetchCover(uri: string, token: string): Promise<string | null> {
  const parts = uri.split(":");
  if (parts.length < 3) return null;

  const type = parts[1];
  const id = parts[2];
  let endpoint = "";

  if (type === "playlist") endpoint = `https://api.spotify.com/v1/playlists/${id}`;
  if (type === "album") endpoint = `https://api.spotify.com/v1/albums/${id}`;
  if (type === "artist") endpoint = `https://api.spotify.com/v1/artists/${id}`;
  if (type === "track") endpoint = `https://api.spotify.com/v1/tracks/${id}`;
  if (!endpoint) return null;

  const res = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) return null;
  const data = await res.json();

  if (type === "track") {
    return data?.album?.images?.[0]?.url || null;
  }

  return data?.images?.[0]?.url || null;
}

interface MusicPopupProp {
  open: boolean;
  onClose: () => void;
  onYes: () => void;
  onNo: () => void;
  token: string; // Spotify access token
  spotifyUri?: string; // 👈 pass in what you want to preview
}

const MusicPopup: React.FC<MusicPopupProp> = ({
  open,
  onClose,
  onYes,
  onNo,
  token,
  spotifyUri,
}) => {
  const [imgUrl, setImgUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open || !token || !spotifyUri) return;

    fetchCover(spotifyUri, token).then(setImgUrl);
  }, [open, token, spotifyUri]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md text-center p-8">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl font-bold mb-4">
            You are concentrating! Play Spotify playlist?
          </DialogTitle>
        </DialogHeader>
        {imgUrl && (
          <img
            src={imgUrl}
            alt="Cover"
            className="mx-auto rounded-xl mb-5 shadow-lg"
            style={{ width: 240, height: 240, objectFit: "cover" }}
          />
        )}
        <DialogFooter>
          <Button onClick={onYes}>Yes</Button>
          <Button variant="outline" onClick={onNo}>
            No
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MusicPopup;
