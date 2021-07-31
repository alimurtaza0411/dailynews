import React, { useRef,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap';
import { addNewsletter,clearNewsletter } from '../../store/actions'
import { showToast } from './tool';
const NewsLetter = () =>{
    const userData = useSelector(state =>state.user);
    const dispatch = useDispatch();
    const textInput = useRef();

    const handleSubmit =(e)=>{
        e.preventDefault();
        const value = textInput.current.value;
        dispatch(addNewsletter({email:value}));
    }
    useEffect(()=>{
        if(userData.newsletter){
            if(userData.newsletter==="added"){
                showToast('SUCCESS',"Thank you for subscribing !!!");
                textInput.current.value="";
                dispatch(clearNewsletter());
            }
            if(userData.newsletter==="failed"){
                showToast('ERROR',"You are already subscribed");
                textInput.current.value="";
                dispatch(clearNewsletter());
            }
        }
    }
    ,[userData,dispatch]);


   return (
    <>
        <div className="newsletter_container">
            <h1>Join our Newletter</h1>
            <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group>
                    <Form.Control 
                        type="text"
                        placeholder="Example: youremail@gmail.com"
                        name="email"
                        ref={textInput}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add me to the list
                </Button>
            </Form>
        </div>
    </>
   );
}
export default NewsLetter;