import { Link } from 'react-router-dom'
import { User, Code } from 'lucide-react'

const navLinks = [
    { label: 'Compete', href: '/compete' },
    { label: 'Problems', href: '/problems' },
    { label: 'Rankings', href: '/rankings' },
    { label: 'Login', href: '/login' },
    { label: <User />, href: '/profile' },
]

export default function Navbar() {
    return (
        <div className="flex items-center justify-between px-4 py-2 mb-2">
            <Link to="/">
                <div className='flex items-center space-x-2'>
                    <Code size={35} />
                    <h1 className='text-2xl'>CodeCompete</h1>
                </div>
            </Link>
            <div className="flex items-center space-x-6 mr-6">
                {navLinks.map((link) => (
                    <Link to={link.href} key={link.href} className="text-lg border rounded-md px-3 py-1 mt-1">
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}
