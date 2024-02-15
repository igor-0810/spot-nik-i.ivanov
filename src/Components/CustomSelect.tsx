import React from 'react'

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

type CustomSelectProps = {
    label: string;
    items: any;
    name: string;
    value: string;
    onChange: (e: string) => void;
};

export default function CustomSelect({
    label,
    items,
    name,
    value,
    onChange,
}: CustomSelectProps) {
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={label}// @ts-ignore
                    onChange={onChange}
                    name={name}
                >
                    {items &&
                        items.map((item) => <MenuItem value={item}>{item}</MenuItem>)}
                </Select>
            </FormControl>
        </Box>
    );
}
