import { useState,useEffect } from 'react';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
  MESSAGES,
} from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchAddData,
  fetchRegister,
  fetchEvents,
  fetchView,
  fetchActivity,
  fetchProfile,
  fetchUpdateProfile,
} from './services';
import './App.css';
import './index.css';
import Login from './Login';
import Events from './Events';
import './Events.css';
import Loading from './Loading';
import Status from './Status';
import Registration from './Registartion';
import ViewEvents  from './ViewEvents';
import Activity from './Activity';
import Profile from './Profile';
import ViewRegistration from './ViewRegistration';
import getMessage from './modal-message';
function App() {

  const [ error, setError ] = useState(null);
  const [ loginStatus, setLoginStatus ] = useState(LOGIN_STATUS.PENDING);
  const [ isDataPending, setisDataPending ] = useState(true);
  const [ data, setData ] = useState('');
  const [ word, setWord ] = useState('');
  const [ events, setEvents ] = useState('');
  const [ view, setView ] = useState('');
  const [ activity, setActivity] = useState('');
  const [ profile, setProfile] = useState('');
  const [username, setUsername] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ modalMessage, setModalMessage] = useState('');

  
  const onLogin = (username) => {
    setUsername(username);
    setisDataPending(true);
    fetchLogin(username)
    .then( () => {
      setError(''); 
      setUsername(username);
      return fetchEvents();
    })
    .then( fetchedEvents => {
      setError(''); 
      setEvents(fetchedEvents );
      setisDataPending(false);
      setUsername(username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
    })
    .catch( err => {
   
      setError(err?.error || 'ERROR');
    
    });
  }

  const onSignUp = () => {
    setError(''); 
    setLoginStatus(LOGIN_STATUS.SIGN_UP);
   
    
  }

  const onView = (eventid) => {
    setisDataPending(true);
    fetchView(eventid)
    .then(viewdata =>{

      setView(viewdata);
      setLoginStatus(LOGIN_STATUS.VIEW_EVENT);
      setisDataPending(false);
     

    })
    .catch( err => {
   
      setError(err?.error || 'ERROR');
    
    });
   
    
  }


  const onViewReg = (eventid) => {
   
    setisDataPending(true);
    fetchView(eventid)
    .then(viewdata =>{

      setView(viewdata);
      setLoginStatus(LOGIN_STATUS.VIEW_REG);
      setisDataPending(false);
     

    })
    .catch( err => {
       
      
      setError(err?.error || 'ERROR');
    
    });
   
    
  }

  const closeModal = () => {

    if(loginStatus === LOGIN_STATUS.SIGN_UP)
    {
      setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    }
    else if(loginStatus === LOGIN_STATUS.PROFILE)
    {
    
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
    }
    setIsModalOpen(false);
  };


  



  function onRegister(eventid){
    setError('');
    setModalMessage('');
    setisDataPending(true);
    fetchRegister(eventid)
    .then(viewdata =>{

     return  fetchView(eventid);
    })
    .then(viewdata =>{

      setView(viewdata);
      setLoginStatus(LOGIN_STATUS.VIEW_EVENT);
      setIsModalOpen(true);
      setModalMessage(getMessage(SERVER.REGISTRATION_SUCCESSFULL));
      setisDataPending(false);
      
     

    })
    .catch( err => {
      
      
      if (err?.error === SERVER.SEATS_NOT_AVAILABLE) {
        setError(err?.error);
        setIsModalOpen(true);
        setModalMessage(getMessage(SERVER.SEATS_NOT_AVAILABLE));
        setisDataPending(false);
        return;
      }

      setError(err?.error || 'An unexpected error occurred.');
      setIsModalOpen(true);
      setModalMessage(getMessage(SERVER.ALREADY_REGISTERED));
      setisDataPending(false);
    
    });
   


  }

  function onActivity() {
    setError('');
    setisDataPending(true);
    fetchActivity()
    .then(activity =>{

      setActivity(activity);
      setLoginStatus(LOGIN_STATUS.ACTIVITY);
      setisDataPending(false);
     

    })
    .catch( err => {
      setError(err?.error || 'ERROR'); 
    });
  }


  function onProfile() {
    setError('');
    setisDataPending(true);
    fetchProfile(profile)
    .then(profile =>{

      setProfile(profile);
      setLoginStatus(LOGIN_STATUS.PROFILE);
      setisDataPending(false);

    })
    .catch( err => {
      setError(err?.error || 'ERROR'); 
    });
  }


  function onUpdate(profile) {
    setError('');
    setisDataPending(true);
    setIsModalOpen(false);
    fetchUpdateProfile(profile)
    .then(profile =>{

      setProfile(profile);
      setIsModalOpen(true);
      setModalMessage(getMessage([SERVER.PROFILE_UPDATE]));
      setisDataPending(false);

    })
    .catch( err => {
      setError(err?.error || 'ERROR'); 
    });
  }


  function onLogout() {
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setWord('');
    fetchLogout()
    .catch( err => {
      setError(err?.error || 'ERROR'); 
    });
  }

  function onHome() {
    setError('');
    fetchEvents()
    .then(eventData => {
      setEvents(eventData);
      setisDataPending(false);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
    })
    .catch(err => {
      if (err?.error === SERVER.AUTH_MISSING) {
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        return;
      }
      setError(err?.error || 'An unexpected error occurred.');
    });
   
    
  }

  function onAddData(userData) {
    setIsModalOpen(false);
    fetchAddData(userData)
    .then( data => {
      setData(data);
      setIsModalOpen(true);
      setModalMessage(getMessage([SERVER.ACCOUNT_CREATED]))
      // setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
      setError('');
   
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
      setModalMessage(getMessage(err?.error ));
    });

  }






  function checkForSession() {
    fetchSession()
      .then(session => {
        setUsername(session.username);
        setisDataPending(true);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        return fetchEvents();
      })
      .then(eventData => {
        
        setEvents(eventData);
      
        setisDataPending(false);
        
      })
      .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return;
        }
        setError(err?.error || 'An unexpected error occurred.');
      });
  }


  useEffect(
    () => {
    
      checkForSession();
    },
    [] 
  );

  return (
    <>
       {error && <Status error={error}/> }
       {loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading> }
       {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <Login onLogin={onLogin} onSignUp={onSignUp}/> }
       {loginStatus === LOGIN_STATUS.SIGN_UP && <Registration onAddData ={onAddData} isModalOpen={isModalOpen} closeModal={closeModal}  modalMessage={modalMessage}/> }
       {loginStatus === LOGIN_STATUS.VIEW_EVENT && <ViewEvents  onLogout={onLogout} view={view} onRegister={onRegister}  isDataPending ={isDataPending} isModalOpen={isModalOpen} closeModal={closeModal} onHome={onHome} modalMessage={modalMessage}/> }
       {loginStatus === LOGIN_STATUS.VIEW_REG && <ViewRegistration  onLogout={onLogout} view={view}  isDataPending ={isDataPending}  onHome={onHome}/> }
       {loginStatus === LOGIN_STATUS.ACTIVITY && <Activity  onLogout={onLogout} activity={activity}   isDataPending ={isDataPending} onHome={onHome} onViewReg ={onViewReg}/> }
       {loginStatus === LOGIN_STATUS.PROFILE && <Profile  onLogout={onLogout} profile={profile}  onUpdate={onUpdate} isDataPending ={isDataPending} onHome={onHome}  isModalOpen={isModalOpen} closeModal={closeModal}  modalMessage={modalMessage}/> }
    
       {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && 
       
        <Events

          username={username}
          onLogout={onLogout}
          word ={word}
          isDataPending ={isDataPending}
          onView ={onView}
          events={events}
          onProfile ={onProfile}
          onActivity={onActivity}
          

        />

       

      }
    </>
  )
}

export default App;
