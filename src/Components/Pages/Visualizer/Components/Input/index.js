import React, { useMemo, useState } from 'react'
import TransactionSelect from './TransactionSelect'
import BaseInput from './Inputs'
import SubmitButton from './SubmitButton';

const SelectTrans = () => {
    return (
        <>
            <BaseInput title={'Enter Transaction ID'} errorMessage={'Field cannot be empty'} error={false} className='transition' />
        </>
    );
};

const SetTrans = () => {
    return (
        <div className='flex items-center justify-around gap-x-16'>
            <BaseInput title={'Key'} errorMessage={'Field cannot be empty'} error={false} />
            <BaseInput title={'Value'} errorMessage={'Field cannot be empty'} error={false} />
        </div>
    );
};

const GetTrans = () => {
    return (
        <>
            <BaseInput title={'Key'} errorMessage={'Field cannot be empty'} error={false} />
        </>
    );
};


const Input = () => {

    const [view, setView] = useState(-1);

    const selectTransaction = (index) => {
        setView(index);
    };

    const viewDictionary = useMemo(
        () => ({
            0: <SelectTrans />,
            1: <GetTrans />,
            2: <SetTrans />,
        }),
        []
    );

    return (
        <div className='flex items-center justify-start gap-x-16'>
            <div className="my-8">
                <TransactionSelect selectTransaction={selectTransaction} />
            </div>
            {viewDictionary[view]}
            {(view > -1 && view < 3) && (
                <div className='mt-3'>
                    <SubmitButton title={'Confirm'} />
                </div>
            )}
        </div>
    )
}

export default Input