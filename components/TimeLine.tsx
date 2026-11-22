import Image from 'next/image';
import {TimelineItemProps} from "@/types";

export const Timeline = ({children}: { children: React.ReactNode }) => (
    <ol className='tl'>{children}</ol>
);

export const TimelineItem = ({logo, children}: TimelineItemProps) => (
    <li className='tl__item'>
        <div className='tl__logo'>
            <Image src={logo} alt='' fill sizes="56px"/>
        </div>
        <div className='tl__body'>{children}</div>
    </li>
);

const TimelineItemTitle = ({children}: { children: React.ReactNode }) => (
    <p className='tl__head'>{children}</p>
);

const TimelineItemDescription = ({children}: { children: React.ReactNode }) => (
    <p className='tl__desc'>{children}</p>
);

TimelineItem.Title = TimelineItemTitle;
TimelineItem.Description = TimelineItemDescription;
