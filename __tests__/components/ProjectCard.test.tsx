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
    const linkElement = screen.getAllByRole('link');
    expect(linkElement[0]).toBeInTheDocument();
    expect(linkElement[0]).toHaveAttribute('href', props.gitUrl);
  });

  it('renders Product links correctly', () => {
    render(<ProjectCard {...props} />);
    const linkElement = screen.getAllByRole('link');
    expect(linkElement[1]).toBeInTheDocument();
    expect(linkElement[1]).toHaveAttribute('href', props.productUrl);
  });

  it('has a CodeBracketIcon(SVG) in the link', () => {
    const { container } = render(<ProjectCard {...props} />);
    const linkElement = container.querySelector('a');
    expect(linkElement).toBeInTheDocument();
    const svgElement = linkElement?.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });
});
