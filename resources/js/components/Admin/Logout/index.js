import React, {useEffect} from 'react';
import { connect } from "react-redux";
import agent from "../../../agent";

import MainView from './MainView';
import './style.scss';

import {
   PAGE_ATTR
} from "../../../constants/actionTypes"

const mapStateToProps = (state) => ({
  	...state
});

const mapDispatchToProps = (dispatch) => ({
	setPageHeading: (title) => {
        dispatch({ type: PAGE_ATTR, pageheading: title });
    }
});

const Logout = (props) => {
	

	const {setPageHeading,pageheading } = props;

	let mainProps = {...props}

	useEffect(() => {  		
		if(pageheading){
            setPageHeading(pageheading);
		}else{
			setPageHeading("Logout");
		}
  		
  	}, [pageheading])

	return (
		<div className="dashboard-page">
			<MainView {...mainProps} />
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);