import React, { useContext } from 'react';
import { Resizable } from "re-resizable";
import { GraphResizerContext } from '../../../../Context/graph';

const ResizableContainer = ({ children }) => {
    const { boxValues, setBoxValues, setResizing } = useContext(GraphResizerContext);

    return (
        <>
            <Resizable
                className='py-3 px-2 flex flex-col justify-center items-center rounded-md border-3p border-gray-700 bg-blue-10 dark:border-solid dark:border-gray-50 dark:bg-blue-450 relative'
                size={{ width: boxValues.width, height: boxValues.height }}
                onResizeStop={(e, direction, ref, d) => {
                    setResizing(false);
                    setBoxValues({
                        width: boxValues.width + d.width,
                        height: boxValues.height + d.height,
                    });
                }}
                onResizeStart={(e, d, r) => setResizing(true)}
            >
                {children}
            </Resizable>
        </>
    )
}

export default ResizableContainer