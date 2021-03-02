import React, {useState} from 'react'
import { Menu } from 'antd';
import { LogoutOutlined,UserOutlined,UserAddOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import {Link, useHistory} from 'react-router-dom'

import firebase from 'firebase'
import {useDispatch, useSelector} from 'react-redux'


const { SubMenu, Item } = Menu;


const Header = () => {

    const [current, setCurrent] = useState('home')
    
    const dispatch = useDispatch()

    let user = useSelector(state => state.user)
    
    let history = useHistory()

    const handleClick = (e) => {
        setCurrent(e.key)
    }

    const logout = () => {
        firebase.auth().signOut()
        dispatch({
            type: 'LOGOUT',
            payload: null
        })
    history.push('/login')
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
           <Item  key="home" icon={<AppstoreOutlined />}>
                <Link to='/'>Home</Link>
            </Item>


           {!user && (
            <Item className="float-right" key="register" icon={<UserAddOutlined />}>
                <Link to="/register">Sign Up</Link>
            </Item>
           )}
           
            {!user && (
                <Item className="float-right" key="login" icon={<UserOutlined />}>
                <Link to="/login">Sign In</Link>
            </Item>

            )}
            
            {user && (
                <SubMenu 
                className="float-right" 
                icon={<SettingOutlined />} 
                title={user.email && user.email.split('@')[0]}
                >
          
                    {user && user.role === 'subscriber' && <Item key="setting:1"><Link to='/user/history'>Dashboard</Link></Item>}
                    {user && user.role === 'admin' && <Item key="setting:1"><Link to='/admin/dashboard'>Dashboard</Link></Item>}
                    
                    <Item icon={<LogoutOutlined />} onClick={logout}>Sign Out</Item>
          
          
        </SubMenu>
            )}
           

            

            

        
        
      </Menu>
    )
}

export default Header
