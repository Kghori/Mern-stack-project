import { useState,useEffect } from 'react';
import './compo.css';
import {useNavigate} from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [spassword, setSpassword] = useState('');
const Navigate=useNavigate();

    const collectData = async () => {
        console.warn(name, email, password);
        // Basic validation
        if (!name || !email || !password || password !== spassword) {
            console.warn("Please fill in all fields correctly.");
            return;
        }
        
        let result = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
            
        });
    result = await result.json();
    console.log(result);

            // localStorage.setItem('user',JSON.stringify(result.result));
            // localStorage.setItem('token',JSON.stringify(result.auth));
            Navigate("/login");
            window.location.reload();
        
     
    };

    // useEffect(()=>{
    //     const auth=localStorage.getItem('user');
    //     if(auth){
        
    //         // window.location.reload();
    //     }
      
    // })   
    return (
        <div className='con-sign'>
            <div className="signup-container">
                <h1>Sign up</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Confirm Password"
                    value={spassword}
                    onChange={(e) => setSpassword(e.target.value)}
                />
                <input type='submit' onClick={collectData} value='submit'/>
            </div>
        </div>
    );
}

export default Signup;
