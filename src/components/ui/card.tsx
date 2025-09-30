import * as React from "react";

type CardProps = React.PropsWithChildren<{ className?: string }>;

export function Card({ children, className = "" }: CardProps) {
    return (
        <div className={`rounded-xl bg-bg/60 backdrop-blur-xs shadow-glass ring-1 ring-white/5 ${className}`}>
            {children}
        </div>
    );
}


