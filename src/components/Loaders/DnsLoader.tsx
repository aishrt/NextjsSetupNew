import { Skeleton } from "@mui/material";

export default function DNSLoader() {
  return (
    <>
      <div className="row m-2">
        <div className="col-sm-1">
          <Skeleton
            animation="wave"
            variant="circular"
            width={80}
            height={80}
          />
        </div>
        <div className="col-sm-6">
          <Skeleton animation="wave" variant="text" height={80} />
        </div>
      </div>
      <div className="row m-2">
        <div className="col-sm-1">
          <Skeleton
            animation="wave"
            variant="circular"
            width={80}
            height={80}
          />
        </div>
        <div className="col-sm-6">
          <Skeleton animation="wave" variant="text" height={80} />
        </div>
      </div>
      <div className="row m-2">
        <div className="col-sm-1">
          <Skeleton
            animation="wave"
            variant="circular"
            width={80}
            height={80}
          />
        </div>
        <div className="col-sm-6">
          <Skeleton animation="wave" variant="text" height={80} />
        </div>
      </div>
      <div className="row m-2">
        <div className="col-sm-1">
          <Skeleton
            animation="wave"
            variant="circular"
            width={80}
            height={80}
          />
        </div>
        <div className="col-sm-6">
          <Skeleton animation="wave" variant="text" height={80} />
        </div>
      </div>
    </>
  );
}
