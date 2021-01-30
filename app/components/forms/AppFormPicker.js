import React from 'react';
import {useFormikContext} from "formik";

import AppPicker from "../AppPicker";
import ErrorMessage from "./ErrorMessage";

function AppFormPicker({items, name, placeholder,width}) {
    const {errors,setFieldValue,touched,values}=useFormikContext();
    return (
        <AppPicker
        item={items}
        onSelectItem={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        selectedItem={values[name]}
        width={width} />
    );
    <ErrorMessage error={errors[name]} visible={touched[name]}/>
}

export default AppFormPicker;