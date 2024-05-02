import React, { useEffect, useState, useRef, Fragment } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Image, Button, NavLink, Table, Form,Badge } from 'react-bootstrap';
import { AiFillPlusCircle } from 'react-icons/ai';
import Modal from '../../Popup';
import agent from "../../../agent";
import ListErrors from "../../ListErrors";
import Loader from "../../Loader";

import {
    DELETE_FEATURE,
    ADMIN_FEATURE_FETCH,
    CLEAR_PLAN_MESSAGE,
} from "../../../constants/actionTypes";

const mapStateToProps = (state) => ({
    ...state.plan,
    successMessageFeature: state.plan.successMessageFeature,
    errorMessageFeature: state.plan.errorMessageFeature,
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (formData) => {
        dispatch({ type: DELETE_FEATURE, payload: agent.adminFeature.delete(formData) });
    },
    fetchAdminFeature: () => {
        dispatch({ type: ADMIN_FEATURE_FETCH, payload: agent.adminPlan.fetch() });
    },
    clearPlanMessage: () => {
        dispatch({ type: CLEAR_PLAN_MESSAGE });
    }
    
});

const Popup = (props) => {

   
	const {deletefeaturemodalshow,setDeleteFeatureModalShow,onSubmit,successMessageFeature,fetchAdminFeature,errorMessageFeature,clearPlanMessage,row} = props;

    

    const formRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    const submitForm =  (e) => {
        setIsLoading(true);
        e.preventDefault();
        clearPlanMessage();
        const formdata =  {
            id:row._id,
        };
        onSubmit(formdata);
    };  


    useEffect(() => {
        if (successMessageFeature) {
            setIsLoading(false);
            fetchAdminFeature();
            formRef.current.reset();
            setDeleteFeatureModalShow(false);
            setTimeout(function(){
                clearPlanMessage();
            },2000);
        }
    }, [successMessageFeature]);

    useEffect(() => {
        if (successMessageFeature) {
            setIsLoading(false);
            setTimeout(function(){
                clearPlanMessage();
            },4000);
        }
    }, [successMessageFeature]);

  
	
	return (
		<React.Fragment>
            {isLoading && <Loader /> }
            <Modal show={deletefeaturemodalshow} onClose={() => setDeleteFeatureModalShow(false)} >
                <div className="content">
                <h4 className="modal-title text-center">Delete Feature</h4>
                    <div className="form-modal">
                        {errorMessageFeature ? <Badge bg="danger">{errorMessageFeature}</Badge> : <Fragment /> }
                        {successMessageFeature ? <Badge bg="success">{successMessageFeature}</Badge> : <Fragment /> }
                        <Form onSubmit={submitForm} ref={formRef}>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Row>
                                <Col lg={12} className="mb-5 mt-5 text-center">
                                   <span>Are you sure you want to delete the feature?</span>
                                </Col>
                                <Col lg={12}>
                                    <div className="outer-form btn-group-modal text-center">
                                        <Button className="custom-btn orange-btn" type="submit">Yes </Button>
                                        <Button className="custom-btn purple-btn" type="button" onClick={() => setDeleteFeatureModalShow(false)}>No </Button>
                                    </div>
                                </Col>
                            </Row>
                          </Form.Group>
                        </Form>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);