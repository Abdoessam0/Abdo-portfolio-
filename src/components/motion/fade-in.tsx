"use client";

import { motion, type MotionProps } from "framer-motion";
import * as React from "react";

type FadeInProps = React.PropsWithChildren<
    MotionProps & { as?: keyof JSX.IntrinsicElements; className?: string }
>;

export function FadeIn({ as = "div", children, className, ...rest }: FadeInProps) {
    const Component: any = motion[as as any] ?? motion.div;
    return (
        <Component
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className={className}
            {...rest}
        >
            {children}
        </Component>
    );
}


