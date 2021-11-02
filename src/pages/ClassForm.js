import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../components/controls/Controls.js";
import { useForm, Form } from '../components/useForm';

const initialFValues = {
    ClassID: '',
    ClassName: '',
    Teacher:'',
    StudentAmount: 0
}

export default function ClassForm(props) {
    const { addClass, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('ClassID' in fieldValues)
            temp.ClassID = fieldValues.ClassID ? "" : "This field is required."
        if ('ClassName' in fieldValues)
            temp.ClassName = fieldValues.ClassName ? "" : "This field is required."
        if ('Teacher' in fieldValues)
            temp.Teacher = fieldValues.Teacher ? "" : "This field is required."
        if ('StudentAmount' in fieldValues)
            temp.StudentAmout = fieldValues.StudentAmount >0 ? "" : "This field is required not 0."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            //console.log(values);
            addClass(values);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={7}>
                    <Controls.Input
                        name="ClassID"
                        label="ID"
                        value={values.ClassID}
                        onChange={handleInputChange}
                        error={errors.ClassID}
                    />
                    <Controls.Input
                        label="Class Name"
                        name="ClassName"
                        value={values.ClassName}
                        onChange={handleInputChange}
                        error={errors.ClassName}
                    />
                    <Controls.Input
                        label="Teacher"
                        name="Teacher"
                        value={values.Teacher}
                        onChange={handleInputChange}
                        error={errors.Teacher}
                    />
                    <Controls.Input
                        label="Student Amount"
                        name="StudentAmount"
                        value={values.StudentAmount}
                        onChange={handleInputChange}
                        error={errors.StudentAmount}
                    />
                    <Controls.Button
                            type="submit"
                            text="Submit" />
                </Grid>
            </Grid>
        </Form>
    )
}
