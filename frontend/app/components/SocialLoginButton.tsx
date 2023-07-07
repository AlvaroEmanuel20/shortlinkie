"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

interface SocialLoginButton {
  text: string;
  icon: string;
  provider: string;
}

export default function SocialLoginButton({
  text,
  icon,
  provider,
}: SocialLoginButton) {
  return (
    <button
      onClick={() => signIn(provider, { callbackUrl: "/dashboard" })}
      className="flex items-center gap-3 border rounded border-primary py-2 px-16 hover:bg-orange-50 hover:duration-200"
    >
      <Image width={15} height={15} src={icon} alt={text} />
      <span>{text}</span>
    </button>
  );
}

