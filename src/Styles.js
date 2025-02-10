export const inputField = {
    backgroundColor: 'transparent !important',
    border: '1px solid #d4d3d5',
    borderRadius: '5px',
    "&:before": {
        borderBottom: "none !important"
    },
    "&::after": {
        borderBottom: "none !important"
    },
    "& .MuiFilledInput-input": {
        fontSize: 14
    },
    "& .MuiFilledInput-root": {
        backgroundColor: 'transparent !important',
        borderRadius: '5px',
        "&:before": {
            borderBottom: "none !important"
        },
        "&::after": {
            borderBottom: "none !important"
        }
    },
}

export const inputLabel = {
    fontSize: 14,
    color: "grey", // Default color when no content
    "&.Mui-focused": {
        fontWeight: 600,
        color: "black", // Color when field is focused
    },
    "&.MuiFormLabel-filled": {
        fontWeight: 600,
        color: "black", // Color when field has content
    },
    "& .MuiInputLabel-root": {
        fontSize: 14,
        color: "grey", // Default color when no content
        "&.Mui-focused": {
            fontWeight: 600,
            color: "black", // Color when field is focused
        },
        "&.MuiFormLabel-filled": {
            fontWeight: 600,
            color: "black", // Color when field has content
        },
    },
}

export const saveButton = {
    fontSize: '13px',
    textTransform: 'capitalize',
    padding: '12px 20px !important',
    lineHeight: '10px',
    marginRight: '10px',
}

export const cancelButton = {
    fontSize: '13px',
    textTransform: 'capitalize',
    padding: '12px 20px !important',
    lineHeight: '10px',
}
