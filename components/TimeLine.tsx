import classNames from 'classnames';
import AnimationContainer from '@/lib/AnimationContainer';
import Image from 'next/image';
import {TimelineItemProps} from "@/types";

export const Timeline = ({children}: { children: React.ReactNode }) => {
    return (
        <AnimationContainer customClassName='w-full mb-16'>
            {children}
        </AnimationContainer>
    );
};

export const TimelineItem = ({logo, children, last}: TimelineItemProps) => {
    return (
        <div
            className={classNames('w-full flex justify-start gap-6 border-neutral-800 ml-4', {
                'border-l': !last,
                'pb-16': !last,
            })}
        >
            <div className='relative'>
                <div className='absolute top-[-2px] left-[-24px] h-12 w-12'>
                    <Image src={logo} alt='logo' fill className='rounded-full aspect-square border '/>
                </div>
            </div>
            <div className='mt-[10px] ml-[15px] flex flex-col gap-2'>{children}</div>
        </div>
    );
};

const TimelineItemTitle = ({children}: { children: React.ReactNode }) => (
    <p className='text-base text-gray-600 dark:text-gray-200'>{children}</p>
);

const TimelineItemDescription = ({children}: { children: React.ReactNode }) => (
    <p className='text-base text-gray-500 dark:text-gray-300 break-words'>{children}</p>
);

TimelineItem.Title = TimelineItemTitle;
TimelineItem.Description = TimelineItemDescription;
