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
  };

  it('renders the title and description', () => {
    render(<ProjectCard {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
  });

  it('applies the background image style correctly', () => {
    const { container } = render(<ProjectCard {...props} />);
    const backgroundDiv = container.querySelector('div[style]');
    expect(backgroundDiv).toBeInTheDocument();
    expect(backgroundDiv).toHaveStyle(`background: url(${props.imgUrl})`);
    expect(backgroundDiv).toHaveStyle('background-size: contain');
    expect(backgroundDiv).toHaveStyle('background-repeat: no-repeat');
    expect(backgroundDiv).toHaveStyle('background-position: center');
  });

  it('renders Github links correctly', () => {
    render(<ProjectCard {...props} />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', props.gitUrl);
  });

  test('has a CodeBracketIcon(SVG) in the link', () => {
    const { container } = render(<ProjectCard {...props} />);
    const linkElement = container.querySelector('a');
    expect(linkElement).toBeInTheDocument();
    const svgElement = linkElement?.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });
});
