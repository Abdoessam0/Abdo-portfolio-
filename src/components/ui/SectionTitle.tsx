import * as React from "react";

type SectionTitleProps = React.PropsWithChildren<{ className?: string; id?: string; }>; 

export function SectionTitle({ children, className = "", id }: SectionTitleProps) {
  return (
    <div id={id} className={`mb-8 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-semibold text-text relative inline-block">
        {children}
        <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-accent/70" />
      </h2>
    </div>
  );
}


