import React from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';

export default function SelectPlan() {
    const [data, setData] = useOutletContext();
    const navigate = useNavigate();
    const location = useLocation();
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const target = e.target;
        const plan = formData.get('plan');
        const yearly = target.yearly.checked;
        const dataF = {
            plan,
            yearly
        }
        let temp = { ...data };
        temp = { ...temp, ...dataF };
        setData(temp);
        navigate(location.state?.from?.pathname || "/add-ons");
    }
    const changePlan = (e) => {
        const target = e.target;
        const yearly = target.checked;
        const dataF = {
            yearly
        }
        let temp = { ...data };
        temp = { ...temp, ...dataF };
        setData(temp);
    }
    return (
        <div className='flex flex-col gap-[.55rem] lg:h-full lg:pt-10 pt-7 px-6 lg:px-0 bg-white lg:bg-none mx-4 rounded-lg lg:mx-0 lg:rounded-none pb-7 lg:pb-0 lg:shadow-none shadow-lg'>
            <h1 className='text-2xl lg:text-3xl lg:tracking-wide font-bold text-marine-blue'>Select your plan</h1>
            <p className='text-cool-gray'>You have the option of monthly or yearly billing.</p>
            <form className='mt-3.5 lg:mt-[1.9rem] h-full flex flex-col justify-between lg:justify-normal' onSubmit={onSubmit}>
                <fieldset className='flex flex-col lg:flex-row justify-between gap-3 lg:gap-4'>
                    <InputRadio data={data} value={"arcade"} />
                    <InputRadio data={data} value={"advanced"} />
                    <InputRadio data={data} value={"pro"} />
                </fieldset>
                <section className='flex flex-row items-center py-3.5 lg:mt-7 mt-5 rounded-lg justify-center gap-6 pr-3 bg-alabaster'>
                    <input type="checkbox" name='yearly' className='peer hidden' id='yearly' onChange={changePlan} defaultChecked={data?.yearly} />
                    <label htmlFor="yearly" className='peer-checked:text-cool-gray font-medium pointer-events-none select-none text-marine-blue text-sm' >
                        Monthly
                    </label>
                    <label htmlFor="yearly" className='flex-none bg-marine-blue rounded-full border-4 border-marine-blue relative aspect-video w-fit h-5 inline-block after:content-[""] after:block after:absolute after:rounded-full after:h-full after:aspect-square after:w-fit after:bg-white hover:cursor-pointer after:left-0 after:peer-checked:left-full after:translate-x-0 peer-checked:after:-translate-x-full' >
                    </label>
                    <label htmlFor="yearly" className='peer-checked:text-marine-blue font-medium pointer-events-none select-none text-sm text-cool-gray'>
                        Yearly
                    </label>
                </section>
                <footer className='lg:mt-auto lg:px-0 flex flex-row justify-between fixed bottom-0 left-0 w-full lg:static bg-white lg:bg-none px-4 py-4'>
                    <button type='button' onClick={() => { navigate('/') }} className='text-cool-gray font-medium hover:text-marine-blue text-sm lg:text-base transition-colors'>
                        Go Back
                    </button>
                    <button type='submit' className='bg-marine-blue text-white w-fit lg:px-6 mt-auto rounded px-4 lg:rounded-lg lg:py-3 py-2.5 lg:text-base text-sm font-medium ml-auto hover:bg-opacity-75 transition-colors'>
                        {location.state?.from?.pathname ? "Continue" : "Next Step"}
                    </button>
                </footer>
            </form>
        </div>
    )
}

const prices = {
    arcade: { month: 9, year: 90 },
    advanced: { month: 12, year: 120 },
    pro: { month: 15, year: 150 }
}

const InputRadio = ({ value, data }) => {
    return (
        <div className='w-full'>
            <input type="radio" name={"plan"} id={value} className='hidden peer' value={value} defaultChecked={data?.plan === value || true} />
            <label htmlFor={value} className='hover:cursor-pointer gap-3.5 lg:gap-0 py-4 px-4 lg:py-[1.2rem] lg:px-[.9rem] h-fit lg:w-[8.6rem] bg-white flex flex-row lg:flex-col border rounded-lg border-cool-gray peer-checked:border-purple-700 peer-checked:bg-alabaster hover:border-purple-700'>
                <img className='pointer-events-none aspect-square w-10' src={`./icon-${value}.svg`} alt="icon-arcade" />
                <p className='flex flex-col'>
                    <h2 className='font-medium text-marine-blue pointer-events-none lg:mt-[2.45rem] capitalize'>{value}</h2>
                    <p className='text-cool-gray pointer-events-none text-sm lg:mt-[.04rem]'>${prices[value][data?.yearly ? "year" : "month"]}/{data.yearly ? "yr" : "mo"}</p>
                    {data["yearly"] && <small className='text-marine-blue text-xs lg:mt-1.5'>2 months free</small>}
                </p>
            </label>
        </div>
    )
}
