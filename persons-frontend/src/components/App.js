import React, { useState, useEffect } from 'react'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Filter from './Filter'
import Notification from './Notification'
import HandleRest from '../services/HandleRest'

const App = () => {
    const [persons, setPersons] = useState([])

    useEffect(() => {
        HandleRest
          .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
          })
      }, [])
   
    const [showAll, setShowAll] = useState(true);

    const [filterValue, SetFilterValue] = useState('');
    const onFilterChange = event => {
        SetFilterValue(event.target.value);
        setShowAll(false);
    }

    const [notificationMessage, SetNotificationMessage] = useState('')

    let messageClassName = 'note';

    const onHandleAdd = (event) => {
        event.preventDefault();
        const person = { name: newName, number: newNumber }
            HandleRest.create(person)
                .then((response) => {
                    console.log("In Then Block")
                    console.log(persons);

                    setPersons(persons.concat(response));
                    SetNotificationMessage(`Added ${person.name}`)
                    showThesePersons = persons;

                    setTimeout(() => {
                        SetNotificationMessage('')
                    }, 3000)
                })
                .catch(error => {
                    // this is the way to access the error message
                    console.log("In Catch Block")
                    console.log(error.response.data);
                    SetNotificationMessage(error.response.data.error);
                    setTimeout(() => {
                        SetNotificationMessage('')
                    }, 3000)
                  });
                HandleRest
                .getAll()
                  .then(initialPersons => {
                      setPersons(initialPersons)
                })
        setNewName('')
        setNewNumber('')
        setShowAll(true)
    }

    const [newName, setNewName] = useState('')
    const onNameChange = event => {
        setNewName(event.target.value);
    }

    const [newNumber, setNewNumber] = useState('')
    const onNumberChange = event => setNewNumber(event.target.value)
    // console.log(persons);

    let showThesePersons = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
    // console.log(showThesePersons);


    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage}/>
            <Filter onFilterChange={onFilterChange} filterValue={filterValue} />
            <h2>Add a new Name and Number</h2>
            <PersonForm onHandleAdd={onHandleAdd} onNameChange={onNameChange}
                onNumberChange={onNumberChange} newName={newName} newNumber={newNumber} />
            <h2>Numbers</h2>
            <Persons showThesePersons={showThesePersons} setPersons={setPersons} />
        </div>
    )
}

export default App