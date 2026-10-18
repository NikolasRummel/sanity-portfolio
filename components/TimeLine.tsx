import classNames from 'classnames';
import Image from 'next/image';
import {TimelineItemProps} from "@/types";

export const Timeline = ({children}: { children: React.ReactNode }) => {
    return (
        <div className='w-full mb-16 relative'>
            {children}
        </div>
    );
};

export const TimelineItem = ({logo, children, last}: TimelineItemProps) => {
    return (
        <div
            className={classNames('w-full flex justify-start gap-6 ml-4 relative', {
                // Wenn es nicht das letzte Element ist, ziehen wir eine normale Border
                'border-l border-neutral-800': !last,
                // Wenn es das letzte Element ist, nutzen wir einen CSS-Gradienten, der nach unten hin ausfällt
                'border-l [border-image:linear-gradient(to_bottom,theme(colors.neutral.800),transparent)_1]': last,
                'pb-16': !last,
            })}
        >
            <div className='relative'>
                <div className='absolute top-[-2px] left-[-24px] h-12 w-12'>
                    <Image src={logo} alt='logo' fill className='rounded-full aspect-square border object-cover bg-neutral-900'/>
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