import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AdminProfile.css";
import Header from '../Header/Header';

function AdminProfile() {
    const [api, setApi] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await axios.get('http://localhost:7878/api/4');
                setApi(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching api data:', err);
                setError('Error fetching api data');
                setLoading(false);
            }
        };

        fetchApi();
    }, []);

    const handleGoBack = () => {
        navigate('/adminDashboard');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
        <Header />
        <div className="profile-card">
            {api ? (
                <div className="card">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuEiaDNDqRo6K0Zn_NlRJjAde-B1zommEhIg&s" alt="Profile" className="profile-img" />
                    <center><div className="card-body">
                        <b><h2 className="card-title">{api.userName}</h2></b>
                        <br />
                        <p>Email : {api.email}</p>
                        <br />
                        <p>Date of Birth : {api.dateOfBirth}</p>
                        <br />
                        <p>Gender : {api.gender}</p>
                        <br />
                        <p>Password : {api.password}</p>
                        <br />
                        <button onClick={handleGoBack} className="go-back-button">Go Back</button>
                    </div></center>
                </div>
            ) : (
                <p>No api data available</p>
            )}
        </div>
        </>
    );
}

export default AdminProfile;
