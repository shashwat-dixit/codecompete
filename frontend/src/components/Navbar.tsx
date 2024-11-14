import { Link } from 'react-router-dom'
import { Code } from 'lucide-react'

const navLinks = [
    { label: 'Compete', href: '/compete' },
    { label: 'Problems', href: '/problems' },
    { label: 'Rankings', href: '/ranking' },
    { label: 'Profile', href: '/profile' },
    { label: 'Login', href: '/login' },
]

export default function Navbar() {
    return (
        <div className="flex items-center justify-between mt-10 px-4">
            <Link to="/">
                <div className='flex items-center space-x-2'>
                    <Code size={35} />
                    <h1 className='text-2xl'>CodeCompete</h1>
                </div>
            </Link>
            <div className="flex items-center space-x-6">
                {navLinks.map((link) => (
                    <Link to={link.href} key={link.href} className="text-lg border-2 px-3 py-1">
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}
