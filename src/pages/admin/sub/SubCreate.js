import React,{useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createSub, getSubs, getSub, removeSub} from '../../../functions/sub'
import {createCategory, getCategories, removeCategory} from '../../../functions/category'
import {Link} from 'react-router-dom'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'

const SubCreate = () => {
    const user = useSelector(state => state.user)
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    const [subs, setSubs] = useState([])
    const [keyword, setKeyword] = useState('')
    
    useEffect(() => {
        loadCategories()
        loadSubs()
    }, [])
    
    
    const loadCategories = () => {
        getCategories().then((c) => setCategories(c.data))
    }

    const loadSubs = () => getSubs().then((s) => setSubs(s.data))
    

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(name)
        setLoading(true)
        createSub({name, parent: category}, user.token)
        .then((res) =>{
            console.log(res)
            setLoading(false)
            setName('')
            toast.success(`"${name}" is created`)
            loadSubs()
            
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
            if(err.response.status === 400) toast.error(err.response.data)
        })
    }

    const handleRemove = async (slug) => {
        let answer = window.confirm('Delete?')
        console.log(answer, slug)

        if (answer) {
            setLoading(true)
            removeSub(slug, user.token)
            .then(res => {
                setLoading(false)
                toast.success(`"${res.data.name}" deleted`)
                loadSubs()

            })
            .catch((err) =>{
                console.log(err)
                if(err.response.status === 400) {
                    setLoading(false)
                    toast.error(err.response.data)
                }
            })
        }
    }
  

    const searched = (keyword) => (c) => c.name.toLowerCase().trim().includes(keyword)
    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Create sub category</h4>} 
                    
                    <br />

                    <div className="form-group">
                        <label>Parent Category</label>
                        <select 
                        name="category" 
                        className="form-control" 
                        onChange={(e) => setCategory(e.target.value)}
                        >
                        <option disabled>Please Select</option>
                        
                            {categories.length > 0 && categories.map((category) => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />
                    <br />
                    {subs.filter(searched(keyword)).map(s => (
                        <div key={s._id} className="alert alert-primary">
                            {s.name}{' '}
                            <span onClick={() => handleRemove(s.slug)} className="btn btn-sm float-right">
                                <DeleteOutlined className="text-danger" />
                            </span>
                            <Link to={`/admin/sub/${s.slug}`}>
                                <span className="btn btn-sm float-right">
                                    <EditOutlined className="text-warning" />
                                </span>
                            </Link>
                        </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default SubCreate
