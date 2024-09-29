import Link from "next/link";

export default function Page() {
    return (
        <>
        <h1>Conference page!</h1>
        <h2><Link href={"/conference/sessions"}>Sessions</Link></h2>
        <h2><Link href={"/conference/speakers"}>Speakers</Link></h2>

        </>
    )
}
