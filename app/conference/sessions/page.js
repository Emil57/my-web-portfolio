import Link from "next/link";

export default function Page() {
    return (
        <>
        <h1>Sessions page!</h1>
        <Link href={"/conference"}>Back To Conference</Link>
        
        </>
    )
}
