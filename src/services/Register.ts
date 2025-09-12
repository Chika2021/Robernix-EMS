import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { RegisterModel } from "../model/RegisterModel"
import { apiUrl } from "../deployment/deploy"




export const RegisterUser = async (user: RegisterModel):Promise<{token:string, role?:string}> => {
    const response = await fetch(`${apiUrl}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(user)
    })

    if(!response.ok) {
        throw new Error('Registration Failed')
    }
    return response.json()
}

export const Register = () => {
    const navigate = useNavigate()
   
  
    const [name, setName ] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [accountName, setAccountName] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [bankName, setBankName] = useState('')

    // const [error, setError]= useState<string | null>(null)
    // const [loading, setLoading] = useState(true)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

    // setLoading(true)
    // setError(null)

    if(!name) {
        throw new Error('Invalid Registration Name')
    } else if(!email) {
        throw new Error('Invalid Email')
    } else if(!password) {
        throw new Error('Invalid Password')
    } else if(!phoneNumber) {
        throw new Error('Invalid Phone Number')
    } else if(!address) { 
        throw new Error('Invalid Address')
    } else if(!city) {
        throw new Error('Invalid City')
    } else if(!country) {
        throw new Error('Invalid Country')
     }     
    
    try{
    const user:RegisterModel = {name, email, password, phoneNumber, address, city, country, accountName, accountNumber, bankName} as RegisterModel
        const register = await RegisterUser(user)
                localStorage.setItem('token', register.token)
                localStorage.setItem('email', email)
                localStorage.setItem('name', name)
                if (register.role) {
                    localStorage.setItem('role', register.role)
                }
                alert('Registration Successful')
                navigate('/dashboard')
    } catch(err) {
        throw new Error(`Failed to Register ${err}`)
    } 
    
}

    return {
        name, setName, 
        email, setEmail, 
        password, setPassword,
    phoneNumber, setPhoneNumber,
        address, setAddress,
        city, setCity,
        country, setCountry,
        accountName, setAccountName,
        accountNumber, setAccountNumber,
        bankName, setBankName,
        
        handleSubmit }

    
    
}

export default Register

// Compare this snippet from src/pages/Login.tsx: