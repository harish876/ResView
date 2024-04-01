import { ReplicaButton } from "../../../../Shared/Buttons";
import { FontVarTitle } from "../../../../Shared/Title";

const MVT_GRAPH_LABELS = ['Replica 1', 'Replica 2', 'Replica 3', 'Replica 4']

const Manipulator = ({
    labelToggleFaulty,
    labelToggle,
    toggleFaulty,
    toggleLine,
}) => {
    return (
        <div className='mt-2 rounded-md shadow-md w-700p py-6 px-2 dark:border-1p dark:border-solid dark:border-gray-50 flex flex-col gap-y-6'>
            <div className="flex flex-col gap-y-4">
                <FontVarTitle title={'Select Replica To be Faulty:'} fontClass={'text-18p'} />
                <div className='flex gap-x-7 justify-center'>
                    {MVT_GRAPH_LABELS.length > 0 && MVT_GRAPH_LABELS.map((title, index) => (
                        <ReplicaButton
                            title={title}
                            onClick={() => toggleFaulty(title)}
                            faulty={labelToggleFaulty[title]}
                            key={index}
                        />
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-y-4">
                <FontVarTitle title={'Toggle Line Graph:'} fontClass={'text-18p'} />
                <div className='flex gap-x-7 justify-center'>
                    {MVT_GRAPH_LABELS.length > 0 && MVT_GRAPH_LABELS.map((title, index) => (
                        <ReplicaButton
                            title={title}
                            onClick={() => toggleLine(title)}
                            lineActive={labelToggle[title]}
                            lineToggle={true}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Manipulator
