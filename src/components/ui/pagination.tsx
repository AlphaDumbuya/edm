import React, { HTMLAttributes } from 'react';

// Define basic props for the components (can be expanded later)
interface PaginationProps extends HTMLAttributes<HTMLElement> {}
interface PaginationContentProps extends HTMLAttributes<HTMLUListElement> {}
interface PaginationItemProps extends HTMLAttributes<HTMLLIElement> {}
interface PaginationLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean;
}
interface PaginationButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({ children, ...props }) => {
  return <nav {...props}>{children}</nav>;
};

export const PaginationContent: React.FC<PaginationContentProps> = ({ children, ...props }) => {
  return <ul {...props}>{children}</ul>;
};

export const PaginationItem: React.FC<PaginationItemProps> = ({ children, ...props }) => {
  return <li {...props}>{children}</li>;
};

export const PaginationLink: React.FC<PaginationLinkProps> = ({ children, isActive, ...props }) => {
  return (
    <a className={isActive ? 'active' : ''} {...props}>
      {children}
    </a>
  );
};

export const PaginationPrevious: React.FC<PaginationButtonProps> = ({ children = 'Previous', ...props }) => {
  return <button {...props}>{children}</button>;
};

export const PaginationNext: React.FC<PaginationButtonProps> = ({ children = 'Next', ...props }) => {
  return <button {...props}>{children}</button>;
};