"use client";

import Image from "next/image";

interface SocialButton {
  text: string;
  icon: string;
}

export default function SocialButton({ text, icon }: SocialButton) {
  return (
    <button className="flex items-center gap-3 border rounded border-primary py-2 px-16 hover:bg-orange-50 hover:duration-200">
      <Image width={15} height={15} src={icon} alt={text} />
      <span>{text}</span>
    </button>
  );
}
