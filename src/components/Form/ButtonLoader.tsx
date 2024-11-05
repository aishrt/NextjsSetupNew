"use client";

import { useRouter } from "next/navigation";
import CircularSpinner from "../Loaders/CircularSpinner";

const ButtonLoader = ({
  value,
  title = "Click",
  type = "button",
  loader = false,
  colors = "",
}: {
  value: string;
  title?: string;
  type?: "button" | "submit" | "reset";
  loader?: boolean;
  colors?: string;
}) => {
  const router = useRouter();


  return (
    <>
      {loader ? (
        <button
          className="btn notConfig d-flex align-items-center justify-content-center"
          type="button"
        >
          <CircularSpinner />
        </button>
      ) : (
        <button
          className={`${colors} mb-4 mt-0`}
          onClick={() => router.back()}
          title={title}
          type={type}
        >
          <i className="fa-solid fa-arrow-left me-1"></i>
          {value}
        </button>
      )}
    </>
  );
};

export default ButtonLoader;
