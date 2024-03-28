import Image from "next/image";
import Link from "next/link";



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-8">

        <Link href={"./users"}>Create User</Link>
        <Link href={"./login"}>Login</Link>
      </div>
    </main>
  );
}
