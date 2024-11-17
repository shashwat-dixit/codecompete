import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";


export default function LandingLayout() {
    return (
        <div className="h-screen">
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}
