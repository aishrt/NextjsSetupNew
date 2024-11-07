import { _IMG } from "@/constants/images";
import Image from "next/image";

const TestimonialsContainer = () => {
  return (
    <section className="testimonials wow fadeIn">
      <span className="shade">
        <Image src={_IMG.testimonialShade} alt={""} loading="lazy" />
      </span>
      <span className="quoteImage">
        <Image src={_IMG.quoteImg} alt={""} loading="lazy" />
      </span>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="testimonials__Content">
              <h3>Client Experiences</h3>
              <p>Hear Their Stories</p>
              <div
                id="carouselExampleAutoplaying"
                className="carousel slide mt-5"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <Image
                      className="rating"
                      src={_IMG.ratingStarts}
                      alt={""}
                      loading="lazy"
                    />
                    <p>
                      &quot;This was beyond our expectations! Our email response
                      rates skyrocketed by 800%! We were blaming our creatives,
                      but it turns out phishing on our domain was the culprit
                      all along!&quot;
                    </p>

                    <span className="userImage">
                      <Image
                        src={_IMG.testimonialImg}
                        alt={""}
                        loading="lazy"
                      />
                    </span>
                    <h5>CMO</h5>
                    <h6>Top 100 E Commerce Brand - UK</h6>
                  </div>
                  <div className="carousel-item">
                    <Image
                      className="rating"
                      src={_IMG.ratingStarts}
                      alt={""}
                      loading="lazy"
                    />
                    <p>
                      &quot;This compliance tool streamlined our communication,
                      reducing email-related errors by 30%. Essential for
                      logistics efficiency.&quot;
                    </p>

                    <span className="userImage">
                      <Image src={_IMG.team_1} alt={""} loading="lazy" />
                    </span>
                    <h5>M. Brown</h5>
                    <h6>
                      Operations Manager Leadning Logistics Supply Company
                    </h6>
                  </div>

                  <div className="carousel-item">
                    <Image
                      className="rating"
                      src={_IMG.ratingStarts}
                      alt={""}
                      loading="lazy"
                    />
                    <p>
                      &quot;Achieved 99.9% compliance in our email transactions,
                      enhancing trust with our clients. This tool is
                      indispensable for fintech.&quot;
                    </p>

                    <span className="userImage">
                      <Image src={_IMG.gracia} alt={""} loading="lazy" />
                    </span>
                    <h5>L. Garcia</h5>
                    <h6>Compliance Officer, Fintech from UK</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TestimonialsContainer;
