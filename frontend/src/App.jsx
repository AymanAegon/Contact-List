import { useState, useEffect } from 'react'
import ContactList from './ContactList'
import ContactForm from './ContactForm'
import './App.css'

function App() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})


  useEffect(() => {
    fetchContacts()
  }, [])
  const fetchContacts = async () => {
    const response = await fetch('http://127.0.01:5000/contacts')
    const data = await response.json()
    setContacts(data.contacts)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }
  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }
  const openUpdateModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }
  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  return <>
    <ContactList contacts={contacts} updateContact={openUpdateModal} updateCallback={onUpdate}/>
    <button onClick={openCreateModal}>Create Contact</button>
    { isModalOpen && <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={closeModal}>&times;</span>
        <ContactForm oldContact={currentContact} updateCallback={onUpdate}/>
      </div>
    </div> }
    
  </>
}

export default App
