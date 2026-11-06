import { useEffect, useState } from 'react';
import { inView } from 'motion';

export default function useActiveSection() {
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    return inView(
      'main section[id]',
      (section) => {
        setActiveSection(section.id);
        return () => {};
      },
      { margin: '-15% 0px -60% 0px' },
    );
  }, []);

  return activeSection;
}
