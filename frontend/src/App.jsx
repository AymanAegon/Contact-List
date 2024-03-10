import { useState, useEffect } from 'react'
import ContactList from './components/ContactList'
import ModalForm from './components/ModalForm'
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
    <ModalForm
      oldcontact={currentContact}
      show={isModalOpen}
      onHide={() => closeModal()}
      updateCallback={onUpdate}
    />
  </>
}

export default App
