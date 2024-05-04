import { useState,useEffect } from 'react';
import Loading from './Loading';
import './Profile.css';
import Modal from './Modal';
function Profile({onUpdate,profile,onLogout,onHome,isModalOpen,closeModal ,modalMessage}) {
 

 

  const [username, setUsername] =  useState(profile.username);
  const [firstname, setFirstname] =  useState(profile.firstname);
  const [lastname, setLastname] =  useState(profile.lastname);
  const [email, setEmail] =  useState(profile.email);
  const [phonenumber, setPhonenumber] =  useState(profile.phonenumber);
  const [addressline1, setAddressline1] =  useState(profile.addressline1);
  const [addressline2, setAddressline2] =  useState(profile.addressline2);
  const [city, setCity] =  useState(profile.city);
  const [state, setState] =  useState(profile.state);
  const [country, setCountry] =  useState(profile.country);
  const [zipcode, setZipcode] =  useState(profile.zipcode);

  const [errors, setErrors] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    addressline1: '',
    addressline2: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
  });


  const onSubmit = (e) => {


    e.preventDefault();

    const newErrors = {};



    if (!username) {
      newErrors.username = 'Username is required';

    }

    if (!firstname) {
      newErrors.firstname = 'Firstname is required';
    }

    if (!lastname) {
      newErrors.lastname = 'Lastname is required';
    }


    if (!email) {
      newErrors.email = 'Email is required';
    }

    if (!phonenumber) {
      newErrors.phonenumber = 'Phonenumber is required';
    }

    if (!addressline1) {
      newErrors.addressline1 = 'Street Address 1 is required';
    }

    if (!city) {
      newErrors.city = 'City is required';
    }

    if (!state) {
      newErrors.state = 'State is required';
    }

    if (!country) {
      newErrors.country = 'Country is required';
    }  

    if (!zipcode) {
       newErrors.zipcode = 'Zipcode is required';
    }


    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {


      let userData = {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phonenumber: phonenumber,
        addressline1: addressline1,
        addressline2: addressline2,
        city: city,
        state: state,
        country: country,
        zipcode: zipcode
      };

      onUpdate(userData);
    }

  }

  return (
      <>
       
      <div className="game-header-text game-header"> <h1>Personal Details</h1></div>
      <div className="event-logout">
      <div className="profile-form" >
      <button onClick={onHome} className="activity-button" type="button">Home</button>
          </div>
        <div className="logout-form" >
            <button onClick={onLogout} className="game-logoutbutton" type="button">LogOut</button>
          </div>
      </div>

      <form className="register-formnew" action="#/word" onSubmit={onSubmit}>
        <label className="registar-form__required">* indicates required field</label>
        <div className="register-box-1">

        <label htmlFor="usernameInput" className="field-name"  >Username:<span className="registar-form__required">*</span></label>
        <span className="registar-form__error">{errors.username}</span>
        <input id="usernameInput" className="field-value" onInput={(e) => setUsername(e.target.value)} value={username} placeholder="Enter Username" name="text" />
      
        <label htmlFor="firstnameInput" className="field-name"  >Firstname:<span className="registar-form__required">*</span></label>
        <span className="registar-form__error">{errors.firstname}</span>
        <input id="firstnameInput" className="field-value" onInput={(e) => setFirstname(e.target.value)} value={firstname} placeholder="Enter Firstname" name="text" />
      
        <label htmlFor="lastnameInput" className="field-name"  >Lastname:<span className="registar-form__required">*</span></label>
        <span className="registar-form__error">{errors.lastname}</span>
        <input id="lastnameInput" className="field-value" onInput={(e) => setLastname(e.target.value)} value={lastname} placeholder="Enter Lastname" name="text" />
       
        <label htmlFor="emailaddressInput" className="field-name"  >Email:<span className="registar-form__required">*</span></label>
        <span className="registar-form__error">{errors.email}</span>
        <input id="emailnameInput" className="field-value" onInput={(e) => setEmail(e.target.value)} value={email} placeholder="Enter Email" name="text" />
       
        <label htmlFor="phonenumberInput" className="field-name"  >PhoneNumber:<span className="registar-form__required">*</span></label>
        <span className="registar-form__error">{errors.phonenumber}</span>
        <input id="phonenumberInput" className="field-value" onInput={(e) => setPhonenumber(e.target.value)} value={phonenumber} placeholder="Enter Phonenumber" name="text" />
        </div>

        <div  className="register-box-2">
      
        <label htmlFor="addressline1Input" className="field-name"  >Street Address 1:<span className="registar-form__required">*</span></label>
        <span className="registar-form__error">{errors.addressline1}</span>
        <input id="addressline1Input" className="field-value" onInput={(e) => setAddressline1(e.target.value)} value={addressline1} placeholder="Enter Street Address" name="text" />
     
        <label htmlFor="addressline2Input" className="field-name"  >Street Address 2:<span className="registar-form__required"></span></label>
        <input id="addressline2Input" className="field-value" onInput={(e) => setAddressline2(e.target.value)} value={addressline2} placeholder="Enter Street Address" name="text" />

        <label htmlFor="cityInput" className="field-name"  >City:<span className="registar-form__required">*</span></label>
        <span className="registar-form__error">{errors.city}</span>
        <input id="cityInput" className="field-value" onInput={(e) => setCity(e.target.value)} value={city} placeholder="Enter City" name="text" />
     
        <label htmlFor="stateInput" className="field-name"  >State:<span className="registar-form__required">*</span></label>
        <span className="registar-form__error">{errors.state}</span>
        <input id="stateInput" className="field-value" onInput={(e) => setState(e.target.value)} value={state} placeholder="Enter State" name="text" />
       
        <label htmlFor="countryInput" className="field-name"  >Country:<span className="registar-form__required">*</span></label>
        <span className="registar-form__error">{errors.country}</span>
        <input id="countryInput" className="field-value" onInput={(e) => setCountry(e.target.value)} value={country} placeholder="Enter Country" name="text" />
       
        <label htmlFor="zipcodeInput" className="field-name"  >Zipcode:<span className="registar-form__required">*</span></label>
        <span className="registar-form__error">{errors.zipcode}</span>
        <input id="zipcodeInput" className="field-value" onInput={(e) => setZipcode(e.target.value)} value={zipcode} placeholder="Enter Zipcode" name="text" />
        </div>
        <button className="register-button" type="submit">Submit</button>
        <Modal isOpen={isModalOpen}  onClose={closeModal} initialValue={modalMessage} />
      </form>

           
     
     
      </>

  );
}

export default Profile;


