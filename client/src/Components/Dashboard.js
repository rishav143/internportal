import React, { useEffect, useState } from 'react'
import axios, { Axios } from "axios"
import { useNavigate } from 'react-router-dom'
import styles from "../CSSModule/Dashboard.module.css"
export default function Dashboard({ setDisplay }) {
    const [appliedOppurtunites, setAppliedOppurtunities] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/auth/verify`).then((res) => {
            if (!res.data.status) {
                setDisplay(() => ({ profile: false }))
                navigate("/login")
            } else {
                setDisplay(() => ({ profile: true }))
                fetchAppliedOppurtunities()
            }
        })
    }, [navigate])
    const fetchAppliedOppurtunities = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/applied-oppurtunities`)
            setAppliedOppurtunities(response.data)
        } catch (error) {

        }
    }
    const handleLogout = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`)
            .then((res) => {
                if (res.data.status) {
                    setDisplay(() => ({ profile: false }))
                    navigate("/login")
                }
            }).catch((err) => {
                console.log(err)
            })
    }
    function handleCancel(index) {
        try {
            const opportuniteToDelete = appliedOppurtunites[index]
            axios.delete(`${process.env.REACT_APP_API_URL}/auth/applied-oppurtunities`, {
                data: { id: opportuniteToDelete._id }
            }).catch((err)=> {
                console.log(err)
            })
            const newOpportunities = appliedOppurtunites.filter((_, idx) => idx !== index);
            setAppliedOppurtunities(newOpportunities);
        }
        catch (error) {
            console.error('Error deleting opportunity:', error);
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Dashboard</h1>
                <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
            </div>
            <h2>Applied Oppurtunities</h2>
            <div className={styles.opportunitiesContainer}>
                {appliedOppurtunites.map((oppurtunity, index) => (
                    <div key={index} className={styles.opportunityCard}>
                        <h1>{oppurtunity.profile_name}</h1>
                        <p><strong>Company: </strong> {oppurtunity.company_name}</p>
                        <p><strong>Stipend: </strong> {oppurtunity.stipend}</p>
                        <p><strong>Duration: </strong> {oppurtunity.duration}</p>
                        <button onClick={() => handleCancel(index) }className={styles.cancelButton}>Click to cancel</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
