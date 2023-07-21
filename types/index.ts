export interface AnimationContainerProps {
    children: React.ReactNode;
    customClassName?: string;
    customDelay?: number;
}

export interface TimelineEventProps {
    active?: boolean;
    children: React.ReactNode;
    last?: boolean;
}