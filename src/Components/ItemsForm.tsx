import React, { useState } from 'react'

import { useMutation } from '@apollo/client';

import { useFormik } from 'formik'
import * as Yup from "yup";

import CustomModal from './CustomModal'
import Spacer from './Spacer'
import CustomSelect from './CustomSelect'

import { TextField, Button } from '@mui/material'

import { CREATE_ITEM } from '../apollo/mutations';

import MutationsStatus from './mutation-status/Mutationstatus';


interface ItemsFormProps {
    refetch: () => void

}

export default function ItemsForm({ refetch }: ItemsFormProps) {
    const [modalOpen, setModalOpen] = useState(false)
    const [initialFormValues, setInitialFormValues] = useState({
        item_name: "",
        text: "",
        numbers: "",
        status: ''
    })


    const [
        createItem,
        { loading, error, data },
    ] = useMutation(CREATE_ITEM)

    const formik = useFormik({
        initialValues: initialFormValues,
        onSubmit: values => {// @ts-ignore
            handleAddItems(values)
        },
        validationSchema: Yup.object({
            item_name: Yup.string().required("Required"),

        }),
    })

    const handleAddItems = (values: any) => {

        const { item_name, text, status, numbers } = values
        const obj = {
            text,
            status,
            numbers
        }
        createItem({
            variables: {
                item_name,
                board_id: process.env.REACT_APP_BOARD_ID,
                column_values: JSON.stringify(obj),
            },
            onCompleted: (data) => {
                setModalOpen(false)
                refetch()
                setInitialFormValues({
                    item_name: "",
                    text: "",
                    numbers: "",
                    status: ''
                })
            }
        })
    }

    return (
        <>
            <MutationsStatus error={error} loading={loading} success={data} />
            <CustomModal buttonName="Create Item" modalOpen={modalOpen}
                setModalOpen={setModalOpen}>

                <form >
                    <h3 className='text-center'>Create Item</h3>
                    <Spacer />
                    <TextField name='item_name' label="Item name" fullWidth value={formik.values.item_name} onChange={formik.handleChange} />
                    <p className=" text-red-500 text-xs pt-1 pl-4">
                        {formik.errors.item_name && formik.errors.item_name}
                    </p>
                    <Spacer />
                    <TextField type='number' name='numbers' label='Item number' fullWidth value={formik.values.numbers} onChange={formik.handleChange} />

                    <Spacer />
                    <TextField name='text' label="Item text" fullWidth value={formik.values.text} onChange={formik.handleChange} />
                    <Spacer />
                    <CustomSelect onChange={formik.handleChange} name='status' items={["Done", 'Working on it', 'Stuck']} label='Select Status' value={formik.values.status} />
                    <Spacer />
                    <Button variant='outlined' onClick={() => formik.handleSubmit()} size='small'> Submit</Button>
                </form>

            </CustomModal>
        </>

    )
}
