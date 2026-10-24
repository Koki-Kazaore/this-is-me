import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AboutSection from '../../src/app/components/AboutSection';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Find the tab panel wrapping the given text (getByText also finds hidden elements in jsdom)
const panelOf = (text: string) => screen.getByText(text).closest('[aria-hidden]');

describe('AboutSection', () => {
  it('renders the About heading and the three tab buttons', () => {
    render(<AboutSection />);

    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Skills' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Education' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Certifications' })).toBeInTheDocument();
  });

  it('shows the Skills panel and hides the others initially', () => {
    render(<AboutSection />);

    const skillsPanel = panelOf('Programming Language');
    expect(skillsPanel).toHaveAttribute('aria-hidden', 'false');
    expect(skillsPanel).not.toHaveClass('invisible');

    const educationPanel = panelOf('Fukui University');
    expect(educationPanel).toHaveAttribute('aria-hidden', 'true');
    expect(educationPanel).toHaveClass('invisible');

    const certificationsPanel = panelOf('AZ-900 : Azure Fundamentals');
    expect(certificationsPanel).toHaveAttribute('aria-hidden', 'true');
    expect(certificationsPanel).toHaveClass('invisible');
  });

  it('switches the visible panel when the Education tab is clicked', () => {
    render(<AboutSection />);

    fireEvent.click(screen.getByRole('button', { name: 'Education' }));

    const educationPanel = panelOf('Fukui University');
    expect(educationPanel).toHaveAttribute('aria-hidden', 'false');
    expect(educationPanel).not.toHaveClass('invisible');

    const skillsPanel = panelOf('Programming Language');
    expect(skillsPanel).toHaveAttribute('aria-hidden', 'true');
    expect(skillsPanel).toHaveClass('invisible');
  });

  it('renders all panels simultaneously to keep the frame height stable', () => {
    render(<AboutSection />);

    // Hidden panels stay in the DOM so the grid cell sizes to the tallest one
    expect(screen.getByText('Programming Language')).toBeInTheDocument();
    expect(screen.getByText('Fukui University')).toBeInTheDocument();
    expect(screen.getByText('AZ-900 : Azure Fundamentals')).toBeInTheDocument();
  });
});
