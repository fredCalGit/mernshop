import React, {useState, useEffect} from 'react'
import {auth } from '../../firebase.js'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {LoadingOutlined, MailOutlined } from '@ant-design/icons';
import {Button} from 'antd'


const ForgotPassword = ({history}) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    
    const {user} = useSelector((state) => ({...state}))

    useEffect(() => {
        if(user && user.token) {
            history.push('/')
        }
    }, [user, history])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true
        }

        await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
            setEmail('')
            setLoading(false)
            toast.success('Check your email for password reset link')
        })
        .catch((err) => {
            setLoading(false)
            console.log('ERROR MSG IN FORGOT PASSWORD', err)
            toast.error(err.message)
        })
        
    }
    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? <LoadingOutlined /> : <h4>Password Recovery</h4>}
            <form onSubmit={handleSubmit}>
                <input type='email' className='form-control' value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" autoFocus />
                <br />
                <Button
            onClick={handleSubmit} 
            type="primary" 
            className="mb-3"
            block
            shape="round"
            icon={<MailOutlined />}
            size="large"
            disabled={!email}
            >
            
            Submit
            </Button>
            </form>
        </div>
    )
}

export default ForgotPassword

