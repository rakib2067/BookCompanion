import React from 'react';
import AppTextInput from '../AppTextInput';
import ErrorMessage from '../forms/ErrorMessage';
import {useFormikContext} from 'formik';
function AppFormField({name, width,...otherProps}) {

const {setFieldTouched,handleChange,errors,touched}=  useFormikContext();
    return (
        <>
        <AppTextInput 
            width={width}
            onBlur={()=> setFieldTouched(name)}
            onChangeText={handleChange(name)}
            {...otherProps}
        />              
        <ErrorMessage error={errors[name]} visible={touched[name]} />  
        </>
    );
}

export default AppFormField;