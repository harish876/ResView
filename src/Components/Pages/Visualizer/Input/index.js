import React, { useState } from 'react';
import TransactionSelect from './TransactionSelect';
import { sendGet, sendPost } from '../../../../APIs';
import { IconButtons } from '../../../Shared/Buttons';

const Input = ({ chooseTransaction }) => {

    const [customTransaction, setCustomTransaction] = useState('');
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [view, setView] = useState(-1);

    const selectTransaction = (index) => {
        setView(index);
    };

    const performAction = () => {
        if (view === 0) {
            console.log("Txn number: ", customTransaction);
            chooseTransaction(parseInt(customTransaction));
        }
        else if (view === 1) {
            console.log("key: ", key);
            sendGet(key);
        }
        else if (view === 2) {
            console.log("key: ", key, " Value:", value);
            sendPost(key, value);
        }
        else {
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
                    className="dark:bg-gray-700 bg-gray-10 border-2p border-gray-600 dark:text-white text-gray-600 px-4 py-2 rounded-md"
                />
            </>
        );
    };

    const SetTrans = () => {
        return (
            <div className='flex items-center justify-around gap-x-16'>
                <input type="text" placeholder="key" name="key" value={key} onChange={(e) => setKey(e.target.value)} className="dark:bg-gray-700 bg-gray-10  border-2p border-gray-600 px-4 py-2 rounded-md dark:text-white text-gray-600" />
                <input type="text" placeholder="value" name="value" value={value} onChange={(e) => setValue(e.target.value)} className="dark:bg-gray-700 bg-gray-10 border-2p border-gray-600 px-4 py-2 rounded-md dark:text-white text-gray-600" />
            </div>
        );
    };

    const GetTrans = () => {
        return (
            <>
                <input type="text" placeholder="key" name="key" value={key} onChange={(e) => setKey(e.target.value)} className="dark:bg-gray-700 bg-gray-10 border-2p border-gray-600 dark:text-white text-gray-600 px-4 py-2 rounded-md" />
            </>
        );
    };

    return (
        <div className='flex items-center justify-start gap-x-16'>
            <div className="my-8">
                <TransactionSelect selectTransaction={selectTransaction} />
            </div>
            {(view === 0) && (
                <div className="my-8">
                    <SelectTrans />
                    <IconButtons title={'Confirm'} onClick={performAction} />
                </div>
            )}
            {(view === 1) && (
                <div className="my-8">
                    <GetTrans />
                    <IconButtons title={'Confirm'} onClick={performAction} />
                </div>
            )}
            {(view === 2) && (
                <div className="my-8">
                    <SetTrans />
                    <IconButtons title={'Confirm'} onClick={performAction} />
                </div>
            )}
        </div>
    )
}

export default Input