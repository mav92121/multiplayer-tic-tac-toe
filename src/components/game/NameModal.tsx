"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NameModal = ({
  handlePlayOnline,
}: {
  handlePlayOnline: (name: string) => void;
}) => {
  const [name, setName] = useState<string>("");
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <Dialog>
        <DialogTrigger className="bg-slate-300 w-[250px] h-[75px] text-black font-bold text-3xl">
          Play Online
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Enter Your Name</DialogTitle>
          </DialogHeader>
          <Input
            required={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-[60%] mx-auto "
            type="text"
            placeholder="Name"
          />
          <DialogFooter className="sm:justify-center">
            <Button
              disabled={name.trim() === ""}
              onClick={() => {
                handlePlayOnline(name.trim());
                setName("");
              }}
              type="submit"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NameModal;
