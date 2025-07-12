import React from 'react';
import { Button } from '@/components/ui/button';

interface RestrictedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  allowedRoles: string[];
  userRole: string;
  children: React.ReactNode;
  variant?: string;
  size?: string;
}

const RestrictedButton: React.FC<RestrictedButtonProps> = ({
  allowedRoles,
  userRole,
  children,
  variant = 'default',
  size = 'default',
  className = '',
  ...props
}) => {
  const isAllowed = allowedRoles.includes(userRole);
  return (
    <Button
      variant={variant}
      size={size}
      className={`${className} ${!isAllowed ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={!isAllowed}
      title={!isAllowed ? 'Access denied: You do not have permission for this action based on your role.' : props.title}
      {...props}
    >
      {children}
    </Button>
  );
};

export default RestrictedButton;
