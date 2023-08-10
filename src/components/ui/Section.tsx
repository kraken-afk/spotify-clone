import { forwardRef, ReactNode, type ReactElement } from "react";

interface SectionProps {
  className?: string;
  children?: ReactNode | ReactNode[];
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className }, ref): ReactElement => (
    <section ref={ref} className={"my-4 overflow-hidden mb-6".concat(` ${className}`)}>
      {children}
    </section>
  )
);

export default Section;
