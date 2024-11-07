"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { _iterSSEMessages } from "openai/streaming.mjs";
import { _IMG } from "@/constants/images";
import Image from "next/image";

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
      <Image
layout="intrinsic"
        alt="This is the Google icon used for signing up"
        src={_IMG.googleIcon}
        loading="lazy"
      />
      {btnTitle}
    </button>
  );
};
export default SigninWithGoogleCompo;
