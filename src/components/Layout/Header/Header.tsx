"use client";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import TimerCountdown from "@/components/UI/TimerCountdown";
import HeaderNavigation from "./HeaderNavigation";

const Header = () => {
  return (
    <>
      <div className="header animate__fadeInUp">
        <span className="heroDotted">
          <img
            src="/assets/images/shapeDotted.svg"
            alt="Shape dotted used for design."
            width="auto" height="auto" loading="lazy"
          />
        </span>
        <span className="heroDotted2">
          <img
            src="/assets/images/shapeDotted.svg"
            alt="Shape dotted used for design."
            width="auto" height="auto" loading="lazy"
          />
        </span>
        <span className="vector">
          <img src="/assets/images/logo-vector.svg" width="auto" height="auto" alt="logo-vector" loading="lazy"/>
        </span>
        <span className="vector-left">
          <img src="/assets/images/Ellipse4.png" alt="decorative-vector" loading="lazy"/>
        </span>
        <span className="vector-right">
          <img src="/assets/images/Ellipse3.png" alt="decorative-vector" loading="lazy"/>
        </span>
        <HeaderNavigation />
        <div className="hero-section">
          <div className="container">
            <div className="heading text-center">
              <h1>
                How to Meet the DMARC
                <br /> Deadline -
                <Typewriter
                  words={["Fast", "and Easy."]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </h1>
              <p>
                Do not let the new email authentication rules from Google and
                Yahoo
                <br /> catch you off guard. We can help you get ready in no
                time.
              </p>
            </div>
            <TimerCountdown />

            <div className="heroBtns">
              <Link href="/dashboard/dashboard">
                Your trusted DMARC Partner
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
