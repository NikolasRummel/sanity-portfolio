// @ts-ignore
const CodeBlock = ({children}) => {


    return (
        <div className="">
            <div className="flex items-center justify-start mb-7">
                <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                <div className="h-3 w-3 bg-yellow-400 rounded-full mr-2"></div>
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1">
                <div className="relative">
                    <div className="bg-[#9167db]/30 h-32 w-2/3 rounded-full absolute -left-32 -top-8 blur-[190px]"></div>
                </div>
                <code>{children}</code>
            </div>
        </div>
    );
};

export default CodeBlock;
