import React, { useState } from 'react';
import TransactionSelect from './TransactionSelect';
import { sendGet, sendPost } from '../../../../APIs';
import { IconButtons } from '../../../Shared/Buttons';


const SelectTrans = ({ customTransaction, changeCustomTransaction }) => {
    return (
        <>
            <input
                type="text"
                placeholder="View Chosen Transaction"
                name="customTransaction"
                value={customTransaction}
                onChange={(e) => changeCustomTransaction(e.target.value)}
                className="dark:bg-gray-700 bg-gray-10 border-2p border-gray-600 dark:text-white text-gray-600 px-4 py-2 rounded-md"
            />
        </>
    );
};

const SetTrans = ({ changeValue, changeKey, keyValue, value }) => {
    return (
        <div className='flex items-center justify-around gap-x-16'>
            <input type="text" placeholder="Key" name="key" value={keyValue} onChange={(e) => changeKey(e.target.value)} className="dark:bg-gray-700 bg-gray-10  border-2p border-gray-600 px-4 py-2 rounded-md dark:text-white text-gray-600" />
            <input type="text" placeholder="Value" name="value" value={value} onChange={(e) => changeValue(e.target.value)} className="dark:bg-gray-700 bg-gray-10 border-2p border-gray-600 px-4 py-2 rounded-md dark:text-white text-gray-600" />
        </div>
    );
};

const GetTrans = ({ changeKey, keyValue }) => {
    return (
        <>
            <input type="text" placeholder="Key" name="key" value={keyValue} onChange={(e) => changeKey(e.target.value)} className="dark:bg-gray-700 bg-gray-10 border-2p border-gray-600 dark:text-white text-gray-600 px-4 py-2 rounded-md" />
        </>
    );
};

const Input = ({ chooseTransaction }) => {

    const [customTransaction, setCustomTransaction] = useState('');
    const [keyValue, setKeyValue] = useState('');
    const [value, setValue] = useState('');
    const [view, setView] = useState(-1);

    const changeKey = (value) => setKeyValue(value);
    const changeValue = (value) => {
        setValue(value);
    }
    const changeCustomTransaction = (value) => {
        setCustomTransaction(value)
    };

    const selectTransaction = (index) => {
        setView(index);
    };

    const performAction = () => {
        if (view === 0) {
            // console.log("Txn number: ", customTransaction);
            chooseTransaction(parseInt(customTransaction));
        }
        else if (view === 1) {
            // console.log("key: ", key);
            sendGet(keyValue);
        }
        else if (view === 2) {
            // console.log("key: ", key, " Value:", value);
            sendPost(keyValue, value);
        }
        else {
            console.log("ERROR");
        }
        setCustomTransaction('');
        setKeyValue('');
        setValue('');
    }

    const viewToComponentDict = {
        0: <SelectTrans customTransaction={customTransaction} changeCustomTransaction={changeCustomTransaction} />,
        1: <GetTrans changeKey={changeKey} keyValue={keyValue} />,
        2: <SetTrans changeValue={changeValue} changeKey={changeKey} keyValue={keyValue} value={value} />
    }

    return (
        <div className='flex items-center justify-start gap-x-16'>
            <div className="my-8">
                <TransactionSelect selectTransaction={selectTransaction} />
            </div>
            <div className="my-8 flex items-center justify-center gap-x-16">
                {viewToComponentDict[view]}
                {view < 3 && <IconButtons title={'Confirm'} onClick={performAction} />}
            </div>
        </div>
    )
}

export default Input