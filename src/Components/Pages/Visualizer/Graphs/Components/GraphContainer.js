import {
    useWindowSize
} from '@react-hook/window-size';
import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { maximizeIcon } from '../../../../../Resources/Icons';
import { Icon } from '../../../../Shared/Icon';
import { FontVarTitle } from '../../../../Shared/Title';
import Modal from './Modal';
import { ThemeContext } from '../../../../../Context/theme';

const GraphContainer = ({ children, title, heightBig, disableExpand }) => {
    const [_, height] = useWindowSize()

    const { theme } = useContext(ThemeContext)

    let concurrentHeight = Math.floor(height / 2)

    const [modalActive, setModalActive] = useState(false);

    const openModal = () => {
        setModalActive(true);
    }

    const closeModal = () => {
        setModalActive(false);
    }

    return (
        <div
            className={classNames('py-2 px-1 flex flex-col justify-center items-center rounded-md border-3p bg-blue-10 border-solid border-gray-700 dark:border-gray-50 dark:bg-blue-450 relative w-full')}
            style={heightBig ? { height: concurrentHeight + 200 } : { height: concurrentHeight }}
        >
            <FontVarTitle title={title} />
            {children}
            {!disableExpand && title !== 'Practical Byzantine Fault Tolerance' && (
                <div className='absolute top-0 right-0 flex items-center justify-center gap-x-2 border-b-2p border-l-2p border-gray-700 dark:border-gray-50 rounded-bl-md p-1 cursor-pointer transition hover:px-2' onClick={openModal} data-modal-target="popup-modal" data-modal-toggle="popup-modal" type='button'>
                    <div className='text-14p dark:text-gray-300 text-gray-700'>
                        Expand
                    </div>
                    <Icon path={maximizeIcon} fill={theme ? "rgb(209,213,219)" : "black"} height={"1em"} />
                </div>
            )}
            {modalActive && (
                <Modal onClose={closeModal} title={title}>
                    {children}
                </Modal>
            )}
        </div>
    )
}

export default GraphContainer