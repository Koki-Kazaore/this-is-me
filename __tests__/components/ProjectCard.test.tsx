import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectCard from '../../src/app/components/ProjectCard';

describe('ProjectCard', () => {
  const props = {
    imgUrl: '/images/projects/test.png',
    title: 'Test Project',
    description: 'This is a test project.',
    tags: ['Test'],
    gitUrl: 'https://github.com/example/test',
    productUrl: 'https://example.com',
  };

  it('renders the title and description', () => {
    render(<ProjectCard {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
  });

  it('renders Github links correctly', () => {
    render(<ProjectCard {...props} />);
    const linkElement = screen.getByText(/GitHub/);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', props.gitUrl);
  });

  it('renders Product links correctly', () => {
    render(<ProjectCard {...props} />);
    const linkElement = screen.getByText(/Site/);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', props.productUrl);
  });

  it('omits links when URLs are empty', () => {
    render(
      <ProjectCard {...props} gitUrl='' productUrl='' />
    );
    expect(screen.queryByText(/GitHub/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Site/)).not.toBeInTheDocument();
  });

  it('uses foreground tokens for text hierarchy', () => {
    render(<ProjectCard {...props} />);
    expect(screen.getByText(props.title)).toHaveClass('text-fg');
    expect(screen.getByText(props.description)).toHaveClass('text-fg-muted');
  });
});
