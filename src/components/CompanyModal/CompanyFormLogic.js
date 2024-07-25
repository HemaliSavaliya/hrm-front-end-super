/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const CompanyFormLogic = (companyData, editCompanyId) => {
    const initialFormValue = {
        companyName: "",
        companyEmail: "",
        companyPan: "",
        companyGST: "",
        subscription: "",
        startDate: "",
        endDate: "",
        companyLogo: []
    };

    const [formData, setFormData] = useState(initialFormValue);
    const [errors, setErrors] = useState(initialFormValue);
    const [selectedPlan, setSelectedPlan] = useState("");

    const handlePlanChange = (event) => {
        setSelectedPlan(event.target.value);
    }

    const validateField = (name, value) => {
        switch (name) {
            case "companyName":
                if (value.trim() === "") {
                    return "Company Name is required";
                } else if (!/^[A-Za-z\s]+$/.test(value)) {
                    return "Company Name should contain only characters";
                }
                break;
            case "companyEmail":
                if (value.trim() === "") {
                    return "Email address is required";
                } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/.test(value)) {
                    return "Invalid email address";
                }
                break;
        }

        return ""; // If no error
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(initialFormValue).forEach((name) => {
            const value = formData[name];
            const error = validateField(name, value);
            newErrors[name] = error;
        });

        setErrors(newErrors);

        return !Object.values(newErrors).some((error) => error !== "");
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        const error = validateField(name, value);

        setErrors({
            ...errors,
            [name]: error,
        });
    };

    const handleImageChange = (files) => {
        setFormData({
            ...formData,
            companyLogo: files // Store the selected image
        });
    };

    useEffect(() => {
        const selectedCompany = companyData.find((company) => company.id === editCompanyId);

        if (selectedCompany) {
            setFormData(selectedCompany);
            setSelectedPlan(selectedCompany.subscription || "");
        } else {
            setFormData({
                ...initialFormValue
            });
        }
    }, [editCompanyId, companyData]);

    return {
        handleInputChange,
        formData,
        errors,
        validateForm,
        setFormData,
        initialFormValue,
        selectedPlan,
        handlePlanChange,
        handleImageChange
    }
}

export default CompanyFormLogic;