import React, { memo, ReactNode } from 'react';
import clsx from 'clsx';

import { RequestState } from '../../api';
import EmptyState from '../EmptyState';
import styles from './RequestStateVisualize.module.scss';

interface RequestStateVisualizeProps {
  children: ReactNode;
  requestState: RequestState;
  className?: string;
}

const RequestStateVisualize: React.FC<RequestStateVisualizeProps> = ({
  className,
  requestState,
  children,
}) => {
  if (requestState === RequestState.success) {
    return <>{children}</>;
  }
  if (requestState === RequestState.failure) {
    return (
      <EmptyState
        title="Something went wrong"
        description="Try refreshing the page"
      />
    );
  }

  return <div className={clsx(styles.loader, className)} />;
};

export default memo(RequestStateVisualize);
