import { useState,useEffect } from 'react';
import Loading from './Loading';
import './Events.css';
import CentreRectangle  from './CentreRectangle';
import ButtonTypeOne from './ButtonTypeOne';
function Events({ username, onLogout, events , onView ,isDataPending, onActivity,onProfile}) {

  
  const handleView = (eventid) => {

    onView(eventid)
};

  const onSubmit = (e) => {
  
    e.preventDefault();
  

  }


  return (
      <>
       { isDataPending && <Loading className="data__Loading">Data is being Loaded...</Loading> }
       {!isDataPending && (
        <>
      <div className="game-header-text game-header"> <h1>Events</h1></div>
      <div className="event-logout">
      <div className="profile-form" >
            <button onClick={onProfile} className="profile-button" type="button">Profile</button>
          </div>
          <div className="activity-form" >
            <button onClick={onActivity} className="activity-button" type="button">Activity</button>
          </div>
        <div className="logout-form" >
            <button onClick={onLogout} className="game-logoutbutton" type="button">LogOut</button>
          </div>
      </div>

      <CentreRectangle className='center-rectangle-3' >
            
            <div className="table-container">
                <table className='center-rectangle-3-table' >
                  <thead>
                    <tr className='table-column-hover'>
                      <th className='table-column-header'>Event Name</th>
                      <th className='table-column-header'>Location</th>
                      <th className='table-column-header'>Date of Event</th>
                      <th className='table-column-header'>Seats Available</th>
                      <th className='table-column-header'>View Details</th>
                    </tr>
                  </thead>
                  <tbody className='table-column-body'>
                  {events.map((event) => (
                    <tr key={event.id}  className='table-column-hover'>
                      <td className='table-column'>{event.name}</td>
                      <td className='table-column'>{event.location}</td>
                      <td className='table-column'>{event.date}</td>
                      <td className='table-column'>{event.availableseats}/{event.seats}</td>
                      <td className='table-column'><div className="centered-button">
                    <ButtonTypeOne
                        onClick={() => handleView(event.id)}
                        text={'View'}
                        className={'patientlist-button-type-one'}
                    />
                    </div>
                    </td>
                     
                    </tr>
                  ))}
                    </tbody>
                    </table>
              </div>
          
          </CentreRectangle>
      </>
       )}




</>
  );
}

export default Events;


