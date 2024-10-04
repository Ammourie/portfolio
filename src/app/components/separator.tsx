'use client';

import React from 'react';
import { Flex } from '@/once-ui/components';

interface SeparatorProps {
  color?: string;
  thickness?: number;
  width?: string;
  style?: 'solid' | 'dashed' | 'dotted';
  animate?: boolean;
}

const Separator: React.FC<SeparatorProps> = ({
  color = 'var(--brand-strong)',
  thickness = 2,
  width = '100%',
  style = 'solid',
  animate = false,
}) => {
  return (
    <Flex
      fillWidth
      justifyContent="center"
      alignItems="center"
      paddingY="m"
    >
      <div
        style={{
          width,
          height: `${thickness}px`,
          backgroundColor: color,
          borderStyle: style,
          borderWidth: style !== 'solid' ? `${thickness}px` : 0,
          borderColor: color,
          animation: animate ? 'separatorAnimation 2s ease-in-out infinite' : 'none',
        }}
      />
      <style jsx>{`
        @keyframes separatorAnimation {
          0% { width: 0; }
          50% { width: ${width}; }
          100% { width: 0; }
        }
      `}</style>
    </Flex>
  );
};

export default Separator;
