import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface PortalMenuProps {
  children: React.ReactNode;
  top: number;
  left: number;
  onClose?: () => void;
}

export const PortalMenu: React.FC<PortalMenuProps> = ({ children, top, left, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return createPortal(
    <div
      ref={menuRef}
      style={{ position: 'fixed', top, left, zIndex: 9999 }}
      className="min-w-[140px] max-w-[200px] w-auto px-2 py-1 bg-background/95 backdrop-blur-md border border-border/50 rounded-xl shadow-xl transition-all duration-150 ease-in-out animate-fade-in"
    >
      {children}
    </div>,
    document.body
  );
}; 