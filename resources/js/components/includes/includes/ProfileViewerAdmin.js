import React, { useState, useEffect, createRef, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavDropdown, NavItem, Image } from 'react-bootstrap';
import avtarPic from '../../../assets/images/user.png';
import { prefix } from './../../../constants/prefix.js';

const ProfileViewer = (props) => {
	const { currentUser, onSignOut } = props;
	const [profile, setProfile] = useState(avtarPic);
	const [userName, setUserName] = useState('');
	const [dashboard_link, setdashboardlink] = useState('/dashboard');
	const [profile_link, setProfileLink] = useState('#');
	const [setting_link, setSettingLink] = useState('#');
	const dropper = createRef();

	const triggerDropdown = () => {
		if(dropper && dropper.current) {
			if(dropper.current.firstChild) {
				dropper.current.firstChild.click();
			}
		}
	}

	const submitLogout = () => {
		onSignOut();
	}

	useEffect(() => {
		if(currentUser && currentUser.email) {
			if(currentUser.lName){
                
                var _name = currentUser.fName+' '+currentUser.lName;
			}else{
				var _name = currentUser.fName;
				
			}
			setUserName(_name);

			const _dashboard_link = "/"+prefix[currentUser.roleId]+'/dashboard';
			const _profile_link = "/"+prefix[currentUser.roleId]+'/profile';
			const _setting_link = "/"+prefix[currentUser.roleId]+'/setting';
			
			setdashboardlink(_dashboard_link);
			setProfileLink(_profile_link);
			setSettingLink(_setting_link);
			if(currentUser.profileImage){
				setProfile(currentUser.profileImage)
			}
			

		}
	}, [currentUser])



	return (
		<Fragment>
			{(currentUser && currentUser.email) ? (
				<Fragment>
					<div className="profile-header">
					<Image src={profile} alt="profile-pic" onClick={triggerDropdown} height={30} />
					<NavDropdown ref={dropper} title={userName} id="basic-nav-dropdown">
						<NavDropdown.Item activeclassname="active" as={NavLink} to={profile_link}>Profile</NavDropdown.Item>
						   <NavDropdown.Divider />
						<NavDropdown.Item activeclassname="active" as={NavLink} to={setting_link}>Settings</NavDropdown.Item>
						   <NavDropdown.Divider />
						<NavDropdown.Item onClick={submitLogout}>
							Logout
						</NavDropdown.Item>
					</NavDropdown>
					</div>
				</Fragment>
			) : (<Fragment />)}	
		</Fragment>
	);
}

export default ProfileViewer;