import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";


export default function LandingLayout() {
    return (
        <div style={{
            backgroundImage: 'radial-gradient(rgba(125, 112, 112, 0.75) 2px, transparent 2px)',
            backgroundSize: '48px 48px',
            backgroundColor: '#ffffff',
        }}
            className="h-screen"
        >
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}
