import React from 'react'

const Notification = ({ message}) => {
    if (message.length === 0) {
        return null
    }

    const messageNotificationClass = message.toLowerCase().includes('add');
    return (
        //Set the class name based on add or error message
        <div className={ messageNotificationClass ? 'note' : 'error'}>
            {message}
        </div>
    )

}

export default Notification
