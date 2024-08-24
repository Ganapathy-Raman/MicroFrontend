import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./UserProfile.css";
import UserHeader from '../UserHeader/UserHeader';

function UserProfile() {
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageSrc, setImageSrc] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuEiaDNDqRo6K0Zn_NlRJjAde-B1zommEhIg&s');
    const navigate = useNavigate();

    const id = sessionStorage.getItem("id");
    console.log(id);

    useEffect(() => {
        if (!id) {
            setError('No user ID found in session storage.');
            setLoading(false);
            return;
        }

        const loadAllUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:7878/api/${id}`);
                setForm(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching API data:', err);
                setError('Error fetching API data');
                setLoading(false);
            }
        };

        loadAllUsers();
    }, [id]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageSrc(URL.createObjectURL(file));
        }
    };

    const handleGoBack = () => {
        navigate('/userDashboard');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <UserHeader />
            <div className="profile-card">
                {form ? (
                    <div className="card">
                        <img
                            src={imageSrc}
                            alt="Profile"
                            className="profile-img"
                        />
                        <center>
                            <input type="file" onChange={handleFileChange} />
                        </center>
                        <center>
                            <div className="card-body">
                                <b><h2 className="card-title">{form.userName}</h2></b>
                                <br />
                                <p>Email : {form.email}</p>
                                <br />
                                <p>Date of Birth : {form.dateOfBirth}</p>
                                <br />
                                <p>Gender : {form.gender}</p>
                                <br />
                                <p>Password : {form.password}</p>
                                <br />
                                <button onClick={handleGoBack} className="go-back-button">Go Back</button>
                            </div>
                        </center>
                    </div>
                ) : (
                    <p>No API data available</p>
                )}
            </div>
        </>
    );
}

export default UserProfile;
