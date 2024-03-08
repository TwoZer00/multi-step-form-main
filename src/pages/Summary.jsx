import React, { useState } from 'react';
import { Link, useLocation, useNavigate, useOutletContext } from 'react-router-dom';

export default function Summary() {
    const [data, setData] = useOutletContext();
    const [complete, setComplete] = useState(["no", false])
    const navigate = useNavigate();
    const location = useLocation();
    const getTotal = () => {
        let total = 0;
        data.addons?.filter(item => item.check).forEach((items) => {
            total += (data['yearly'] ? (items.price * 10) : items.price);
        });
        switch (data["plan"]) {
            case "arcade":
                total += (data['yearly'] ? (9 * 10) : 9)
                break;
            case "advanced":
                total += (data['yearly'] ? (12 * 10) : 12)
                break;

            default:
                total += (data['yearly'] ? (15 * 10) : 15)
                break;
        }
        return total;
    }
    const handleComplete = () => {
        setComplete(["loading", false])
        setTimeout(() => {
            setComplete(["yes", true])
            const temp = { ...data };
            temp.complete = true;
            setData(temp);
        }, 1000)
    }

    if (!complete[1]) {
        return (
            <>
                {
                    complete[0] === "no" &&
                    <div className='flex flex-col gap-[.55rem] lg:h-full lg:pt-10 lg:px-0 pt-7 px-6 bg-white lg:bg-none mx-4 rounded-lg lg:mx-0 lg:rounded-none pb-7 lg:pb-0 lg:shadow-none shadow-lg'>
                        <h1 className='text-2xl lg:text-3xl lg:tracking-wide font-bold text-marine-blue'>Finishing up</h1>
                        <p className='text-cool-gray'>Double-check everything looks OK before confirming.</p>
                        <div className='mt-3.5 lg:mt-[30px] h-full flex flex-col'>
                            <div className='bg-alabaster px-4 lg:px-6 lg:pt-4 pt-4 pb-6 flex flex-col rounded'>
                                <div className='flex flex-row justify-between items-center'>
                                    <div className='flex flex-col lg:block'>
                                        <h2 className='capitalize font-medium text-sm lg:text-base text-marine-blue'>
                                            {data["plan"]}
                                            <span className='ml-1'>({data["yearly"] ? "Yearly" : "Monthly"})</span>
                                        </h2>
                                        <Link to={"/select-plan"} state={{ from: location }} className='underline text-sm text-cool-gray hover:text-purplish-blue transition-colors under decoration-2' >Change</Link>
                                    </div>
                                    <p className='font-semibold text-marine-blue text-sm lg:text-base'>
                                        $
                                        {data["plan"] === "arcade" ? (data["yearly"] ? 9 * 10 : 9) : data["plan"] === "advanced" ? (data["yearly"] ? 9 * 10 : 9) : (data["yearly"] ? 9 * 10 : 9)}
                                        {data["yearly"] ? "/yr" : "/mo"}
                                    </p>
                                </div>
                                <hr className='mt-3 mb-3 lg:mt-5 lg:mb-4' />
                                <div className='flex flex-col lg:gap-4 gap-3'>
                                    {
                                        data.addons?.filter((item) => (item.check)).map((item, index) => {
                                            return (
                                                <div className='flex flex-row justify-between' key={index + item.title[0]} >
                                                    <h2 className='text-sm text-cool-gray'>{item.title}</h2>
                                                    <p className='text-marine-blue text-sm font-normal'>
                                                        +$
                                                        {
                                                            data['yearly'] ? (item.price * 10) : item.price
                                                        }
                                                        {data["yearly"] ? "/yr" : "/mo"}
                                                    </p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <p className='py-3.5 px-4 lg:py-6 lg:px-6 text-cool-gray text-sm lg:text-md flex flex-row justify-between items-center'>
                                <span>Total ({data["yearly"] ? "per year" : "per month"})</span>
                                <span className='lg:text-xl text-base font-semibold text-purplish-blue'>
                                    +$
                                    {
                                        getTotal()
                                    }
                                    {data["yearly"] ? "/yr" : "/mo"}
                                </span>
                            </p>
                            <footer className='lg:bg-none bg-white py-4 flex flex-row justify-between mt-auto fixed bottom-0 left-0 w-full lg:static px-4 lg:px-0'>
                                <button className='text-cool-gray font-medium hover:text-marine-blue transition-colors text-sm lg:text-base' onClick={() => { navigate('/add-ons') }}>Go Back</button>
                                <button onClick={handleComplete} type='submit' className='bg-purplish-blue rounded lg:rounded-lg text-white py-2.5 px-[1.4rem] font-medium text-sm lg:text-base lg:py-3 lg:px-8 hover:bg-opacity-65 transition-colors'>Confirm</button>
                            </footer>
                        </div>
                    </div>
                }
                {
                    complete[0] === "loading" &&
                    <div className='h-full w-full flex flex-col items-center justify-center'>
                        <h1 className='text-marine-blue text-3xl font-semibold text-center tracking-wider'>Sending...</h1>
                    </div>
                }
            </>
        )
    }
    else {
        return (
            <div className='flex flex-col gap-[.55rem] lg:h-full lg:pt-0 pt-7 px-6 lg:px-0 bg-white lg:bg-none mx-4 rounded-lg lg:mx-0 lg:rounded-none pb-7 lg:pb-0 lg:shadow-none shadow-lg'>
                <div className='h-full w-full flex flex-col items-center justify-center'>
                    <figure className='mt-12 lg:mt-0 lg:mb-8 mb-6'>
                        <img src="./icon-thank-you.svg" alt="icon-thank-you" className='lg:w-20 w-14' />
                    </figure>
                    <div className='flex flex-col lg:gap-3 gap-2'>
                        <h1 className='text-marine-blue text-2xl lg:text-3xl font-semibold text-center tracking-normal lg:tracking-wider'>Thank you!</h1>
                        <p className='text-cool-gray text-base lg:px-1 text-center leading-[1.55rem] lg:leading-normal'>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com</p>
                    </div>
                </div>
            </div>
        )
    }
}
