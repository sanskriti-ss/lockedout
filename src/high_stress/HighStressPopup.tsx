import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface HighStressPopupProps {
  open: boolean;
  onClose: () => void;
}

const CUTE_IMAGES = [
  // Baby dog
  "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=256&q=80",
  // Baby turtle
  "https://images.unsplash.com/photo-1652385332291-dacb27c23e9d?q=80&w=654&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=facearea&w=256&q=80",
  // Baby cat
  "https://images.unsplash.com/photo-1599609446852-d21902d058eb?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dauto=format&fit=facearea&w=256&q=80",
  // Baby seal
  "https://images.unsplash.com/photo-1542985303-ce7a686c5e09?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dauto=format&fit=facearea&w=256&q=80",
  // Baby rabbit
  "https://images.unsplash.com/photo-1659268291592-b12f72ddf46f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=facearea&w=256&q=80"
];

function getRandomImage() {
  return CUTE_IMAGES[Math.floor(Math.random() * CUTE_IMAGES.length)];
}

const HighStressPopup: React.FC<HighStressPopupProps> = ({ open, onClose }) => {
  const [imgUrl, setImgUrl] = React.useState(CUTE_IMAGES[0]);

  React.useEffect(() => {
    if (open) {
      setImgUrl(getRandomImage());
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md text-center p-8">
        <DialogHeader>
          <DialogTitle className="text-red-600 text-2xl font-bold mb-4">
            Warning! High Stress
          </DialogTitle>
        </DialogHeader>
        <img
          src={imgUrl}
          alt="Cute animal"
          className="mx-auto rounded-xl mb-5 shadow-lg"
          style={{ width: 240, height: 240, objectFit: 'cover' }}
        />
        <div className="mb-6 text-lg">Go take a walk.</div>
        <Button onClick={onClose} className="w-full py-3 text-lg">Okay!</Button>
      </DialogContent>
    </Dialog>
  );
};

export default HighStressPopup;
