import SocialLoginButton from "./components/SocialLoginButton";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <main className="border p-4 border-primary rounded-md flex flex-col gap-5 w-[22.5rem]">
          <section className="flex flex-col gap-2">
            <h1 className=" text-2xl font-bold">Entre na sua conta</h1>
            <p className=" text-slate-400">
              Se ainda não tem uma conta basta entrar com a sua conta do Google
              ou Linkedin
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <SocialLoginButton
              provider="google"
              text="Entrar com Google"
              icon="/google-icon.svg"
            />
            <SocialLoginButton
              provider="linkedin"
              text="Entrar com Linkedin"
              icon="/linkedin-icon.svg"
            />
          </section>
        </main>
      </div>
    </>
  );
}
