"use client";
import React, { useState } from "react";
import { Suspense } from "react";
import ModalEbook from "@/components/Modal/downloadEbook";
import NavbarToggler from "./ui/navbar-toggler";
import NavbarBrandLogo from "./ui/navbar-brand-logo";

const HeaderNavigation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to control modal open/close

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="navigation">
      <div className="downloadEbook">
        <div className="container-fluid">
          <p>
            Download Now and safeguard your communications with the
            expert&apos;s guidance.{" "}
            <a title="Download EBook" role="button" onClick={handleModalOpen}>
              Download to read the EBook
            </a>
          </p>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Suspense>
            <NavbarBrandLogo />
          </Suspense>
          <Suspense>
            <NavbarToggler />
          </Suspense>
        </div>
      </nav>
      <ModalEbook
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        handleClose={handleModalClose}
      />
    </div>
  );
};

export default HeaderNavigation;
