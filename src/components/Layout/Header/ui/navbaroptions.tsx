"use client";

import Link from "next/link";

const NavbarToggler = () => {
  return (
    <>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarScroll">
        <ul className="navbar-nav ms-auto  mb-lg-0">
          <li className="nav-item">
            <Link rel="canonical" className="nav-link" href="">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link rel="canonical" className="nav-link" href="">
              Product
            </Link>
          </li>
          <li className="nav-item">
            <Link rel="canonical" className="nav-link" href="">
              Tools
            </Link>
          </li>
          <li className="nav-item">
            <Link rel="canonical" className="nav-link" href="">
              Blog
            </Link>
          </li>
          <li className="nav-item">
            <Link rel="canonical" className="nav-link" href="">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default NavbarToggler;
