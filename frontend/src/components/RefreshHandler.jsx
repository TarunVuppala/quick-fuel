import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch('/api/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
                const data = await response.json()
                if (data.success) {
                    setIsAuthenticated(true);
                    if (location.pathname === '/' ||
                        location.pathname === '/login' ||
                        location.pathname === '/signup' ||
                        location.pathname === '/agent' ||
                        location.pathname === '/mechanic'
                    ) {
                        navigate('/home', { replace: false });
                    }
                }
            } catch (error) {
                console.log(error);
            }

        }

        verifyToken();
    }, [location, navigate, setIsAuthenticated])

    return (
        null
    )
}

export default RefreshHandler