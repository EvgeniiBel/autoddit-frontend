import React from 'react'
import {Field, reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './AddLinkForm.css';

const renderTextField = ({
                             input,
                             label,
                             meta: {touched, error},
                             ...custom
                         }) => (
    <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
    />
);

const validate = values => {
    const errors = {};
    const requiredFields = [
        'title',
        'link'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });
    return errors;
};

let AddLinkForm = (props) => {
    const {handleSubmit, pristine, reset, submitting} = props;
    return (
        <form onSubmit={handleSubmit} className="add-link-form">
            <div>
                <Field name="title"
                       component={renderTextField}
                       hintText="Type link title..."
                       floatingLabelText="Title"
                       fullWidth={true}
                       type="text"/>
            </div>
            <div>
                <Field name="link"
                       component={renderTextField}
                       hintText="Type link url..."
                       floatingLabelText="Url"
                       fullWidth={true}
                       type="text"/>
            </div>
            <div>
                <Field name="imageUrl"
                       component={renderTextField}
                       hintText="Type image url..."
                       floatingLabelText="Image url"
                       fullWidth={true}
                       type="text"/>
            </div>
            <div className="add-link-form__actions">
                <RaisedButton
                    disabled={submitting}
                    type="submit"
                    label="Add Link"
                    primary={true}/>
                <RaisedButton
                    onClick={props.cancelAddLink}
                    type="button"
                    label="Cancel"
                    secondary={true}/>
            </div>
        </form>
    );
};

AddLinkForm = reduxForm({
    form: 'addLink',
    validate
})(AddLinkForm);

export default AddLinkForm;