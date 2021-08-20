import React, { useReducer, useState } from 'react';
import CustomPostConnection from './CustomPostConnection';
import { toast } from 'react-toastify';

const formReducer = (state, event, status) => {

    if(event.reset) {
        return {
            //blogTitle: '',
            //postText: '',
        }
    }

    return {
      ...state,
      [event.name]: event.value
    }
}

const CustomPostMaker = () => {

    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        // alert('You have submitted the form');
        setSubmitting(true);

        CustomPostConnection(formData.projectName, formData.projectID);

        setTimeout(() => {
            setSubmitting(false);
            setFormData({
                reset: true
              })
              toast.dismiss();
        }, 3000)
    }

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
            status: event.target.status
        });
    }

    return (
        <div>
            <form onSubmit = { handleSubmit }>
                <fieldset disabled={submitting}>
                    <label>
                        <p>Project name</p>
                        <input name="projectName" onChange={ handleChange }/>
                    </label><br/><br/>

                    <label>
                        <p>Project ID</p>
                        <input name="projectID" onChange={ handleChange }/>
                    </label><br/><br/>

                    <button type="submit">Submit</button>
                    {submitting && 
                        <div>
                            <br/>
                            You are submitting the following:
                            <ul>
                                {Object.entries(formData).map(([name, value]) => (
                                    <li key={name}><strong>{name}</strong>: {value.toString()}</li>
                                ))}
                            </ul>
                        </div>
                    }
                </fieldset>
            </form>
        </div>
    )
}

export default CustomPostMaker
