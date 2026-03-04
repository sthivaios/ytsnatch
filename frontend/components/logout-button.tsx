"use client";

import { Button } from "@/components/ui/button";

const logout = async () => {
  await fetch("/api/logout", { method: "POST" });
  window.location.href = "/login";
};

import React from "react";

function LogoutButton() {
  return (
    <Button className="hover:cursor-pointer" onClick={logout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
