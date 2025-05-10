import Image from "next/image";

export default function Home() {
  return (
   <div>
      <h1 className="text-3xl font-bold underline">Hello Leads!</h1>
      <Image
        src="/Elvo_logo_transparent.png"
        alt="Elvo Logo"
        width={180}
        height={37}
        priority
      />
      <p className="mt-4 text-lg">
        Get started by editing&nbsp;
        <code className="font-mono font-bold">app/page.tsx</code>
      </p>
   </div>
  );
}
