import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HeroSection from '../../src/app/components/HeroSection';

// Mock Next.js Image component to handle priority prop correctly
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority, ...props }: any) => (
    <img {...props} data-priority={priority} />
  ),
}));

// Mock the scrollIntoView function
Element.prototype.scrollIntoView = jest.fn();

describe('HeroSection', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  it('renders the hero section with correct content', () => {
    render(<HeroSection />);

    // Check for the name heading and role line
    expect(screen.getByRole('heading', { name: 'Koki Kazaore' })).toBeInTheDocument();
    expect(screen.getByText('Backend Engineer — Tokyo, JP')).toBeInTheDocument();

    // Check for the description text
    expect(screen.getByText(/I am studying the development of IoT prototypes and network security in university./i)).toBeInTheDocument();
    expect(screen.getByText(/Additionally, I am working on web application development as an intern web application engineer./i)).toBeInTheDocument();

    // Check for buttons
    expect(screen.getByText('Contact me')).toBeInTheDocument();
    expect(screen.getByText('Download CV')).toBeInTheDocument();
  });

  it('renders the profile image', () => {
    const { container } = render(<HeroSection />);
    const imageElement = container.querySelector('img');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', expect.stringContaining('hero-image.png'));
    expect(imageElement).toHaveAttribute('alt', '風折晃輝');
  });

  it('scrolls to "letsConnect" element when Contact me button is clicked', () => {
    // Create a mock element with id "letsConnect"
    const mockElement = document.createElement('div');
    mockElement.id = 'letsConnect';
    document.body.appendChild(mockElement);

    render(<HeroSection />);

    // Click the Contact me button
    const contactButton = screen.getByText('Contact me');
    fireEvent.click(contactButton);

    // Check if scrollIntoView was called
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    // Clean up
    document.body.removeChild(mockElement);
  });

  it('has the correct styling and layout classes', () => {
    const { container } = render(<HeroSection />);

    // Check for section vertical rhythm
    const sectionElement = container.querySelector('section');
    expect(sectionElement).toHaveClass('pt-16');
    expect(sectionElement).toHaveClass('pb-20');

    // Heading uses the top-level foreground token
    const headingElement = screen.getByRole('heading', { name: 'Koki Kazaore' });
    expect(headingElement).toHaveClass('text-fg');

    // Role line uses the mono meta treatment
    const roleElement = screen.getByText('Backend Engineer — Tokyo, JP');
    expect(roleElement).toHaveClass('font-mono');
    expect(roleElement).toHaveClass('text-fg-subtle');
  });
});
