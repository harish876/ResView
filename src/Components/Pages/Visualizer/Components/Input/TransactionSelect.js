import React, { useState } from 'react'
import { DEFAULT_TRANS_SELECT_STR, DROPDOWN_OPTS } from '../../../../../Constants';

const TransactionSelect = ({ selectTransaction }) => {
    const [open, setOpen] = useState(false);
    const [buttonTitle, setButtonTitle] = useState(DEFAULT_TRANS_SELECT_STR);

    const toggleButton = () => {
        setOpen(open => !open);
    };

    const selectTrans = (index) => {
        const str = index > 2 ? DEFAULT_TRANS_SELECT_STR : DROPDOWN_OPTS[index];
        selectTransaction(index);
        setButtonTitle(str);
        toggleButton();
    };

  return (
    <div className='relative'>   
          <div className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 w-250p flex items-center justify-between cursor-pointer" type="button" onClick={toggleButton}>
            <div>
                {buttonTitle}
            </div>
            <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
        </div>

        {open && (
            <div className="absolute z-1000 bg-white divide-y divide-gray-100 rounded-lg shadow w-212p mt-2 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                      {DROPDOWN_OPTS.length > 0 && (
                          DROPDOWN_OPTS.map((value, index) => (
                              <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer" key={index} onClick={() => selectTrans(index)}>
                                {value}
                              </li>
                          ))
                      )}
                </ul>
            </div>
        )}
    </div>
  )
}

export default TransactionSelect