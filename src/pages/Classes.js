import { makeStyles, Paper, TableBody, Toolbar, TableRow, TableCell } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import Controls from '../components/controls/Controls.js';
import useTable from '../components/useTable.js';
import Popup from '../components/Popup.js';
import ClassForm from './ClassForm.js';

const useStyles = makeStyles(themes => ({
    pageContent: {
        margin: themes.spacing(5),
        padding: themes.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const headCells = [
    { id: 'ClassID', label: 'ID' },
    { id: 'ClassName', label: 'Class' },
    { id: 'Teacher', label: 'Teacher' },
    { id: 'StudentAmount', label: 'Student Amount' }
]

export default function Classes() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ClassList, setClassList] = useState([]);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const uri = process.env.REACT_APP_API;

    useEffect(() => {
        fetch(uri)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(false);
                    setClassList(result);
                },
                (error) => {
                    setIsLoaded(false);
                    setError(error);
                }
            )
    }, [isLoaded])
    const classes = useStyles();
    const {
        TblContainer,
        TblHead
    } = useTable(headCells)

    const addClass = (Class) => {
        const dataRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Class)
        }
        fetch(uri, dataRequest);
        setIsLoaded(true);
        setRecordForEdit(null);
        setOpenPopup(false);
    }


    return (
        <>
            <Paper>
                <Toolbar>
                    <Controls.Button
                        text='Add New'
                        variant="outlined"
                        startIcon={<Add />}
                        ClassName={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            ClassList.map((item, i) =>
                            (
                                <TableRow key={i}>
                                    <TableCell>{item.ClassID}</TableCell>
                                    <TableCell>{item.ClassName}</TableCell>
                                    <TableCell>{item.Teacher}</TableCell>
                                    <TableCell>{item.NumberStudent}/{item.StudentAmount}</TableCell>
                                </TableRow>
                            )
                            )
                        }
                    </TableBody>
                </TblContainer>
            </Paper>
            <Popup
                title="Add new class"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <ClassForm
                    recordForEdit={recordForEdit}
                    addClass={addClass}
                />
            </Popup>
        </>
    )
}