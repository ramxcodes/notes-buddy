"use client";

import { useEffect } from "react";
import DisableDevtool from "disable-devtool";
import { signOut } from "next-auth/react";

export default function DisableDevtoolClient() {
  useEffect(() => {
    function handleBeforePrint(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = "";
      return false;
    }

    window.addEventListener("beforeprint", handleBeforePrint);
    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        signOut();

        window.close();
        e.preventDefault();
        alert("Printing is disabled!");
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    function handleCopy(e: ClipboardEvent) {
      e.preventDefault();
      e.clipboardData?.setData(
        "text/plain",
        "oops! you can't copy this 😂😂! Blocked by NotesBuddy.in :)"
      );
    }

    document.addEventListener("copy", handleCopy);
    return () => {
      document.removeEventListener("copy", handleCopy);
    };
  }, []);

  useEffect(() => {
    const { success, reason } = DisableDevtool({
      disableMenu: true,
      disableCut: true,

      ondevtoolopen: (type, next) => {
        signOut();
        window.close();
        next();
      },
    });

    console.log("DisableDevtool => ", { success, reason });
  }, []);

  return null;
}
