import { Skeleton } from "@mui/material";

export default function SenderDashboardLoader() {
  return (
    <div className="container-fluid pt-4">
      <h2 className="mb-4">Investigation results</h2>
      <div className="row">
        <div className="col-lg-7">
          <div className="table-responsive">
            <table className="table table-striped  colorBlackata">
              <tbody>
                <tr>
                  <td>
                    {" "}
                    <Skeleton animation="wave" variant="text" height={30} />
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <Skeleton animation="wave" variant="text" height={30} />
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <Skeleton animation="wave" variant="text" height={30} />
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <Skeleton animation="wave" variant="text" height={30} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card-body">
            <Skeleton animation="wave" variant="text" height={80} />
          </div>
        </div>
      </div>

      <div className="row  mb-3 ">
        <h4>
          {" "}
          <Skeleton animation="wave" variant="text" height={60} width={600} />
        </h4>
        <div className="col-lg-12">
          <div className="sdinfo ms-0">
            <Skeleton animation="wave" variant="text" height={80} />
          </div>
        </div>

        <div className="col-lg-12">
          <div className="sdinfo mt-3 ms-0">
            <h5>
              <Skeleton animation="wave" variant="text" height={80} />
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
