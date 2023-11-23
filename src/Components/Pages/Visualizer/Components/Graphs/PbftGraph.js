import { ResponsiveBump } from '@nivo/bump'

const PbftGraph = ({  }) => {

    // ? Names of the steps 
    const arr0 = ['Request', 'Propose', 'Pre-prepare', 'Prepare', 'Commit', 'Reply'];

    // ? Number of steps 
    const arr1 = new Array(arr0.length+1).fill(0);

    // ? Number of replicas
    const arr2 = new Array(5).fill(0);


  
  return (
    <div className='flex flex-col items-center justify-center'>
        <div className="flex items-center justify-center gap-x-[5em]">
            {arr0.map((element, index) => (
                <div className="text-16p text-black bold dark:text-white" key={index}>
                    {element}
                </div>
            ))}
        </div>
        <div className="flex flex-col items-center justify-center"
        style={{ 
            gap: '4.5em'
         }}
    >
        {arr2.map((element, index) => (
            <div 
                className='flex items-center justify-center'
                style={{ 
                    gap: '8em'
                }}
                key={index}
            >
                {arr1.map((element, index) => (
                    <div key={index} className='rounded-full bg-black dark:bg-white w-5p h-5p'>

                    </div>
                ))}
            </div>
        ))}
    </div>
    </div>
  );
}

export default PbftGraph;


