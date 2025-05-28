import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import logo from '../assets/leadM-Logo.svg'

export default function Home() {
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4004/api/leads'
    const {register, handleSubmit, reset, formState: {errors}} = useForm()
    const [leads, setLeads] = useState([])
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage ] = useState(null)

    // fetch leads on component mount
    useEffect(() => {
      const fetchLeads = async () => {
        setLoading(true);
        try {
          const response = await axios.get(baseURL)
          setLeads(response.data.reverse())          
        } catch (error) {
          setErrorMessage('Failed to fetch leads')
          console.error('Error fetching leads: ', error);
        }finally {
          setLoading(false)
        }        
      };
      fetchLeads() 
    }, [])

    //handle form submission
    const handleFormSubmit = async (data) => {
      setErrorMessage(null)  // clear previous errors
      setLoading(true)
      try {
          const response = await axios.post(baseURL, data)
          reset()
          setLeads([response.data, ...leads]) // refresh lead list
      } catch (error) {
          const message = error.response?.data?.error || 'Failed to create lead';
          setErrorMessage(message)
      } finally {
        setLoading(false);
      }
    }


  return (
    <div className='px-6 mt-6 max-w-[860px] mx-auto ' >
      <div className="flex items-center">
        <img src={logo} alt="Lead Manager Logo" className='h-8' />
        <h1 className='text-3xl ml-2' >Lead Manager</h1>
      </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}
          className='mt-3 flex flex-col sm:flex-row gap-2'
        >
          <input type="text" placeholder='Name' {...register('name', {required: 'Name is required'})}
            className='px-2 py-1 w-full border border-gray-400 rounded-md outline-none '
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message || "Name is required"}</span>
          )}
          <input type="email" placeholder='Email Address' {...register('email', {required: 'Email address is required', pattern: {value: /^\S+@\S+\.\S+$/, message: 'Invalid email address'}})}
            className='px-2 py-1 w-full border border-gray-400 rounded-md outline-none '
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message || "Email address is required"}</span>
          )}

          <select {...register('status', {required: 'Status is required'})} 
            className='px-2 py-1 w-full border border-gray-400 rounded-md outline-none'
          >
            <option value="New">New</option>
            <option value="Engaged">Engaged</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Closed-Won">Closed-Won</option>
            <option value="Closed-Lost">Closed-Lost</option>
          </select>
          {errors.status && (
            <span className="text-red-500">{errors.status.message || "Status is required"}</span>
          )}

          <button type='submit' className='mx-auto px-12 sm:px-1 py-1 w-fit sm:w-[300px] bg-green-400 border border-gray-400 rounded-md outline-none' >{loading ? 'Adding...' : 'Add Lead'}</button>

        </form>
        {errorMessage && (
          <div className="text-red-500 mb-2">{errorMessage}</div>
        )}

        <div className="">
          <h3 className='text-xl my-3' >Leads</h3>
          {loading ? (
              <div className="min-h-[80vh] flex items-center justify-center">
                <div className="text-center">
                  <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400 mx-auto'></div>
                  <p className="mt-4">Loading Leads...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2  ">
                {leads.map((lead) => (
                  <div key={lead._id} className="border border-gray-500 px-2 py-0.5 rounded-sm ">
                    <p>Name : <span>{lead.name}</span> </p>
                    <p>Email : <span>{lead.email}</span> </p>
                    <p>Status : <span>{lead.status}</span> </p>
                    <p>Created At : <span>{new Date(lead.createdAt).toLocaleString()}</span> </p> 
                  </div>
                ))}
              </div>
          )}
        </div>
    </div>
  )
}
