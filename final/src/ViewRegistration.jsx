import { useState, useEffect } from 'react';
import Loading from './Loading';
import './ViewRegistration.css';
import CentreRectangle from './CentreRectangle';
import ButtonTypeOne from './ButtonTypeOne';
import Modal from './Modal';
function ViewRegistration({ onLogout, view, isDataPending, onHome }) {




    return (
        <>
            {isDataPending && <Loading className="data__Loading">Data is being Loaded...</Loading>}
            {!isDataPending && (
                <>
                    <div className="game-header-text game-header"> <h1>{view.name}</h1></div>
                    <div className="event-logout">
                        
                        <div className="profile-form" >
                            <button onClick={onHome} className="activity-button" type="button">Home</button>
                        </div>
                        <div className="logout-form" >
                            <button onClick={onLogout} className="game-logoutbutton" type="button">LogOut</button>
                        </div>
                    </div>

                    <CentreRectangle className='viewevents-center-rectangle' >

                        <div className='viewevents-container'>
                            <div className='event-container-left-1'>

                                <div className='event-name'>Event Name:</div>
                                <div>{view.name}</div>

                            </div>
                            <div className='event-container-right-1'>
                                <div className='event-type'>Event Type:</div>
                                <div>{view.type}</div>
                            </div>

                            <div className='event-container-left-2'>

                                <div className='event-date'>Date:</div>
                                <div>{view.date}</div>

                            </div>
                            <div className='event-container-right-2'>
                                <div className='event-location'>Location:</div>
                                <div>{view.location}</div>
                            </div>

                            <div className='event-container-left-3'>

                                <div className='event-seats'>Seats Available:</div>
                                <div>{view.availableseats}/{view.seats}</div>

                            </div>
                            <div className='event-container-right-3'>
                                <div className='event-time'>Event Time:</div>
                                <div>{view.time}</div>
                            </div>

                            <div className='event-description'>
                                <div className='event-desc'>Description:</div>
                                <div>{view.description}</div>
                            </div>

                           
                            {/* <button className="register-button" type="submit"  onClick={() => handleRegister(view.id)}>Register</button> */}
                        </div>


                    </CentreRectangle>
                </>
            )}




        </>
    );
}

export default ViewRegistration;


