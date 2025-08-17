import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from "../CSSModule/Signup.module.css"
export default function Signup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        if (!username || !email || !password) {
            setError("Please fill all fields")
            return;
        }
        Axios.post("http://localhost:3000/auth/signup", {
            username,
            email,
            password
        }).then((response) => {
            if (response.data.status) {
                navigate("/login")
            }
        }).catch(() => {
            setError("Internal error occured, please try again.")
        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Sign Up</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="username" className={styles.label}>Username:</label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.button}>Sign Up</button>
                <div className={styles.linkContainer}>
                    <p>Already have an account?</p>
                    <button type="button" className={styles.linkButton} onClick={() => navigate('/login')}>Login</button>
                </div>
                {error && <p className={styles.errorMessage}>{error}</p>}
            </form>
        </div>
    )
}
