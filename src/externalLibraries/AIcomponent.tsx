"use client";
import { useEffect, useState } from "react";
import OpenAI from "openai";
import { remark } from "remark";
import html from "remark-html";
import { useStore } from "@/utils/store";
import getCurrentUser from "@/lib/session";
import { useRouter } from "next/navigation";
import InformationTooltip from "@/app/pageComponents/Others/InformationTooltip";
import JsonLdScript from "../components/Functions/JsonLdScript";
import MainLoader from "../components/Loaders/MainLoader";
import { _ENV_VARIABLES } from "@/constants/envVariables";

const OPENAI_API_KEY = _ENV_VARIABLES.NEXT_PUBLIC_OPENAI_API_KEY;
const PUBLIC_URL = _ENV_VARIABLES.NEXT_PUBLIC_URL;
const SECRET_KEY = _ENV_VARIABLES.NEXT_PUBLIC_SECRET_KEY;

const AIComponent = ({
  domain,
  base_domain,
  row_source_ip,
  data,
}: {
  domain?: any;
  base_domain?: any;
  row_source_ip?: any;
  data?: any;
}) => {
  const { subscriptionPlan, license } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [chatResponse, setChatResponse] = useState("");
  const [formattedChatResponse, setFormattedChatResponse] = useState("");

  const chatGpt = async () => {
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
    try {
      const response: any = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Please provide a overall interpretation of given below DMARC Auth results based on the following information. also add content if you think its phishing and malicious attempt to send email. Dont explain each tags . Make information in human understandable form in 2 section Overall Interpretation & Final Result (its reason)
            policy_published_domain=${domain},
            base_domain=${base_domain},
           row_source_ip=${row_source_ip},
           ${
             data?.data?.row_policy_evaluated_spf !== undefined
               ? ",SPF Result - " + data?.data?.row_policy_evaluated_spf
               : ""
           }${
              data?.data?.row_policy_evaluated_dkim !== undefined
                ? ",DKIM Result - " + data?.data?.row_policy_evaluated_dkim
                : ""
            }${
              data.compliance !== undefined
                ? ",Compliance -" + data.compliance
                : ""
            }${
              data?.data?.disposition !== undefined
                ? ",Disposition - " + data?.data?.disposition
                : ""
            } `,
          },
        ],
        stream: true,
      });
      for await (const chunk of response) {
        setChatResponse(
          (prevData) => prevData + (chunk.choices[0]?.delta?.content || "")
        );
      }
    } catch (error: any) {
      console.log({ error: error.message });
    }
  };
  useEffect(() => {
    if (subscriptionPlan == "PREMIUM") {
      chatGpt();
    }
  }, [subscriptionPlan]);

  useEffect(() => {
    if (chatResponse) {
      const modifiedResponse = chatResponse.replace(
        /Finalesult :|Final Result|Final Result:/gi,
        "**$&**"
      );
      remark()
        .use(html)
        .process(modifiedResponse)
        .then((file) => {
          setFormattedChatResponse(String(file));
        });
    }
  }, [chatResponse]);

  const manageChangePlan = async () => {
    setIsLoading(true);
    const user = await getCurrentUser();

    await fetch("https://api.stripe.com/v1/billing_portal/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${SECRET_KEY}`,
      },
      body: `customer=${license?.stripe_customer_id}&return_url=${PUBLIC_URL}/dashboard/dashboard`,
    })
      .then((response) => response.json())
      .then((data) => {
        const url = data.url;

        router.push(url);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (license && Object.keys(license).length > 0) {
      setIsLoading(false);
    }
  }, [license]);
  if (isLoading) {
    return <MainLoader />;
  }
  return (
    <>
      {license?.ai_analytics == true ? (
        <div className="col-xl-12">
          <div className="card mt-4 mb-4 aiCard">
            <div className="card-header text-start  bg-transparent">
              <h4>
                AI Analytics <InformationTooltip name="AI_analytics" />
              </h4>
            </div>
            <div className="card-body chatBoxInd">
              <JsonLdScript data={formattedChatResponse} />
              <div
                dangerouslySetInnerHTML={{
                  __html: formattedChatResponse,
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="col-xl-12">
          <div className="card mt-4 mb-4 aiCard">
            <div className="card-header text-start  bg-transparent">
              <h4>
                AI Analytics <InformationTooltip name="AI_analytics" />
              </h4>
            </div>
            <div className="card-body chatBoxInd">
              <p>
                <span className="boldTexts">Overall Interpretation:</span> The
                DMARC authentication results for an email from the domain
                xyz.org, which is hosted on the base domain evernet.net.co,
                showOverall Interpretation that both SPF: The DM and DKIMARC
                authentication authentication have failed results for the email
                sent from the domain xyz.org show that both SPF and DKIM. The
                email authentication mechanisms was sent from the IP have
                failed. The address 181 email was sent from the source IP
                address 181.189..189.***.***.***.
                <br />
                <br />
                <span className="boldTexts">Final Result :</span> The lack of
                authentication from both DMARC SPF and DK authentication for
                this email is &quot;IM protocols increasesnone&quot; because the
                policy the risk of this email being published by the spoofed or
                domain xyz.org was not altered by properly enforced due
                unauthorized senders to the failures. The &quot; in both SPF
                Disposition - none&quot; result and DKIM authentication. This
                indicates that the indicates that the email may be suspicious
                and email has not potentially a phishing been marked as spam or
                rejected or malicious attempt to deceive, making it recipients.
                It important for the recipient to exercise is advisable to
                exercise caution when interacting caution when with emails from
                this sender. interacting with the email.
              </p>
              <div className="row">
                <div className="outerSection">
                  {license && license?.plan_name == "Free Plan" ? (
                    <button
                      className="btn"
                      style={{
                        backgroundColor: "#eb5454",
                        color: "#fff",
                        fontWeight: "700",
                      }}
                      type="submit"
                      onClick={() => router.push("/dashboard/pricing")}
                    >
                      Upgrade Plan
                    </button>
                  ) : (
                    <button
                      className="btn"
                      style={{
                        backgroundColor: "#eb5454",
                        color: "#fff",
                        fontWeight: "700",
                      }}
                      type="submit"
                      onClick={() => manageChangePlan()}
                      title="Manage Plan"
                    >
                      Upgrade Plan
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AIComponent;
