import { useEffect, useState } from 'react';
import './compo.css'
import { useNavigate } from 'react-router-dom';

function Login() {

    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();


    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            Navigate("/");
        }
    })
    const handlelogin = async () => {
        console.log(email, password);
        let result = await fetch('http://localhost:4000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            Navigate('/');

        }
        else {
            alert("please enter correct detail")
        }
    }
    return (<>
        <div className='con-sign'>
            <div className="signup-container">
                <h1>Sign up</h1>
                <input
                    type="text"
                    placeholder="email"
                    onChange={(e) => setemail(e.target.value)}

                />
                <input
                    type="text"
                    placeholder="Password"

                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type='submit' onClick={handlelogin} value='submit' />
            </div>
        </div>

    </>)
}

export default Login;