"use client";
import HeaderNavigation from "@/components/Layout/Header/HeaderNavigation";

export default function HomePage() {
  return (
    <>
      <div className="welcomeScreen">
        <div className="header animate__fadeInUp">
          <HeaderNavigation />
        </div>
        <div className="container">
          <div className="onboarding mt-5 mb-5">
            <h3>Welcome to YOUR DMARC!</h3>
            <br />
            <br />
            <p>
              We are thrilled to have you onboard. As your trusted partner, we
              are committed to simplifying your email security management and
              providing you with a seamless experience.
            </p>
            <p>Here is how you can get started:</p>

            <h5>Step 1: Register Your Domain</h5>
            <p>
              Kickstart your journey by registering your domain with us. This
              process involves providing us with the necessary information about
              your domain. It is simple and straightforward!
            </p>

            <h5>Step 2: Publish DNS Records</h5>
            <p>
              After registering your domain, the next step is to publish the DNS
              records we provide. This crucial step allows our service to
              effectively monitor and manage YOUR DMARC, SPF, and DKIM records,
              ensuring optimal email security.
            </p>

            <h5>Step 3: Enjoy Enhanced Email Security</h5>
            <p>
              With your domain registered and DNS records published, you are all
              set! You can now enjoy enhanced email security, protecting your
              domain from spoofing and phishing attacks.
            </p>
            <p>
              Remember, our dedicated support team is always ready to assist
              you. Whether you have a question or need help with the setup
              process, do not hesitate to reach out.
            </p>
            <p>
              Thank you for choosing YOUR DMARC. You have taken a significant
              step towards bolstering your email security. We are excited to be
              part of your journey!
            </p>
            <p>Welcome aboard!</p>
            <div className="next">
                <button className="screen-button "><a href="/dashboard/add-domain" style ={{color:"white"}}>Next</a></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
