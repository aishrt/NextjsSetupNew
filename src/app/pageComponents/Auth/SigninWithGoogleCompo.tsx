"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SigninWithGoogleCompo = ({ btnTitle }: { btnTitle: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    const res = await signIn("google", {
      redirect: false,
      callbackUrl: `/dashboard/dashboard`,
    });
    if (res?.error) {
      toast.error(res.error);
    }
    if (res?.url) {
      toast.success("Logged In");
      router.push(res.url);
    }
    setIsLoading(false);
  };

  
  return (
    <button
      className="btn btn-google"
      type="button"
      disabled={isLoading}
      onClick={loginWithGoogle}
    >
      <img
        alt="This is the Google icon used for signing up"
        src="/assets/images/googleIcon.svg"
        width="auto"
        height="auto"
        loading="lazy"
      />
      {btnTitle}
    </button>
  );
};
export default SigninWithGoogleCompo;
