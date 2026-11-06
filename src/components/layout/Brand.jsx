import { usePreferences } from '../../Preferences';
import { CodeXml } from 'lucide-react';
import { profile } from '../../data/portfolio';

export default function Brand() {
  const { t } = usePreferences();
  return (
    <a
      className="brand"
      href="#inicio"
      aria-label={profile.name + t(' — início', ' — home')}
    >
      <CodeXml size={23} aria-hidden="true" />
      <span>
        {profile.name}
        <b>.</b>
      </span>
    </a>
  );
}
