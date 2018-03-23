import React from 'react'
import { Field, reduxForm } from 'redux-form';

let AddLinkForm = (props) => {
    const { handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <Field name="title" component="input" type="text" />
            </div>
            <div>
                <label htmlFor="link">Link</label>
                <Field name="link" component="input" type="text" />
            </div>
            <div>
                <label htmlFor="imageUrl">Image Url</label>
                <Field name="imageUrl" component="input" type="text" />
            </div>
            <button type="submit">Add Link</button>
        </form>
    );
};

AddLinkForm = reduxForm({
    form: 'addLink'
})(AddLinkForm);

export default AddLinkForm;