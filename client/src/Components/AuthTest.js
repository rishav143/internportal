import React, { useState } from 'react';
import api from '../api';

export default function AuthTest() {
    const [testResult, setTestResult] = useState('');
    const [cookies, setCookies] = useState('');

    const testCookie = async () => {
        try {
            const response = await api.get('/auth/test-cookie');
            setTestResult(JSON.stringify(response.data, null, 2));
            
            // Check browser cookies
            const allCookies = document.cookie;
            setCookies(allCookies || 'No cookies found');
            
        } catch (error) {
            setTestResult(`Error: ${error.message}`);
        }
    };

    const checkAuth = async () => {
        try {
            const response = await api.get('/auth/verify');
            setTestResult(JSON.stringify(response.data, null, 2));
        } catch (error) {
            setTestResult(`Auth Error: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Authentication Test</h2>
            
            <div style={{ marginBottom: '20px' }}>
                <button onClick={testCookie} style={{ marginRight: '10px', padding: '10px' }}>
                    Test Cookie Setting
                </button>
                <button onClick={checkAuth} style={{ padding: '10px' }}>
                    Check Authentication
                </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Browser Cookies:</h3>
                <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
                    {cookies}
                </pre>
            </div>

            <div>
                <h3>API Response:</h3>
                <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px', whiteSpace: 'pre-wrap' }}>
                    {testResult}
                </pre>
            </div>

            <div style={{ marginTop: '20px', padding: '10px', background: '#e8f4fd', borderRadius: '5px' }}>
                <h4>Debug Info:</h4>
                <p><strong>Current URL:</strong> {window.location.href}</p>
                <p><strong>API Base URL:</strong> {api.defaults.baseURL}</p>
                <p><strong>With Credentials:</strong> {api.defaults.withCredentials.toString()}</p>
            </div>
        </div>
    );
}
