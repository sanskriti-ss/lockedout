import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const RUN_IMAGES = [
  // Unsplash running images
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", // person running
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80", // running in nature
  "https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?auto=format&fit=crop&w=400&q=80", // running shoes
  "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80", // group run
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" // city run
];

function getRandomRunImage() {
  return RUN_IMAGES[Math.floor(Math.random() * RUN_IMAGES.length)];
}

interface LowFocusPopupProps {
  open: boolean;
  onClose: () => void;
}

const LowFocusPopup: React.FC<LowFocusPopupProps> = ({ open, onClose }) => {
  const [imgUrl, setImgUrl] = React.useState(RUN_IMAGES[0]);

  React.useEffect(() => {
    if (open) {
      setImgUrl(getRandomRunImage());
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md text-center p-8">
        <DialogHeader>
          <DialogTitle className="text-yellow-600 text-2xl font-bold mb-4">
            Low Focus
          </DialogTitle>
        </DialogHeader>
        <img
          src={imgUrl}
          alt="Running inspiration"
          className="mx-auto rounded-xl mb-5 shadow-lg"
          style={{ width: 240, height: 240, objectFit: 'cover' }}
        />
        <div className="mb-6 text-lg">Low focus. We recommend that you go jog/run/jump and come back.</div>
        <Button onClick={onClose} className="w-full py-3 text-lg">Okay!</Button>
      </DialogContent>
    </Dialog>
  );
};

export default LowFocusPopup;
