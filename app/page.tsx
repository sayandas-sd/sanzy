import { Appbar } from "@/components/Appbar";
import Image from "next/image";

export default function Home() {
  console.log(process.env.GOOGLE_CLIENT_ID)
  console.log(process.env.GOOGLE_CLIENT_SECRET)
  return (
    <main>
      <Appbar />
    </main>
  );
}
