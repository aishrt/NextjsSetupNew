import FooterContent from "@/components/Layout/Footer/FooterContent";
import HeaderNavigation from "@/components/Layout/Header/HeaderNavigation";
import { _IMG } from "@/constants/images";
import Image from "next/image";

const PageNotFound = () => {
  return (
    <>
      <div className="header animate__fadeInUp startuppage">
        <HeaderNavigation />
      </div>
      <div>
        <div className="text-center">
          <Image
            src={_IMG.error2}
            loading="lazy"
            alt=""
            className="pageNotFound"
          />
        </div>
        <div className="text-center mb-5">
          <a href="/" className="btn main-button-dark">
            Back To Home
          </a>
        </div>
      </div>
      <FooterContent />
    </>
  );
};
export default PageNotFound;
