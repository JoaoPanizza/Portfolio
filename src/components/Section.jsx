import SectionFile from './SectionFile';
import ScrollReveal from './ScrollReveal';

export default function Section({
  id,
  number,
  eyebrow,
  title,
  description,
  children,
  className = '',
}) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="container">
        <SectionFile id={id} />
        <ScrollReveal className="section-heading">
          <div>
            <p className="eyebrow">
              <span>{number} /</span> {eyebrow}
            </p>
            <h2>{title}</h2>
          </div>
          {description && <p className="section-description">{description}</p>}
        </ScrollReveal>
        {children}
      </div>
    </section>
  );
}
