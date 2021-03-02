import React,{useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {getSub,updateSub} from '../../../functions/sub'
import {createCategory, getCategories, removeCategory} from '../../../functions/category'
import {Link} from 'react-router-dom'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'

const SubUpdate = ({history, match}) => {
    const user = useSelector(state => state.user)
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    
    const [parent, setParent] = useState('')
    
    
    useEffect(() => {
        loadCategories()
        loadSub()
    }, [])
    
    
    const loadCategories = () => {
        getCategories().then((c) => setCategories(c.data))
    }

    const loadSub = () => getSub(match.params.slug).then((s) => {
        setName(s.data.name)
        setParent(s.data.parent)
    })
    

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(name)
        setLoading(true)
        updateSub(match.params.slig, {name, parent}, user.token)
        .then((res) =>{
            console.log(res)
            setLoading(false)
            setName('')
            toast.success(`"${name}" is updated`)
            history.push('/admin/sub')
            
            
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
            if(err.response.status === 400) toast.error(err.response.data)
        })
    }

    

   
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Update sub category</h4>} 
                    
                    <br />

                    <div className="form-group">
                        <label>Parent Category</label>
                        <select 
                        name="category" 
                        className="form-control"
                        
                        onChange={(e) => setParent(e.target.value)}
                        >
                        <option value="" disabled >Please Select</option>
                        
                        
                            {categories.length > 0 && categories.map((category) => (
                                <option key={category._id} value={category._id} selected={category._id === parent}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
                    
                    
                    
                </div>
            </div>
        </div>
    )
}

export default SubUpdate
