import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CreateUser } from '../store/UserdetailSlice'
import { useNavigate } from 'react-router-dom'

function Create() {
    const [users , setusers] = useState({})

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getUserData =(e)=>{
        setusers({...users , [e.target.name] : e.target.value})
        console.log(users);
    }
const handleSubmit =(e)=>{
    e.preventDefault()
    console.log(users);
    dispatch(CreateUser(users))
    navigate("/read")
}

    
  return (
    <div className='bg-slate-400'>
          <div className='mx-auto flex flex-col'>
      <h2 className="my-2 flex mx-auto">Fill the data</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>

        <div className="mb-3 flex flex-col">
          <label className="">Name</label>
          <input
            type="text"
            name="name"
            className="px-2 w-full"
            onChange={getUserData}
            required
          />
        </div>
        <div className="mb-3 flex flex-col">
          <label className="">Email</label>
          <input
            type="email"
            name="email"
            className="px-2 w-full"
            onChange={getUserData}
            required
          />
        </div>
        <div className="mb-3 flex flex-col">
          <label className="">Age</label>
          <input
            type="text"
            name="age"
            className="px-2 w-full"
            onChange={getUserData}
            required
          />
        </div>
        <div className='flex '>
        <div className="mb-3 flex">
          <input
            className="form-check-input"
            name="gender"
            value="Male"
            type="radio"
            id='male'
            onChange={getUserData}
            required
          />
          <label className="ml-2" htmlFor='male'>Male</label>
        </div>
        <div className="mb-3 ">
          <input
            className="ml-4"
            name="gender"
            value="Female"
            type="radio"
            id='female'
            onChange={getUserData}
          />
          <label className="ml-2" htmlFor='female'>Female</label>
        </div>
        </div>

        <button type="submit" className="">
          Submit
        </button>
      </form>
    </div>
    </div>
  )
}

export default Create