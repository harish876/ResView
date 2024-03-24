import React, { useMemo, useState } from 'react'
import TransactionSelect from './TransactionSelect'
import BaseInput from './Inputs'
import { SubmitButton } from '../../../../Shared/Buttons';

const Input = ({chooseTransaction, sendGet, sendPost}) => {

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
          chooseTransaction(parseInt(customTransaction));
        }
        else if(view===1){
            console.log("key: ", key);
            sendGet(key);
        }
        else if(view===2){
          console.log("key: ", key, " Value:", value);
          sendPost(key, value);
        }
        else{
            console.log("ERROR");
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
            placeholder="View Chosen Transaction"
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
                <input type="text" placeholder="key" name="key" value={key} onChange={(e) => setKey(e.target.value)} className="bg-gray-700 border border-gray-600 px-4 py-2 rounded-md text-white" />
                <input type="text" placeholder="value" name="value" value={value} onChange={(e) => setValue(e.target.value)} className="bg-gray-700 border border-gray-600 px-4 py-2 rounded-md text-white" />
            </div>
        );
    };
    
    const GetTrans = () => {
        return (
            <>
                <input type="text" placeholder="key"  name="key" value={key} onChange={(e) => setKey(e.target.value)} className="bg-gray-700 border border-gray-600 px-4 py-2 rounded-md text-white" />
            </>
        );
    };
    const viewDictionary = [
        <SelectTrans />,
        <GetTrans />,
        <SetTrans />
    ];

    return (
        <div className='flex items-center justify-start gap-x-16'>
            <div className="my-8">
                <TransactionSelect selectTransaction={selectTransaction} />
            </div>
            {(view==0) && (
                    <div className="my-8">
                        <SelectTrans />
                        <button type="submit" style={{ marginLeft: '60px' }} className='py-2.5 px-5 me-2 text-sm font-medium w-120p flex items-center justify-center bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center text-white' onClick={performAction}>
                            Confirm
                        </button>
                    </div>
            )}
            {(view==1) && (
                    <div className="my-8">
                        <GetTrans />
                        <button type="submit" style={{ marginLeft: '60px' }} className='py-2.5 px-5 me-2 text-sm font-medium w-120p flex items-center justify-center bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center text-white' onClick={performAction}>
                            Confirm
                        </button>
                    </div>
            )}
            {(view==2) && (
                    <div className="my-8">
                        <SetTrans />
                        <button type="submit" style={{ marginLeft: '60px' }} className='py-2.5 px-5 me-2 text-sm font-medium w-120p flex items-center justify-center bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center text-white' onClick={performAction}>
                            Confirm
                        </button>
                    </div>
            )}
        </div>
    )
}

export default Input