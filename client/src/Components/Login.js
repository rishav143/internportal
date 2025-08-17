import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from "axios"
import styles from "../CSSModule/Login.module.css"
export default function Login({ setDisplay }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    Axios.defaults.withCredentials = true
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email || !password) {
            setError("Please fill all the fields")
            return
        }
        Axios.post("http://localhost:3000/auth/login", {
            email,
            password
        }).then(response => {
            if (response.data.status) {
                setDisplay(() => ({ profile: true }))
                navigate("/")
            }
        }).catch(err => {
            setError(err)
        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Login</h2>
            </div>
            <form onSubmit={handleSubmit}>
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
                <button className={styles.button}>Login</button>
                <div className={styles.linkContainer}>
                    <p>Don't have an account?</p>
                    <button type="button" className={styles.linkButton} onClick={() => navigate('/signup')}>Sign Up</button>
                </div>
                {error && <p className={styles.errorMessage}>{error}</p>}
            </form>
        </div>
    )
}
