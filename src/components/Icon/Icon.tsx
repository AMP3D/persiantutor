import { icons, type IconName } from './icon';

interface IconProps {
  name: IconName;
}

const Icon = ({ name }: IconProps) => {
  const Svg = icons[name];
  return <Svg className="icon" aria-hidden="true" focusable="false" />;
};

export default Icon;
