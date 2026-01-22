'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionProps {
  items: Array<{
    id: string;
    title: string;
    content: React.ReactNode;
  }>;
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  className?: string;
}

export function Accordion({
  items,
  type = 'single',
  defaultValue,
  className,
}: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      type={type as 'single'}
      defaultValue={defaultValue as string}
      collapsible={type === 'single'}
      className={cn('space-y-2', className)}
    >
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.id}
          value={item.id}
          className="border border-gray-light bg-white overflow-hidden"
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
              className={cn(
                'flex flex-1 items-center justify-between px-6 py-4 text-left',
                'font-heading text-lg font-medium text-primary-dark',
                'transition-colors hover:bg-gray-light/50',
                'group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-inset'
              )}
            >
              {item.title}
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-gray-medium shrink-0 ml-4',
                  'transition-transform duration-300',
                  'group-data-[state=open]:rotate-180'
                )}
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content
            className={cn(
              'overflow-hidden',
              'data-[state=open]:animate-accordion-down',
              'data-[state=closed]:animate-accordion-up'
            )}
          >
            <div className="px-6 pb-4 text-gray-medium leading-relaxed">
              {item.content}
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
