import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function MechanicRefreshHandler({setIsAuthenticated}) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken=async()=>{
            const token=localStorage.getItem('token')
            const response=await fetch('/api/mechanic/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            const data=await response.json()
            console.log(data);
            if (data.success) {
                setIsAuthenticated(true);
                if (location.pathname === '/' ||
                    location.pathname === '/home' ||
                    location.pathname === '/login' ||
                    location.pathname === '/mechanic/login' ||
                    location.pathname === '/mechanic/signup' ||
                    location.pathname === '/signup'
                ) {
                    navigate('/mechanic', { replace: false });
                }
            }
        }

        verifyToken();
    }, [location, navigate, setIsAuthenticated])

    return (
        null
    )
}

export default MechanicRefreshHandler