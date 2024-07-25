import type { Metadata } from "next";
import "./globals.css";
import StatusGroup from "@/components/acction-elements/status-group";
import "react-tooltip/dist/react-tooltip.css";
import MenuGroup from "@/components/acction-elements/menu-group";
import ToogleTheme from "@/components/acction-elements/toogle-theme";
import YtbScreen from "@/components/acction-elements/ytb-screen";
import { Toaster } from "react-hot-toast";
import Promodo from "@/components/acction-elements/promodo";
import Tasks from "@/components/acction-elements/tasks";
import ManegeAudio from "@/components/acction-elements/manege-audio";
import { AudioProvider } from "@/contexts/audio-context";
import ReactH5AudioPlayer from "@/components/acction-elements/react-h5-audio-player";
import UiAction from "@/components/acction-elements/ui-action";
import { FullScreen } from "react-full-screen";
import CurrentMonth from "@/components/papery/current-month";
import NewPapery from "@/components/papery/new-papery";
import PaperyMonth from "@/components/papery/papery-month";
import LoadingMain from "@/components/acction-elements/loading-main";

export const metadata: Metadata = {
  title: "Lofi Space",
  description:
    "Tại Lofi Space, chúng tôi mang đến cho bạn một trải nghiệm thư giãn độc đáo với âm nhạc lo-fi dễ chịu, giúp bạn tập trung, thư giãn và tạo ra không gian làm việc lý tưởng. Chúng tôi không chỉ cung cấp những bản nhạc lo-fi chất lượng cao mà còn trang bị một loạt các công cụ hỗ trợ hữu ích để nâng cao trải nghiệm của bạn.",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Lương Khoa",
    "Carolo Lương Khoa",
    "Lofi app",
    "Lofi Space",
    "Code by Lương Khoa",
  ],
  authors: [{ name: "Carolo Lương Khoa" }],
  creator: "Carolo Lương Khoa",
  publisher: "Carolo Lương Khoa",
  openGraph: {
    title: "Lofi Space",
    description: "Website coded by Carolo Lương Khoa",
    url: "https://space-lofi.vercel.app/",
    siteName: "Lofi Space",
    images: [
      {
        url: "https://i.ibb.co/tx5DH4X/original-68aa470bf0643d2d9a71962db7128373.jpg", // Must be an absolute URL
      },
    ],
    locale: "vi",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          suppressHydrationWarning
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          suppressHydrationWarning
        />
        <link
          suppressHydrationWarning
          href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&display=swap"
          rel="stylesheet"
        ></link>
      </head>

      <body
        className={
          " m-plus-rounded-1c-regular flex min-h-screen flex-col items-center justify-between bg-white relative overflow-hidden"
        }
      >
        <AudioProvider>
          <>
            <StatusGroup />
            {children}
            <MenuGroup />
            {/* <ToogleTheme /> */}
            <YtbScreen />
            <Promodo />
            <Tasks />
            <ReactH5AudioPlayer />
            <UiAction />
            <CurrentMonth />
            <NewPapery />
            <LoadingMain />
            <Toaster position="bottom-right" reverseOrder={false} />
          </>
        </AudioProvider>
      </body>
    </html>
  );
}
