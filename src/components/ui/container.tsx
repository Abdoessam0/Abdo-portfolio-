import * as React from "react";

type ContainerProps = React.PropsWithChildren<{ className?: string }>;

export function Container({ children, className = "" }: ContainerProps) {
    return (
        <div className={`mx-auto w-full max-w-6xl px-4 md:px-6 ${className}`}>{children}</div>
    );
}


