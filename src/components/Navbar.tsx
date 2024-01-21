import Link from "next/link"
import { Button } from "@/components/ui/button"

const Navbar = () => {
  return (
    <header className="shadow-sm">
        <nav className="max-w-5xl m-auto px-3 py-5 flex items-center justify-between">
            <Link href="/" className="text-xl sm:text-2xl font-bold tracking-tighter">Jobs Portal</Link>
            <Button asChild size={"sm"}>
                <Link href="jobs/new">Create Jobs</Link>
            </Button>
        </nav>
    </header>
  )
}

export default Navbar