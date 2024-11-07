import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import React, { Fragment } from "react";
import Image from "next/image";

export const CarouselTool = () => {
  const data = [
    {
      src: "/assets/images/connect.jpg",
      title: "Tools Benefits & Enhancements",
      title2: "Enhanced Connectivity Optimizing Domain Mapping with IPv6",
      description:
        "Ensuring your domain is mapped to its IPv6 address is crucial for compatibility with modern networks. Verifying your DNS AAAA record improves accessibility for both IPv4 and IPv6 users. It enhances connectivity, reduces potential issues, and ensures seamless access across devices. Proper domain-to-IPv6 mapping also boosts performance and minimizes latency. This approach future-proofs your network and positions your business for success in the digital age.",
    },
    {
      src: "/assets/images/reportingImage2.svg",
      title: "Tools Benefits & Enhancements",
      title2: "Enhanced Connectivity Optimizing Domain Mapping with IPv6",
      description:
        "Ensuring your domain is mapped to its IPv6 address is crucial for compatibility with modern networks. Verifying your DNS AAAA record improves accessibility for both IPv4 and IPv6 users. It enhances connectivity, reduces potential issues, and ensures seamless access across devices. Proper domain-to-IPv6 mapping also boosts performance and minimizes latency. This approach future-proofs your network and positions your business for success in the digital age.",
    },
    {
      src: "/assets/images/reportingImage2.svg",
      title: "Tools Benefits & Enhancements",
      title2: "Enhanced Connectivity Optimizing Domain Mapping with IPv6",
      description:
        "Ensuring your domain is mapped to its IPv6 address is crucial for compatibility with modern networks. Verifying your DNS AAAA record improves accessibility for both IPv4 and IPv6 users. It enhances connectivity, reduces potential issues, and ensures seamless access across devices. Proper domain-to-IPv6 mapping also boosts performance and minimizes latency. This approach future-proofs your network and positions your business for success in the digital age.",
    },
  ];
  return (
    <>
      <div className="carousel-container">
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showThumbs={false}
          interval={3000}
          transitionTime={500}
        >
          {data?.map((item, index) => {
            return (
              <div className="keyFeatures2" key={index}>
                <div className="container">
                  <div key={index}>
                    <h3>{item?.title}</h3>
                    <div className="row">
                      <div className="col-lg-6">
                        <img
                          src={item?.src}
                          alt="Slide 1"
                          className="carousel-img"
                        />
                      </div>
                      <div className="col-lg-6">
                        <div className="centerAlign2">
                          <p className="heading1">{item?.title2}</p>
                          <p className="desc">{item?.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};
export default CarouselTool;
