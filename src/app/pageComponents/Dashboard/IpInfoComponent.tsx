"use client";

import Ipmodal from "@/components/Modal/ipModal";
import { useEffect, useState } from "react";

const IpInfoComponent = ({
  ipAddress,
  openModal,
}: {
  ipAddress?: any;
  openModal?: any;
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to control modal open/close

  useEffect(() => {
    if (openModal) {
      setIsModalOpen(true);
    }
  }, [openModal]);
  const [currentIp, setCurrentIp] = useState("");

  const handleModalOpen = (ip: any) => {
    setCurrentIp(ip);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setCurrentIp("");
    setIsModalOpen(false);
  };

  return (
    <>
      <span
        onClick={() => handleModalOpen(ipAddress)}
        className="ip text-decoration-underline"
        style={{ cursor: "pointer" }}
      >
        {ipAddress}
      </span>
      <Ipmodal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        handleClose={handleModalClose}
        Ip={ipAddress}
      />
    </>
  );
};
export default IpInfoComponent;
