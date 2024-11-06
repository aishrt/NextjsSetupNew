"use client";
import { FormEvent, Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  cleanDomain,
  validateDomainName,
  removeHttp,
} from "@/utils/string-conversion";
import { toast } from "react-toastify";
import CircularSpinner from "@/components/Loaders/CircularSpinner";

const ScannerSection = ({
  scannerSectionClass,
  progressSpinner,
}: {
  scannerSectionClass?: string;
  progressSpinner?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  let domain: string = removeHttp(searchParams.get("domain") as string) || "";

  const [inputDomain, setInputDomain] = useState(cleanDomain(domain || ""));
  const [domainError, setDomainError] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);

  useEffect(() => {
    if (domain) {
      setInputDomain(cleanDomain(domain));
    }
  }, [domain]);

  const onCheckResults = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBtnLoader(true);

    const formData = new FormData(event.currentTarget);
    const currentDomain = (formData.get("domain") as string) || "";
    const formDomain = cleanDomain(currentDomain);
    const isValid = validateDomainName(formDomain);

    if (isValid) {
      setDomainError(false);
      setInputDomain(formDomain);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push(`/domain-scanner?domain=${formDomain}`);
    } else {
      setDomainError(true);
      toast.error("Invalid domain or email address.");
    }

    setBtnLoader(false);
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="scannerSection" id="domainScannerSectionId">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className={`scannerSection__Content ${scannerSectionClass}`}>
                <h2>Domain Scanner</h2>
                <p>
                  Analyze your domain for potential email issues and
                  vulnerabilities with our{" "}
                  <strong>email domain check tool.</strong>
                </p>
                <div className="row">
                  <div className="col-xl-7 mx-auto">
                    <form onSubmit={onCheckResults}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Type your domain or email"
                          name="domain"
                          value={inputDomain}
                          onChange={(e) => setInputDomain(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        title="Show Results"
                        className="btn"
                        type="submit"
                        disabled={btnLoader}
                      >
                        {btnLoader ? <CircularSpinner /> : "Show Results"}
                      </button>
                    </form>
                    {domainError && (
                      <span className="error">
                        Please enter a valid domain or email.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ScannerSection;
