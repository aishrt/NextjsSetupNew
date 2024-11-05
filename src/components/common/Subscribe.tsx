"use client";

import { postFetcher } from "@/@core/apiFetcher";
import { API_ROUTES } from "@/@core/apiRoutes";
import { Button } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

const SubscribeNewsLetter = ({ govt = false }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onSubscribeHandler = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res: any = await postFetcher(API_ROUTES.SUBSCRIBE_NEWSLETTER, {
        email,
      });
      if (res.code === 200) {
        toast.success(res.message);
        setIsLoading(false);
        setEmail("");
      } else {
        setEmail("");
        setIsLoading(false);
        toast.error(res.message || "An unexpected error occurred");
      }
    } catch (error) {
      setEmail("");
      setIsLoading(false);
      console.error("Failed to Add user", error);
    } finally {
      setIsLoading(false);
      // setEmail('')
    }
  };

  return (
    <div className={`subscribe ${govt ? "govt" : ""}`}>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="subscribe__Form">
              <h3>Subscribe to Our Newsletter</h3>
              <p>
                Stay updated with the latest product news and email authentication tips by subscribing to our newsletter.
              </p>
              <div className="row">
                <div className="col-xl-7 mx-auto">
                  <form className="subscribeForm" onSubmit={onSubscribeHandler}>
                    <div className="form-group">
                      <input
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        value={email}
                        required
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                      />
                    </div>
                    <div></div>
                    {/* <button className="btn main-button-dark"
                                        >
                                            {isLoading ? `Please wait...` : `Subscribe`}
                                        </button> */}

                    <Button
                      className="btn main-button-dark"
                      style={{ width: "175px" }}
                      disabled={isLoading}
                    >
                      Subscribe
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SubscribeNewsLetter;
