import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

export default function AddOns() {
    const [data, setData] = useOutletContext();
    const navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
        const target = e.target;
        const onlineS = target['online-service'].checked;
        const largerS = target['larger-storage'].checked;
        const customP = target['customizable-profile'].checked;
        const dataF = {
            addons:
                [{ check: onlineS, price: 1, title: "Online Service" },
                { check: largerS, price: 2, title: "Larger Storage" },
                { check: customP, price: 2, title: "Customizable Profile" }]

        }
        let temp = { ...data };
        temp = { ...temp, ...dataF };
        setData(temp);
        navigate('/summary');
    }
    return (
        <div className='flex flex-col gap-[.55rem] lg:h-full lg:pt-10 pt-7 px-6 lg:px-0 bg-white lg:bg-none mx-4 rounded-lg lg:mx-0 lg:rounded-none pb-7 lg:pb-0 lg:shadow-none shadow-lg'>
            <h1 className='text-2xl lg:text-3xl lg:tracking-wide font-bold text-marine-blue'>Pick add-ons</h1>
            <p className='text-cool-gray'>Add-ons help enhance your gaming experience.</p>
            <form className='mt-3.5 lg:mt-[30px] h-full flex flex-col lg:gap-5 gap-3' onSubmit={onSubmit} >
                <InputA id={"online-service"} checked={data?.addons?.find(item => item.title === "Online Service")} >
                    <h2 className='font-medium text-marine-blue pointer-events-none text-sm lg:text-base'>Online service</h2>
                    <p className='text-cool-gray pointer-events-none text-xs lg:text-sm lg:mt-[.04rem]'>Access to multiplayer games</p>
                    {data["yearly"] ? <p className='text-purplish-blue tracking-tighter text-sm flex-none'>+$10/yr</p> : <p className='text-purplish-blue tracking-tighter text-sm flex-none'>+$1/mo</p>}
                </InputA>
                <InputA id={"larger-storage"} checked={data?.addons?.find(item => item.title === "Larger Storage")}>
                    <h2 className='font-medium text-marine-blue pointer-events-none text-sm lg:text-base'>Larger storage</h2>
                    <p className='text-cool-gray pointer-events-none text-xs lg:text-sm lg:mt-[.04rem]'>Extra 1TB of cloud save</p>
                    {data["yearly"] ? <p className='text-purplish-blue tracking-tighter text-sm flex-none'>+$20/yr</p> : <p className='text-purplish-blue tracking-tighter text-sm flex-none'>+$2/mo</p>}
                </InputA>
                <InputA id={"customizable-profile"} checked={data?.addons?.find(item => item.title === "Customizable Profile")}>
                    <h2 className='font-medium text-marine-blue pointer-events-none text-sm lg:text-base'>Customizable profile</h2>
                    <p className='text-cool-gray pointer-events-none text-xs lg:text-sm lg:mt-[.04rem]'>Custom theme on your profile</p>
                    {data["yearly"] ? <p className='text-purplish-blue tracking-tighter text-sm flex-none'>+$20/yr</p> : <p className='text-purplish-blue tracking-tighter text-sm flex-none'>+$2/mo</p>}
                </InputA>
                <footer className='flex flex-row justify-between mt-auto fixed lg:static bottom-0 left-0 bg-white lg:bg-none w-full px-4 py-4 lg:px-0 lg:py-4'>
                    <button type='button' className='text-cool-gray font-medium hover:text-marine-blue transition-colors lg:text-base text-sm' onClick={() => { navigate('/select-plan') }}>Go Back</button>
                    <button type='submit' className='bg-marine-blue rounded lg:rounded-lg text-white font-medium py-2.5 px-4 text-sm lg:text-base lg:py-3 lg:px-6 hover:bg-opacity-75 transition-colors'>Next Step</button>
                </footer>
            </form>
        </div >
    )
}


const InputA = ({ id, checked = false, children }) => {
    const [option, setOption] = useState(checked?.check);
    return (
        <fieldset className='w-full'>
            <input type="checkbox" id={id} className={`peer hidden`} defaultChecked={checked?.check} name={id} value={option} onChange={() => { setOption(!option) }} />
            <label htmlFor={id} className='px-3.5 py-3 gap-4 hover:cursor-pointer hover:border-purple-700 transition-colors bg-white flex flex-row border rounded-lg border-cool-gray peer-checked:border-purple-700 peer-checked:bg-alabaster lg:px-5 lg:py-4 items-center relative group lg:gap-7'>
                <div className='flex-none'>
                    <img className={`pointer-events-none aspect-square w-5 transition-colors ${option ? "bg-purplish-blue border-0" : "bg-transparent border"} rounded p-1 box-border `} src="./icon-checkmark.svg" alt="icon-online-service" />
                </div>
                <div className='flex flex-col w-full text-left'>
                    {children[0]}
                    {children[1]}
                </div>
                {children[2]}
            </label>
        </fieldset>
    )
}