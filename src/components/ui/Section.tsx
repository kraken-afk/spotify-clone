import { forwardRef, PropsWithChildren, type ReactElement } from "react";

interface SectionProps {
  className?: string;
}

const Section = forwardRef<HTMLElement, PropsWithChildren>(
  ({ children, className }: PropsWithChildren & SectionProps, ref): ReactElement => (
    <section ref={ref} className={"my-4 overflow-hidden mb-6".concat(` ${className}`)}>
      {children}
    </section>
  )
);

export default Section;
