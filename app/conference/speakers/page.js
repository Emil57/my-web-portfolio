import Link from "next/link";

export default function Page() {
    return (
        <>
        <h1>Speakers page!</h1>
        <h2><Link href={"/conference"}>Back To Conference</Link></h2>
        </>
    )
}
