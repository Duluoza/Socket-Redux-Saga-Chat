import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

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
            <form action="">
            <input 
                type='text'
                value={name}
                onChange={onChangeHandle}
            />
            <button onClick={onSubmit}>Send</button>
            </form>
        </div>
    )
}

export default AuthPage
