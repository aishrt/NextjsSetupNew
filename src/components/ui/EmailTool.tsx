import Link from "next/link";

const EmailTool = () => {
  return (
    <div className="emailTool mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="emailTool__Content">
              <h2>The ultimate email compliance tool</h2>
              <div className="col-lg-10 mx-auto">
                <form className="mt-5">
                  <div className="row">
                    <div className="col-lg-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>

                    <div className="col-lg-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email Address"
                      />
                    </div>

                    <div className="col-lg-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Message"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <Link href="/signup">
                      <button className="submitBtn">Submit</button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmailTool;
