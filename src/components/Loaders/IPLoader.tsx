import { Skeleton } from "@mui/material";

export default function IPLoader() {
  return (
    <>
      <div className="tab-content" id="myTabContent">
        <div className="summarytab">
          <table className="table table-striped">
            <tbody>
              <tr>
                <td>
                  <Skeleton animation="wave" variant="text" height={50} />
                </td>
                <td>
                  {" "}
                  <Skeleton animation="wave" variant="text" height={50} />
                </td>
              </tr>{" "}
              <tr>
                <td>
                  <Skeleton animation="wave" variant="text" height={50} />
                </td>
                <td>
                  {" "}
                  <Skeleton animation="wave" variant="text" height={50} />
                </td>
              </tr>{" "}
              <tr>
                <td>
                  <Skeleton animation="wave" variant="text" height={50} />
                </td>
                <td>
                  {" "}
                  <Skeleton animation="wave" variant="text" height={50} />
                </td>
              </tr>{" "}
              <tr>
                <td>
                  <Skeleton animation="wave" variant="text" height={50} />
                </td>
                <td>
                  {" "}
                  <Skeleton animation="wave" variant="text" height={50} />
                </td>
              </tr>{" "}
              <tr>
                <td>
                  <Skeleton animation="wave" variant="text" height={50} />
                </td>
                <td>
                  {" "}
                  <Skeleton animation="wave" variant="text" height={50} />
                </td>
              </tr>{" "}
              <tr>
                <td>
                  <Skeleton animation="wave" variant="text" height={50} />
                </td>
                <td>
                  {" "}
                  <Skeleton animation="wave" variant="text" height={50} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
