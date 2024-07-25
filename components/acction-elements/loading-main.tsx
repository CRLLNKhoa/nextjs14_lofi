"use client";
import React, { useEffect, useState } from "react";

function LoadingMain() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loading = setTimeout(() => {
      setLoading(true);
    }, 5000);
    return () => clearTimeout(loading);
  }, []);

  if (loading) return null;

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-[9999] bg-black text-white flex flex-col items-center justify-center">
      <img src="/logo.webp" alt="loggo" className="size-24 mb-4" />
      <p className="max-w-[600px] text-center">
        Sử dụng tai nghe và phóng to màn hình để có trải nghiệm tốt nhất.
        Website vẫn dang xây dựng cảm ơn bạn đã truy cập !
      </p>
      <p className="mt-4 lg:hidden">Chưa phát triển phiên bản mobile.</p>
    </div>
  );
}

export default LoadingMain;
