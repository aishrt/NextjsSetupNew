import FooterContent from "@/components/Footer/FooterContent";
import HeaderNavigation from "@/components/Header/HeaderNavigation";

const PageNotFound =() =>{
    return(
        <>
        <div className="header animate__fadeInUp startuppage">
            <HeaderNavigation/>
        </div>
        <div>
            <div className="text-center">
            <img src="/assets/images/error2.jpg" loading="lazy" alt="" height="auto" width="auto" className="pageNotFound"/>
            </div>
            <div className="text-center mb-5">
                <a href="/" className="btn main-button-dark">
                    Back To Home
                </a>

            </div>
        </div>
        <FooterContent/>
        </>

    );
};
export default PageNotFound;