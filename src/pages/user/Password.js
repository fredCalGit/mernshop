import React, {useState} from 'react'
import UserNav from '../../components/nav/UserNav'
import {auth} from '../../firebase'
import {toast} from 'react-toastify'

const Password = () => {
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const checkPassword = password === passwordConfirm 
    const checkPasswordValue = password.length > 0 && passwordConfirm.length > 0
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await auth.currentUser.updatePassword(password)
        .then(() => {
            setLoading(false)
            setPassword('')
            setPasswordConfirm('')
            toast.success('Password updated')
        })
        .catch(err => {
            setLoading(false)
            toast.error(err.message)
            console.log(err)
        })

    }

    const passwordUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>New password</label>
                <input 
                type="password" 
                onChange={e => setPassword(e.target.value)} 
                className="form-control"
                placeholder="Enter new password"
                disabled={loading}
                value={password}
                />
                <br />
                <label>Confirm new password</label>
                <input 
                type="password" 
                onChange={e => setPasswordConfirm(e.target.value)} 
                className="form-control"
                placeholder="Enter new password"
                disabled={loading}
                value={passwordConfirm}
                />
                <br />
                <p>{checkPassword && checkPasswordValue ? 'Ready to submit' : 'Please provide new password and confirm'}
                
                </p>
                <button className="btn btn-primary" disabled={!password || loading || password.length < 6 || !checkPassword}>Submit</button>
            </div>
        </form>
    )
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                   {loading ? <h4 className="text-danger">Loading</h4> : <h4>Password Update</h4>} 
                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    )
}

export default Password