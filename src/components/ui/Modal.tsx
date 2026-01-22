'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  showClose?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
};

export function Modal({
  open,
  onOpenChange,
  children,
  title,
  description,
  className,
  showClose = true,
  size = 'md',
}: ModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            'fixed inset-0 bg-black/60 z-50',
            'data-[state=open]:animate-fade-in',
            'data-[state=closed]:animate-fade-out'
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-[calc(100%-2rem)] p-6 bg-white shadow-xl z-50',
            'data-[state=open]:animate-fade-in-up',
            'focus:outline-none',
            sizeStyles[size],
            className
          )}
        >
          {showClose && (
            <DialogPrimitive.Close
              className={cn(
                'absolute top-4 right-4 p-2',
                'text-gray-medium hover:text-primary-dark transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold'
              )}
            >
              <X className="w-5 h-5" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}

          {title && (
            <DialogPrimitive.Title className="font-heading text-2xl font-medium mb-2">
              {title}
            </DialogPrimitive.Title>
          )}

          {description && (
            <DialogPrimitive.Description className="text-gray-medium mb-6">
              {description}
            </DialogPrimitive.Description>
          )}

          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export function ModalTrigger({
  children,
  asChild,
  className,
}: {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}) {
  return (
    <DialogPrimitive.Trigger asChild={asChild} className={className}>
      {children}
    </DialogPrimitive.Trigger>
  );
}
