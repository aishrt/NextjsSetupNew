"use client";
import { useEffect, useState } from "react";
import NProgress from "nprogress";
import { GlobalStyles } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { removeElementsByClassName } from "@/@core/createAndClickProgressBar";
import { usePathname, useSearchParams } from "next/navigation";
import MainLoader from "./ui/MainLoader";

type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined,
];

export default function ProgressBar() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const clearLoadingProgress = () => {
    NProgress.done();
    setIsLoading(false);
    removeElementsByClassName("progressbar_loader");
  };
  useEffect(() => {
    clearLoadingProgress();
  }, [pathname, searchParams]);

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleAnchorClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
      const currentUrl = window.location.href;
      if (targetUrl !== currentUrl) {
        NProgress.start();
        setIsLoading(true);
      }
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements: NodeListOf<HTMLAnchorElement> =
        document.querySelectorAll("a[href]");

      anchorElements.forEach((anchor) =>
        anchor.addEventListener("click", handleAnchorClick)
      );

      document.addEventListener("click", function (event: any) {
        if (event.target.classList.contains("progressbar_loader")) {
          handleAnchorClick(event);
        }
      });
    };

    const mutationObserver = new MutationObserver(handleMutation);

    mutationObserver.observe(document, { childList: true, subtree: true });

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        clearLoadingProgress();
        return target.apply(thisArg, argArray);
      },
    });
    window.history.replaceState = new Proxy(window.history.replaceState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        clearLoadingProgress();
        return target.apply(thisArg, argArray);
      },
    });
  });

  const Loader = () => {
    return <MainLoader />;
  };
  return (
    <>
      {GlobalStyles({
        styles: {
          "#nprogress": {
            pointerEvents: "none",
            ".bar": {
              top: 0,
              left: 0,
              height: 2.5,
              zIndex: 9999,
              width: "100%",
              position: "fixed",
              backgroundColor: theme.palette.background.default,
              boxShadow: `0 0 2px ${theme.palette.background.default}`,
            },
            ".peg": {
              right: 0,
              opacity: 1,
              width: 100,
              height: "100%",
              display: "block",
              position: "absolute",
              transform: "rotate(3deg) translate(0px, -4px)",
              boxShadow: `0 0 10px ${theme.palette.background.default}, 0 0 5px ${theme.palette.background.default}`,
            },
          },
        },
      })}
      {isLoading && <Loader />}
    </>
  );
}
