import Link from "next/link";

export default function Page() {
  return(
    <>
      <h1>Welcome to Global App</h1>
      <h2><Link href={"/home"}>Home Page</Link></h2>
    </>
  )
}
