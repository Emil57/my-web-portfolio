import Link from "next/link";

export default function Page() {
    return (
        <>
        <h1>Settings page!</h1>
        <Link href={"/settings/profile"}>Profile</Link>
        </>
    )
}
