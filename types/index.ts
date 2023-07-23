export interface AnimationContainerProps {
    children: React.ReactNode;
    customClassName?: string;
    customDelay?: number;
}

export interface TimelineItemProps {
    logo: string;
    children: React.ReactNode;
    last?: boolean;
}