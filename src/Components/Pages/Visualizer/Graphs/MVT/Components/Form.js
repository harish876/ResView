import React, { useContext, useState } from 'react';
import { FontVarTitle } from '../../../../../Shared/Title';
import { Icon } from '../../../../../Shared/Icon';
import { transactionsIcon } from '../../../../../../Resources/Icons';
import { ThemeContext } from '../../../../../../Context/theme';
import { ReplicaButton } from '../../../../../Shared/Buttons';

const Form = () => {
    const { theme } = useContext(ThemeContext);

    const [formData, setFormData] = useState({
        formKey: '',
        value: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const submitGet = () => {
        // ! CALL GET API HERE 
        console.log('GET', formData.formKey);
        setFormData({
            formKey: '',
            value: ''
        });
    };

    const submitCommit = () => {
        // ! CALL COMMIT API HERE 
        console.log('COMMIT', formData);
        setFormData({
            formKey: '',
            value: ''
        });
    };

    return (
        <div className='mt-2 rounded-md w-550p py-4 px-2 border-3p border-solid border-gray-700 dark:border-gray-50 flex flex-col items-center justify-center gap-y-6 bg-blue-10 dark:bg-blue-450 h-320p'>
            <div className="flex items-center justify-center gap-x-2 w-full">
                <Icon
                    fill={theme ? "rgb(209,213,219)" : "black"}
                    height={'1em'}
                    path={transactionsIcon}
                    viewBox={'0 0 448 512'}
                />
                <FontVarTitle title={'Send Transaction'} />
            </div>
            <div className="flex flex-col gap-y-2 w-full">
                <FontVarTitle title={'Key'} fontClass={'text-15p'} />
                <div className='px-8'>
                    <input
                        type="text"
                        id="formKey-input"
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={formData.formKey}
                        name='formKey'
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-y-2 w-full">
                <FontVarTitle title={'Value'} fontClass={'text-15p'} />
                <div className='px-8'>
                    <input
                        type="text"
                        id="value-input"
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={formData.value}
                        name='value'
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="flex items-center justify-center gap-x-8 my-1 w-full">
                <ReplicaButton
                    title={'Get'}
                    onClick={submitGet}
                    faulty={false}
                />
                <ReplicaButton
                    title={'Commit'}
                    onClick={submitCommit}
                    faulty={false}
                />
            </div>
        </div>
    );
};

export default Form;