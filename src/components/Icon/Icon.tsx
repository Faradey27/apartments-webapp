import React, { FunctionComponent, SVGProps } from 'react';

import { ReactComponent as D3Icon } from './assets/3d.svg';
import { ReactComponent as ArrowRightIcon } from './assets/arrowRight.svg';
import { ReactComponent as BobWIcon } from './assets/bobw.svg';
import { ReactComponent as CloseIcon } from './assets/close.svg';
import { ReactComponent as CoffeeIcon } from './assets/coffee.svg';
import { ReactComponent as HostedIcon } from './assets/hosted.svg';
import { ReactComponent as HumanIcon } from './assets/human.svg';
import { ReactComponent as KeylessIcon } from './assets/keyless.svg';
import { ReactComponent as LocalIcon } from './assets/local.svg';
import { ReactComponent as PinIcon } from './assets/pin.svg';
import { ReactComponent as RestedIcon } from './assets/rested.svg';
import { ReactComponent as SustainableIcon } from './assets/sustainable.svg';

export enum IconName {
  d3 = 'd3',
  bobw = 'bobw',
  human = 'human',
  pin = 'pin',
  arrowRight = 'arrowRight',
  coffeee = 'coffee',
  hosted = 'hosted',
  keyless = 'keyless',
  local = 'local',
  rested = 'rested',
  sustainable = 'sustainable',
  close = 'close',
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
  arrowRight: ArrowRightIcon,
  coffee: CoffeeIcon,
  hosted: HostedIcon,
  keyless: KeylessIcon,
  local: LocalIcon,
  rested: RestedIcon,
  sustainable: SustainableIcon,
  close: CloseIcon,
};

const Icon: React.FC<IconProps> = ({ iconName, className, ...svgProps }) => {
  const SelectedIcon = IconsMap[iconName];
  return <SelectedIcon className={className} {...svgProps} />;
};

export default Icon;
