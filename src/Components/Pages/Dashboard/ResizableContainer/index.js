import React, { useContext } from 'react';
import { Resizable } from "re-resizable";
import { GraphResizerContext } from '../../../../Context/graph';

const ResizableContainer = ({ children }) => {
    const { boxValues, setBoxValues, setResizing } = useContext(GraphResizerContext);

    return (
        <>
            <Resizable
                className='py-3 px-2 shadow-md flex flex-col justify-center items-center rounded-md bg-white dark:border-3p dark:border-solid dark:border-gray-50 dark:bg-blue-500 relative'
                // data-aos='fade-in'
                // data-aos-delay={300}
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