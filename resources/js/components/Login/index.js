import React, { useEffect, useState, Fragment } from "react";
import { Badge } from 'react-bootstrap';
import { Container, Row, Col, Image, Button, Modal, Alert } from 'react-bootstrap';
import agent from "../../agent";
import { AiOutlineEye, AiOutlineEyeInvisible   } from 'react-icons/ai';
import ListErrors from "../ListErrors";
import { connect } from "react-redux";
import './login.scss';
import logo from "../../assets/images/logo.png";
import nestle from "../../assets/images/nestle.png";
import { useNavigate, Link } from "react-router-dom";

import {
  	UPDATE_FIELD_AUTH,
  	LOGIN,
  	RESETLINK,
  	LOGIN_PAGE_UNLOADED,
  	EMPTY_RESET_VALUE
} from "../../constants/actionTypes";

// import {ReactComponent as Logo} from "../../assets/logo.svg";

const mapStateToProps = (state) => ({
  	...state.auth,
  	loginSuccess: state.common.loginSuccess,
  	loginError: state.common.loginError,
  	currentUser: state.common.currentUser,
  	ResetLinkError: state.common.ResetLinkError,
  	ResetLinkSuccess: state.common.ResetLinkSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  	onSubmit: (values) =>
    	dispatch({ type: LOGIN, payload: agent.Auth.login(values) }),
  	onForgotPaaswordSubmit: (values) => 
    	dispatch({ type: RESETLINK, payload: agent.Auth.resetLink(values) }),
    onEmpty: () => dispatch({ type: EMPTY_RESET_VALUE })
});

const ResetPassword = (props) => {
	
	const { currentUser,errors, loginSuccess, loginError, onSubmit, inProgress, ResetLinkError, ResetLinkSuccess, onForgotPaaswordSubmit, onEmpty } = props;

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassowrd, setShowPassword] = useState(false);
	const [loginErr, setLoginErr] = useState('');

	const [emailError, seteEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const [resetErr, setResetErr] = useState('');
	const [resetSucc, setResetSucc] = useState('');

	const [forgotEmail, setForgotEmail] = useState('');

	const [show, setShow] = useState(false);

  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

	let navigate = useNavigate();

	useEffect(() => {
	    if (currentUser && currentUser.roleId) {
	    	if(currentUser.roleId == 1){
                navigate('/admin/dashboard');
	    	}else{
	    		navigate('/');
	    	}
	    }
  	}, [currentUser]);


  	const submitForm = (e) => {
	    e.preventDefault();
	    onSubmit({ email, password });
  	}; 

  	const submitForgotForm = (e) => {
	    e.preventDefault();
	    onForgotPaaswordSubmit({ email:forgotEmail });
  	};  	

  	useEffect(() => {
  		if(loginError) {
  			if (typeof loginError === "string") {
  				setLoginErr(loginError)
  			} else {
  				if ("user" in loginError) {
	  				seteEmailError(loginError.user);
	  			} else if("password" in loginError){
	  				setPasswordError(loginError.password);
	  			} else {
	  				setLoginErr(loginError)
	  			}
  			}
  			

  			
  		}

  		if(ResetLinkError) {
  			setResetErr(ResetLinkError);
  		}

  		

  	}, [loginError,ResetLinkError ])

  	 useEffect(() => {

  	 	if(ResetLinkSuccess) {
  	 		setEmail('')
  			setResetSucc(ResetLinkSuccess);
  			const timeId = setTimeout(() => {
		      // After 3 seconds set the show value to false
  			  setShow(false)
		      setResetSucc('')
		      setForgotEmail('')
		      onEmpty()
		    }, 2000)

  			return () => {
		      clearTimeout(timeId)
		    }
		    
  		} 
	    
	 }, [ResetLinkSuccess]);


	return (
		<>
		<section className="login-page d-flex align-items-center">
			<div className="container-fluid p-0">
				
				<div className="row justify-content-center  m-0 align-items-center">
					<div className="col-sm-6">
						<div className="logo-login text-center">
							<Link to="/"><Image src={logo} /></Link>
						</div>
						<div className="login-form">
							<h3 className="login-title text-center">Login</h3>
							<ListErrors errors={errors} />
							{loginErr ? <Badge bg="danger">{loginErr}</Badge> : <Fragment /> }
							<form onSubmit={submitForm}>
				              	<fieldset>
					                <fieldset className="form-group mb-4">
					                	<label>E-mail</label>
					                  	<input
						                    className="form-control form-control-md"
						                    type="email"
						                    value={email}
						                    onChange={(e) => setEmail(e.target.value)}
						                    onKeyPress={(e) => seteEmailError(null)}
						                    required
					                  	/>
					                  	<span className="text-danger">{emailError}</span>
					                </fieldset>

					                <fieldset className="form-group position-relative">
					                	
					                		<label>Password</label>
					                		<div className="password-eye">
						                  	<input
							                    className="form-control form-control-md"
							                    type={showPassowrd ? "text" : "password"}
							                    value={password}
							                    onChange={(e) => setPassword(e.target.value)}
							                    onKeyPress={(e) => setPasswordError('')}
							                    required
						                  	/>
						                  	<span onClick={(e) => setShowPassword(!showPassowrd)}>{(showPassowrd)?<AiOutlineEye className="hide-pass" />: <AiOutlineEyeInvisible className="show-pass" />}</span>
						                  	
					                	</div>
					                	<span className="text-danger">{passwordError}</span>
					                  	<span
					                    	className={`password-icon ${showPassowrd}`}
					                    	
					                  	></span>
					                </fieldset>

					                <div className="forgot-pass text-right mb-4">
					                	<a onClick={handleShow} className="red-text">Forgot Password?</a>
					                </div>

					                <button
					                  	className="login-button btn btn-md btn-primary custom-button w-100"
					                  	type="submit"
					                  	disabled={inProgress}
					                >
					                  	LOG IN
					                </button>
				              	</fieldset>
				            </form>
						</div>
					</div>
				</div>
			</div>
		</section>
		
		<Modal className="modal-custom" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
        	<div className="popup-content">
        		<h2 className="text-center skyblue-text">Forgot Password?</h2>
        		<p className="text-center">We just need your registered <br />email address to send you passwort reset link</p>
        		{resetSucc ? <Alert variant="success">{resetSucc}</Alert>
			    : <Fragment /> }
        		<form onSubmit={submitForgotForm}>
	              	<fieldset>
		                <fieldset className="form-group mb-4">
		                	<label>E-mail</label>
		                  	<input
			                    className="form-control form-control-md"
			                    type="email"
			                    value={forgotEmail}
			                    onChange={(e) => setForgotEmail(e.target.value)}
			                    onKeyPress={(e) => setResetErr('')}
			                    required
		                  	/>
		                  	<span className="text-danger">{resetErr}</span>
		                </fieldset>

		                <button
		                  	className="login-button btn btn-md btn-primary custom-button w-100"
		                  	type="submit"
		                  	disabled={inProgress}
		                >
		                  	Send Link
		                </button>
	              	</fieldset>
	            </form>
        	</div>
        </Modal.Body>
        
      </Modal>

		</>

	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);