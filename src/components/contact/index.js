import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Alert} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {sendMessage} from '../../store/actions';
import {showToast} from '../utils/tool';
const Contact = () =>{
    const dispatch =useDispatch();
    const formik  = useFormik({
        initialValues:{email:'',firstname:'',lastname:'',message:''},
        validationSchema: Yup.object({
            email: Yup.string()
            .required('Sorry required')
            .email('Not a valid email'),
            firstname: Yup.string()
            .required('Sorry required'),
            lastname: Yup.string()
            .required('Sorry required'),
            message: Yup.string()
            .required('Sorry required')
            .max(500, 'Sorrry Too long ')
        }),
        onSubmit:(values,{resetForm})=>{
            dispatch(sendMessage(values)).then(({payload})=>{
                if(payload){
                    resetForm();
                    showToast('SUCCESS', 'Thank you we will contact you back');
                }else{
                    showToast('ERROR', 'Sorry Something happen Try again');
                }
            });
        }
    });
   return (
    <>
        <h1>Contact Us</h1>
        <form className='mt-3' onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="email@example.com"
                    {...formik.getFieldProps('email')}
                />
                {formik.errors.email && formik.touched.email ?
                    <Alert variant="danger">
                        {formik.errors.email}
                    </Alert>
                : null}
            </div>
            <div className="form-group">
                <label htmlFor="firstname">Firstname</label>
                <input
                    type="text"
                    className="form-control"
                    name="firstname"
                    placeholder="Enter Firstname"
                    {...formik.getFieldProps('firstname')}
                />
                {formik.errors.firstname && formik.touched.firstname ?
                    <Alert variant="danger">
                        {formik.errors.firstname}
                    </Alert>
                : null}
            </div>
            <div className="form-group">
                <label htmlFor="lastname">Lastname</label>
                <input
                    type="text"
                    className="form-control"
                    name="lastname"
                    placeholder="Enter Lastname"
                    {...formik.getFieldProps('lastname')}
                />
                {formik.errors.lastname && formik.touched.lastname ?
                    <Alert variant="danger">
                        {formik.errors.lastname}
                    </Alert>
                : null}
            </div>
            <div className="form-group">
                <label htmlFor="message">message</label>
                <textarea
                    className="form-control"
                    name="message"
                    rows="3"
                    {...formik.getFieldProps('message')}
                ></textarea>
                {formik.errors.message && formik.touched.message ?
                    <Alert variant="danger">
                        {formik.errors.message}
                    </Alert>
                : null}
            </div>
            <button type="submit" className="btn btn-primary">
                Send Message
            </button>
        </form>
    </>
   );
}
export default Contact;