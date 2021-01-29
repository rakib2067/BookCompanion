import React from 'react';
import {Formik} from 'formik';
function AppForm({initialValues,onSubmit,handleChange,validationSchema,children}) {
    return (
        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        handleChange={handleChange}
        >
        {({handleSubmit}) =>(
            <>
            {children}
            </>
        )}
        </Formik>
    );
}

export default AppForm;