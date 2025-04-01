"use client";
import React, { useEffect, useState } from "react";
import { Grid, Column, Button } from "@carbon/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { saveFormData } from "@/redux/formSlice";
import { RootState } from "@/redux/store";
import CustomTextInput from "@/components/shared/textinput";
import DropdownComponent from "@/components/shared/dropdown";
import { useFormik } from "formik";
import * as Yup from "yup";

const FormPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.form.data);
    const [isReadOnly, setIsReadOnly] = useState(false);

    const validationSchema = Yup.object({
        dropdown1: Yup.string().required("Dropdown 1 is required"),
        dropdown2: Yup.string().required("Dropdown 2 is required"),
        textInput1: Yup.string().required("Text Input 1 is required"),
        textInput2: Yup.string().required("Text Input 2 is required"),
    });
    

    const formik = useFormik({
        initialValues: {
            dropdown1: "",
            dropdown2: "",
            textInput1: "",
            textInput2: "",
        },
        validationSchema,
        validateOnChange: false, 
        validateOnBlur: false,  
        onSubmit: (values) => {
            dispatch(saveFormData(values));
            console.log(values);
            router.push("/dashboard");
        },
    });

    useEffect(() => {
        if (formData) {
            formik.setValues(formData);
            console.log( formik.setValues(formData));
            setIsReadOnly(true);
        }
    }, [formData]);
   
    

    return (
        <div className="form-container">
            <form onSubmit={formik.handleSubmit}>
                <Grid className="form-grid">
                    <Column sm={4} md={8} lg={12} className="form-header">
                        <h1 className="form-title">Form Title</h1>
                    </Column>
                    <Column sm={4} md={8} lg={12} className="form-field">
                        <DropdownComponent
                            id="dropdown1"
                            titleText="Dropdown 1"
                            options={[{ text: 'Select the option' }, { text: 'Option 1' }, { text: 'Option 2' }, { text: 'Option 3' }]}
                            initialSelectedItem={formik.values.dropdown1}
                            onChange={(value) => {
                                formik.setFieldValue("dropdown1", value?.text || "");
                                formik.setFieldTouched("dropdown1", true);
                            }}
                            disabled={isReadOnly}
                        />
                        {formik.touched.dropdown1 && formik.errors.dropdown1 && (
                            <div className="error">{formik.errors.dropdown1}</div>
                        )}
                    </Column>
                    <Column sm={4} md={8} lg={12} className="form-field">
                        <DropdownComponent
                            id="dropdown2"
                            titleText="Dropdown 2"
                            options={[{ text: 'Select the option' }, { text: 'Option 1' }, { text: 'Option 2' }, { text: 'Option 3' }]}
                            value={formik.values.dropdown2}
                            onChange={(value) => formik.setFieldValue("dropdown2", value?.text || "")} 
                            disabled={isReadOnly}
                        />
                        {formik.touched.dropdown2 && formik.errors.dropdown2 && (
                            <div className="error">{formik.errors.dropdown2}</div>
                        )}
                    </Column>
                    <Column sm={4} md={8} lg={12} className="form-field">
                        <CustomTextInput
                            id="textInput1"
                            labelText="Text Input 1"
                            value={formik.values.textInput1}
                            onChange={(event) => formik.handleChange(event)}
                            showButton
                            buttonText="button"
                            disabled={isReadOnly}
                        />
                        {formik.touched.textInput1 && formik.errors.textInput1 && (
                            <div className="error">{formik.errors.textInput1}</div>
                        )}
                    </Column>
                    <Column sm={4} md={8} lg={12} className="form-field">
                        <CustomTextInput
                            id="textInput2"
                            labelText="Text Input 2"
                            value={formik.values.textInput2}
                            onChange={(event) => formik.handleChange(event)}
                            buttonText="Submit"
                            onButtonClick={() => alert("Button clicked")}
                            disabled={isReadOnly}
                        />
                        {formik.touched.textInput2 && formik.errors.textInput2 && (
                            <div className="error">{formik.errors.textInput2}</div>
                        )}
                    </Column>
                    <Column sm={4} md={8} lg={12} className="form-actions">
                        <Button type="submit" className="submit-button">Submit</Button>
                    </Column>
                </Grid>
            </form>
        </div>
    );
};

export default FormPage;
