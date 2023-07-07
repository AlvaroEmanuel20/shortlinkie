import SocialButton from "./components/SocialButton";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <main className="border p-4 border-primary rounded-md flex flex-col gap-3">
          <SocialButton text="Entrar com Google" icon="/google-icon.svg" />
          <SocialButton text="Entrar com Linkedin" icon="/linkedin-icon.svg" />
        </main>
      </div>
    </>
  );
}
