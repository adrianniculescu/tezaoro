
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

interface BreadcrumbProps {
  items: {
    label: string;
    href?: string;
  }[];
}

const BreadcrumbNavigation = ({ items }: BreadcrumbProps) => (
  <Breadcrumb className="mb-4">
    <BreadcrumbList>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <BreadcrumbItem>
            {item.href ? (
              <BreadcrumbLink asChild>
                <Link to={item.href}>{item.label}</Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
          {index < items.length - 1 && <BreadcrumbSeparator />}
        </React.Fragment>
      ))}
    </BreadcrumbList>
  </Breadcrumb>
);

export default BreadcrumbNavigation;
