"use client";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import TimerCountdown from "@/components/UI/TimerCountdown";
import HeaderNavigation from "./HeaderNavigation";
import { _IMG } from "@/constants/images";
import Image from "next/image";

const Header = () => {
  return (
    <>
      <div className="header animate__fadeInUp">
        <span className="heroDotted">
          <Image
            src={_IMG.shapeDotted}
            alt="Shape dotted used for design."
            loading="lazy"
          />
        </span>
        <span className="heroDotted2">
          <Image
            src={_IMG.shapeDotted}
            alt="Shape dotted used for design."
            loading="lazy"
          />
        </span>
        <span className="vector">
          <Image
            src={_IMG.logo_vector}
            alt="logo-vector"
            loading="lazy"
          />
        </span>
        <span className="vector-left">
          <Image src={_IMG.Ellipse4} alt="decorative-vector" loading="lazy" />
        </span>
        <span className="vector-right">
          <Image src={_IMG.Ellipse3} alt="decorative-vector" loading="lazy" />
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
