'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

interface TabsProps {
  tabs: Array<{
    id: string;
    label: string;
    content: React.ReactNode;
  }>;
  defaultValue?: string;
  className?: string;
  listClassName?: string;
  contentClassName?: string;
}

export function Tabs({
  tabs,
  defaultValue,
  className,
  listClassName,
  contentClassName,
}: TabsProps) {
  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue || tabs[0]?.id}
      className={className}
    >
      <TabsPrimitive.List
        className={cn(
          'flex border-b border-gray-light mb-6 overflow-x-auto',
          listClassName
        )}
      >
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.id}
            value={tab.id}
            className={cn(
              'px-6 py-3 text-sm font-medium uppercase tracking-wider',
              'text-gray-medium whitespace-nowrap',
              'border-b-2 border-transparent -mb-px',
              'transition-colors',
              'hover:text-primary-dark',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-inset',
              'data-[state=active]:text-primary-dark data-[state=active]:border-primary-gold'
            )}
          >
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {tabs.map((tab) => (
        <TabsPrimitive.Content
          key={tab.id}
          value={tab.id}
          className={cn(
            'focus:outline-none',
            'data-[state=inactive]:hidden',
            contentClassName
          )}
        >
          {tab.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
