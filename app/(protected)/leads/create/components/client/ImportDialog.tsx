"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUp } from "lucide-react"
import { log } from "node:console";

// ✅ CORRECT
const ImportDialog = ({ openDialog, setOpen }:any) => {

    const fileImport =()=>{
        console.log("Its Clicked");
        
    }
  return (
    <Dialog open={openDialog} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Transcribe audio and video
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-6 p-6">
          <div className="flex h-60 w-full flex-col items-center justify-center rounded-md border-2 border-dashed p-6">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <FileUp className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-medium">Drag & Drop</h3>
            <div className="text-center text-sm text-gray-500">
              <p>AAC, MP3, M4A, WAV, WMA</p>
              <p>MOV, MPEG, MP4, WMV</p>
              <p className="mt-2">or</p>
            </div>
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700" onClick={fileImport}>Browse files</Button>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-sm text-gray-500">3 of 3 imports left</span>
            <Button variant="outline" className="text-blue-600 border-blue-600">
              Upgrade to Business for unlimited imports
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};


export default ImportDialog;
