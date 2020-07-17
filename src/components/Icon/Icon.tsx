import React, { FunctionComponent, SVGProps } from 'react';

import { ReactComponent as D3Icon } from './assets/3d.svg';
import { ReactComponent as BobWIcon } from './assets/bobw.svg';
import { ReactComponent as HumanIcon } from './assets/human.svg';
import { ReactComponent as PinIcon } from './assets/pin.svg';

export enum IconName {
  d3 = 'd3',
  bobw = 'bobw',
  human = 'human',
  pin = 'pin',
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconName: IconName;
  className?: string;
}

const IconsMap: {
  [key in IconName]: FunctionComponent<SVGProps<SVGSVGElement>>;
} = {
  d3: D3Icon,
  bobw: BobWIcon,
  human: HumanIcon,
  pin: PinIcon,
};

const Icon: React.FC<IconProps> = ({ iconName, className, ...svgProps }) => {
  const SelectedIcon = IconsMap[iconName];
  return <SelectedIcon className={className} {...svgProps} />;
};

export default Icon;
