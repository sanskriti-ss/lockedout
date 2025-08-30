import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface HighStressPopupProps {
  open: boolean;
  onClose: () => void;
}

const HighStressPopup: React.FC<HighStressPopupProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xs text-center">
        <DialogHeader>
          <DialogTitle className="text-red-600 text-lg font-bold mb-2">
            Warning! High Stress
          </DialogTitle>
        </DialogHeader>
        <img
          src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=256&q=80"
          alt="Cute animal"
          className="mx-auto rounded-lg mb-3 shadow"
          style={{ width: 120, height: 120, objectFit: 'cover' }}
        />
        <div className="mb-4 text-base">Go take a walk.</div>
        <Button onClick={onClose} className="w-full">Okay!</Button>
      </DialogContent>
    </Dialog>
  );
};

export default HighStressPopup;
