"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function NewDownloadDialog(props: { callback: (url: string) => void }) {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setUrl("");
      }}
    >
      <form>
        <DialogTrigger asChild>
          <Button variant="default" className="hover:cursor-pointer">
            Start a new download
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Start a new download</DialogTitle>
            <DialogDescription>
              Enter the YouTube URL of the video to download.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="url">YouTube Video URL</Label>
              <Input
                id="url"
                name="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=xxxxxxx"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="hover:cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="hover:cursor-pointer"
              onClick={() => {
                props.callback(url);
                setOpen(false);
              }}
            >
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
