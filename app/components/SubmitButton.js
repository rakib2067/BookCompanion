import React from 'react';
import {Formik} from 'formik';
import {useFormikContext} from 'formik';
import AppButton from './AppButton';
function SubmitButton({title}) {

    const {handleSubmit} = useFormikContext();
    return (
        <AppButton title={title} onPress={handleSubmit} />
               
    );
}

export default SubmitButton;