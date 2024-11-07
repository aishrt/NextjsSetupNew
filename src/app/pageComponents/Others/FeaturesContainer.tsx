import { _IMG } from "@/constants/images";
import Image from "next/image";

const FeaturesContainer = () => {
  return (
    <div className="features wow fadeInUp">
      <div className="container">
        <div className="content text-center">
          <h3>
            Dive into the Features that Make Our Managed
            <br /> Service a Standout Choice Among Clients
          </h3>
          <p>
            Navigating through the intricacies of interpreting and analyzing
            millions of reports daily in YOUR DMARC journey can be highly
            challenging. Our Managed Services Team is here to simplify the
            complexities of DMARC, addressing aspects such as SPF/DKIM
            Alignment, DMARC Overrides, Shadow IT Discovery, and coordinating
            with third parties. Our goal is to facilitate your journey to
            enforcement as efficiently as possible.
          </p>
        </div>
        <div className="feature-card">
          <div className="card-out">
            <div className="row">
              <div className="col-lg-4">
                <div className="card blue wow flipInX">
                  <div className="card-body">
                    <Image
                      className="card-image blue"
                      src={_IMG.budget}
                      alt="Streamline IT"
                      loading="lazy"
                    />
                    <h5 className="card-title">
                      Streamline IT/Operational Budgets
                    </h5>
                    <p className="card-text">
                      Experience freedom from the routine challenges of
                      monitoring and troubleshooting. Redirect your focus to
                      your core business without the need for extra staffing
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card green wow flipInX">
                  <div className="card-body">
                    <Image
                      className="card-image green"
                      src={_IMG.compliance}
                      alt="Compliance"
                      loading="lazy"
                    />
                    <h5 className="card-title">
                      Compliance is a top priority for us
                    </h5>
                    <p className="card-text">
                      Our team`s DMARC Project Plan includes every crucial
                      aspect, ensuring compliance with regulatory authorities
                      and building trust with your customer base.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card red wow flipInX">
                  <div className="card-body">
                    <Image
                      className="card-image red"
                      src={_IMG.support}
                      alt="24/7 Support"
                      loading="lazy"
                    />
                    <h5 className="card-title">
                      Support and guidance for improving DMARC effectiveness
                    </h5>
                    <p className="card-text">
                      Leave the YOUR DMARC Dashboard updates and risk
                      notifications to our dedicated DMARC experts. Your role?
                      Simply relax and enjoy the seamless experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeaturesContainer;
