import { Skeleton } from "@mui/material";

export default function EmailActionLoader() {
  return (
    <>
      <div className="py-2">
        <Skeleton animation="wave" variant="text" height={100}/>
        <Skeleton animation="wave" variant="text" height={100}/>
        <Skeleton animation="wave" variant="text" height={100}/>
        <Skeleton animation="wave" variant="text" height={100}/>
      </div>
    </>
  );
}
