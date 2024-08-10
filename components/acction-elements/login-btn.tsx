"use client";
import React, { useEffect } from "react";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";

function LoginBtn() {
  const { isLoaded, userId } = useAuth();

  // In case the user signs out while on the page.
  if (!isLoaded || userId) {
    return (
      <div className="absolute z-50 top-2 right-4 font-semibold bg-[#1C77A0] text-white px-4 py-1 rounded">
        <SignOutButton>
          <button>Đăng xuất</button>
        </SignOutButton>
      </div>
    );
  }
  

  return (
    <div className="absolute z-50 top-2 right-4 font-semibold bg-[#1C77A0] text-white px-4 py-1 rounded">
      <SignInButton mode="modal">
        <button>Đăng nhập</button>
      </SignInButton>
    </div>
  );
}

export default LoginBtn;
