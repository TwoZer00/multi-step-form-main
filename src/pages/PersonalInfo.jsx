import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function PersonalInfo() {
    const [data, setData] = useOutletContext();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const dataF = Object.fromEntries(formData);
        let temp = { ...data };
        temp = { ...temp, ...dataF };
        if (e.target.reportValidity()) {
            setData(temp);
            navigate('/select-plan');
        }
        else {
            let tempE = { ...errors };
            Array.from(e.target.querySelectorAll('input')).forEach(item => {
                if (!item.checkValidity()) {
                    tempE[item.name] = item.validationMessage;
                }
                else {
                    delete tempE[item.name];
                }
            })
            setErrors(tempE);
        }

    }
    return (
        <div className="flex flex-col gap-[.55rem] lg:h-full lg:pt-10 pt-7 px-6 lg:px-0 bg-white lg:bg-none mx-4 rounded-lg lg:mx-0 lg:rounded-none pb-7 lg:pb-0 lg:shadow-none shadow-lg">
            <h1 className="text-2xl lg:text-3xl lg:tracking-wide font-bold text-marine-blue">Personal info</h1>
            <p className="text-cool-gray">Please provide your name, email address, and phone number.</p>
            <form className="mt-3 lg:mt-6 flex flex-col gap-3.5 lg:gap-[18px] h-full" onSubmit={onSubmit} noValidate>
                <InputNormal id={"name"} label={"Name"} type={"text"} placeholder={"e.g. Stephen King"} error={errors.name} value={data?.name} />
                <InputNormal id={"email"} label={"Email Address"} type={"email"} placeholder={"e.g. stephenking@lorem.com"} error={errors.email} value={data?.email} />
                <InputNormal id={"phone"} label={"Phone Number"} type={"tel"} regex={"^\\+(?:[0-9] ?){6,14}[0-9]$"} placeholder={"e.g. +1 234 567 890"} error={errors.phone} value={data?.phone} />
                <footer className="lg:mt-auto flex flex-row justify-end bg-white w-full fixed bottom-0 left-0 pt-4 lg:pt-0 lg:static">
                    <button type="submit" className="w-fit bg-marine-blue text-white px-4 lg:px-6 mt-auto mb-4 text-sm lg:text-base rounded lg:rounded-lg py-2.5 lg:py-3 font-medium hover:bg-opacity-75 transition-colors lg:mr-0 mr-4">
                        Next Step
                    </button>
                </footer>
            </form>
        </div>
    )
}

const InputNormal = ({ id, type, label, placeholder, error, value, regex }) => {
    return (
        <div className="flex flex-col lg:mt-1 gap-1 lg:gap-1.5 relative">
            <label htmlFor={id} className="text-xs lg:text-sm tracking-tight text-marine-blue" >{label}</label>
            <input required type={type} id={id} name={id} pattern={regex} placeholder={placeholder} defaultValue={value} className={`text-marine-blue font-medium placeholder:tracking-tight px-3.5 pt-1.5 pb-2 lg:pt-3 lg:pb-2.5 placeholder:font-medium border rounded ${error ? "outline outline-1 outline-strawberry-red" : "focus-visible:outline focus-visible:outline-1 focus-visible:outline-purplish-blue"}`} />
            <span className={`${error ? "block" : "hidden"} absolute text-sm text-strawberry-red font-semibold right-0`}>This fiels is required</span>
        </div>
    )
}
