import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Instead of Unsplash, use local friend_pics PNGs (Vite-compatible import)
const FRIEND_PICS = [
  new URL("./friend_pics/toothless.png", import.meta.url).href
  // Add more PNGs here as you add them to friend_pics
];

function getRandomFriendPic() {
  return FRIEND_PICS[Math.floor(Math.random() * FRIEND_PICS.length)];
}

interface LowEnergyPopupProps {
  open: boolean;
  onClose: () => void;
}

const LowEnergyPopup: React.FC<LowEnergyPopupProps> = ({ open, onClose }) => {
  const [imgUrl, setImgUrl] = React.useState(FRIEND_PICS[0]);

  React.useEffect(() => {
    if (open) {
      setImgUrl(getRandomFriendPic());
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md text-center p-8">
        <DialogHeader>
          <DialogTitle className="text-blue-600 text-2xl font-bold mb-4">
            Low Energy
          </DialogTitle>
        </DialogHeader>
        <img
          src={imgUrl}
          alt="Friend pic"
          className="mx-auto rounded-xl mb-5 shadow-lg"
          style={{ width: 240, height: 240, objectFit: 'cover' }}
        />
        <div className="mb-6 text-lg">Text a friend. You're sad</div>
        <Button onClick={onClose} className="w-full py-3 text-lg">Okay!</Button>
      </DialogContent>
    </Dialog>
  );
};

export default LowEnergyPopup;
