/* eslint-disable react/prop-types */
import { useState } from "react";

const ContactForm = ({oldContact = {}, updateCallback}) => {
  const [firstName, setFirstName] = useState(oldContact.firstName)
  const [lastName, setLastName] = useState(oldContact.lastName)
  const [email, setEmail] = useState(oldContact.email)

  const updating = Object.entries(oldContact).length !== 0

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = {
        firstName,
        lastName,
        email
    }
    const url = 'http://127.0.0.1:5000/' + (updating ? `update_contact/${oldContact.id}` : 'create_contact')
    const options = {
      method: updating ? 'PATCH' : 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data)
    }
    const response = await fetch(url, options)
    if (response.status !== 201 && response.status !== 200) {
      const msg = await response.json()
      alert(msg.message)
    } else {
      updateCallback()
    }
  }

  return <form onSubmit={onSubmit}>
    <div>
      <label htmlFor="firstName">First Name</label>
      <input
      type="text"
      id="firstName"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}/>
    </div>
    <div>
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}/>
    </div>
    <div>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>
    </div>
    <button type="submit">{updating ? 'Update' : 'Create'}</button>
  </form>
}

export default ContactForm
