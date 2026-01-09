
// Fix: Added React import to resolve the "Cannot find namespace 'React'" error when using React.ReactNode.
import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

export interface Template {
  id: string;
  title: string;
  image: string;
  tag: string;
  video?: boolean;
}
