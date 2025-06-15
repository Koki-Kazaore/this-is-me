import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HeroSection from '../../src/app/components/HeroSection';

// Mock the framer-motion and react-type-animation
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
  },
}));

// Mock Next.js Image component to handle priority prop correctly
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority, ...props }: any) => (
    <img {...props} data-priority={priority} />
  ),
}));

jest.mock('react-type-animation', () => ({
  TypeAnimation: ({ sequence, wrapper, speed, repeat }: any) => (
    <span>
      {sequence[0]}
    </span>
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

    // Check for the greeting text
    expect(screen.getByText(/Hello, I'm/i)).toBeInTheDocument();

    // Check for the TypeAnimation content (first sequence item)
    expect(screen.getByText('Koki')).toBeInTheDocument();

    // Check for the description text
    expect(screen.getByText(/I am studying the development of IoT prototypes and network security in university./i)).toBeInTheDocument();
    expect(screen.getByText(/Additionally, I am working on web application development as an intern web application engineer./i)).toBeInTheDocument();

    // Check for buttons
    expect(screen.getByText('Contact Me')).toBeInTheDocument();
    expect(screen.getByText('Download CV')).toBeInTheDocument();
  });

  it('renders the profile image', () => {
    const { container } = render(<HeroSection />);
    const imageElement = container.querySelector('img');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', expect.stringContaining('hero-image.png'));
    expect(imageElement).toHaveAttribute('alt', '風折晃輝');
  });

  it('scrolls to "letsConnect" element when Contact Me button is clicked', () => {
    // Create a mock element with id "letsConnect"
    const mockElement = document.createElement('div');
    mockElement.id = 'letsConnect';
    document.body.appendChild(mockElement);

    render(<HeroSection />);

    // Click the Contact Me button
    const contactButton = screen.getByText('Contact Me');
    fireEvent.click(contactButton);

    // Check if scrollIntoView was called
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    // Clean up
    document.body.removeChild(mockElement);
  });

  it('has the correct styling and layout classes', () => {
    const { container } = render(<HeroSection />);

    // Check for section class
    const sectionElement = container.querySelector('section');
    expect(sectionElement).toHaveClass('lg:py-16');

    // Check for grid layout
    const gridElement = container.querySelector('.grid');
    expect(gridElement).toHaveClass('grid-cols-1');
    expect(gridElement).toHaveClass('sm:grid-cols-12');

    // Check for content column
    const contentColumn = container.querySelector('.col-span-8');
    expect(contentColumn).toBeInTheDocument();

    // Check for image column
    const imageColumn = container.querySelector('.col-span-4');
    expect(imageColumn).toBeInTheDocument();
  });
});
