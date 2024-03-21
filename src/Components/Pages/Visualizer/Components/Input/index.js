import React, { useMemo, useState } from 'react'
import TransactionSelect from './TransactionSelect'
import BaseInput from './Inputs'
import { SubmitButton } from '../../../../Shared/Buttons';

const Input = (chooseTransaction, sendGet, sendPost) => {

    const [customTransaction, setCustomTransaction] = useState('');
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [view, setView] = useState(-1);

    const selectTransaction = (index) => {
        setView(index);
    };

    const performAction = () => {
        if(view===0){
          console.log("Txn number: ",customTransaction);
          //selectTransaction(parseInt(customTransaction));
        }
        else if(view===0){
          console.log("key: ", key, " Value:", value);
          //sendSet(key, value);
        }
        else if(view===0){
          console.log("key: ", key);
          //sendGet(key);
        }
        setCustomTransaction('');
        setKey('');
        setValue('');
      }

    const SelectTrans = () => {
        return (
            <>
                <input
            type="text"
            name="customTransaction"
            value={customTransaction}
            onChange={(e) => setCustomTransaction(e.target.value)}
            className="bg-gray-700 border border-gray-600 px-4 py-2 rounded-md text-white"
          />
            </>
        );
    };
    
    const SetTrans = () => {
        return (
            <div className='flex items-center justify-around gap-x-16'>
                <input type="text" name="key" value={key} onChange={(e) => setKey(e.target.value)} className="bg-gray-700 border border-gray-600 px-4 py-2 rounded-md text-white" />
                <input type="text" name="value" value={value} onChange={(e) => setValue(e.target.value)} className="bg-gray-700 border border-gray-600 px-4 py-2 rounded-md text-white" />
            </div>
        );
    };
    
    const GetTrans = () => {
        return (
            <>
                <input type="text" name="key" value={key} onChange={(e) => setKey(e.target.value)} className="bg-gray-700 border border-gray-600 px-4 py-2 rounded-md text-white" />
            </>
        );
    };

    const viewDictionary = useMemo(
        () => ({
            0: <SelectTrans />,
            1: <GetTrans />,
            2: <SetTrans />,
        }),
        []
    );

    const submitDictionary = useMemo(
        () => ({
            0: <SubmitButton title={'Confirm'} loading={false} onClick={performAction}/>,
            1: <SubmitButton title={'Confirm'} loading={false} onClick={performAction}/>,
            2: <SubmitButton title={'Confirm'} loading={false} onClick={performAction}/>,
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
                <div className='mt-5p'>
                    <SubmitButton title={'Confirm'} loading={false} />
                </div>
            )}
        </div>
    )
}

export default Input