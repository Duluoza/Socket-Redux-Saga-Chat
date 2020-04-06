import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Input } from 'antd';

import { loginAction } from '../../redux/actions'
import './AuthPage.css'

const AuthPage = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('');

    const onChangeHandle = (e) => {
        setName(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        
        if(name && 0 < name.length){
            dispatch(loginAction(name))
            setName('')
        } else {
            alert('Имя не может быть пустым')
        }
    }

    return (
        <div className='auth'>
                    <Input 
                        size="large" 
                        placeholder="Enter your name" 
                        value={name}
                        onChange={onChangeHandle}
                        onPressEnter={onSubmit}
                    />
        </div>
    )
}

export default AuthPage
