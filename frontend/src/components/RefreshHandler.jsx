import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken=async()=>{
            const token=localStorage.getItem('token')
            const response=await fetch('/api/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            const data=await response.json()
            if (data.success) {
                setIsAuthenticated(true);
                if (location.pathname === '/home' ||
                    location.pathname === '/login' ||
                    location.pathname === '/signup'
                ) {
                    navigate('/home', { replace: false });
                }
            }
        }

        verifyToken();
    }, [location, navigate, setIsAuthenticated])

    return (
        null
    )
}

export default RefreshHandler