/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";

function ModalForm(props) {
    const updating = Object.entries(props.oldcontact).length !== 0

    let [firstName, setFirstName] = useState(props.oldcontact.firstName)
    let [lastName, setLastName] = useState(props.oldcontact.lastName)
    let [email, setEmail] = useState(props.oldcontact.email)
    if (updating) {
        firstName = props.oldcontact.firstName
        lastName = props.oldcontact.lastName
        email = props.oldcontact.email
    }
    // console.log(props, email)
  
    const onSubmit = async (e) => {
      e.preventDefault()
      const data = {
          firstName,
          lastName,
          email
      }
      const url = 'http://127.0.0.1:5000/' + (updating ? `update_contact/${props.oldcontact.id}` : 'create_contact')
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
        props.updateCallback()
      }
    }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
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
      <Button onClick={props.onHide}>Close</Button>
    </Modal>
  )
}

export default ModalForm