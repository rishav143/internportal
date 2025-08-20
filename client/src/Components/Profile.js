import React, { useEffect, useState } from 'react';
import api from '../api';
import styles from '../CSSModule/Profile.module.css';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    api.get(`/auth/profile`)
      .then(response => {
        if (!response.data.status) {
          navigate("/login")
        } else {
          setUser(response.data.user);
        }
      })
      .catch(error => {
        console.log('Error fetching user details:', error);
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.profileHeading}>Profile</h1>
      <div className={styles.profileDetails}>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}