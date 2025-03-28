import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectsSection from '../../src/app/components/ProjectsSection';

describe('ProjectsSection', () => {
  it('displays section headings and all projects initially', () => {
    render(<ProjectsSection />);

    const heading = screen.getByRole('heading', { name: /my projects/i });
    expect(heading).toBeInTheDocument();

    expect(screen.getByText('PFC BALANCE')).toBeInTheDocument();
    expect(screen.getByText('DeLiDev')).toBeInTheDocument();
    expect(screen.getByText('Borrowhood')).toBeInTheDocument();
    expect(screen.getByText('DannnePoint.com')).toBeInTheDocument();
    expect(screen.getByText('One-Click Progress Sharing')).toBeInTheDocument();
    expect(screen.getByText('Bikeying API')).toBeInTheDocument();
  });

  it('displays only web projects when we click on the "Web" tag', () => {
    render(<ProjectsSection />);

    const webTagButton = screen.getByText('Web');
    fireEvent.click(webTagButton);

    expect(screen.getByText('PFC BALANCE')).toBeInTheDocument();
    expect(screen.getByText('DeLiDev')).toBeInTheDocument();
    expect(screen.getByText('Borrowhood')).toBeInTheDocument();
    expect(screen.getByText('DannnePoint.com')).toBeInTheDocument();
    expect(screen.getByText('One-Click Progress Sharing')).toBeInTheDocument();

    expect(screen.queryByText('Bikeying API')).not.toBeInTheDocument();
  });

  it('displays only the else projects when we click on the "Else" tag', () => {
    render(<ProjectsSection />);

    const elseTagButton = screen.getByText('Else');
    fireEvent.click(elseTagButton);

    expect(screen.getByText('Bikeying API')).toBeInTheDocument();

    expect(screen.queryByText('PFC BALANCE')).not.toBeInTheDocument();
    expect(screen.queryByText('DeLiDev')).not.toBeInTheDocument();
    expect(screen.queryByText('Borrowhood')).not.toBeInTheDocument();
    expect(screen.queryByText('DannnePoint.com')).not.toBeInTheDocument();
    expect(screen.queryByText('One-Click Progress Sharing')).not.toBeInTheDocument();
  });

  it('renders elements with id="letsConnect"', () => {
    const { container } = render(<ProjectsSection />);
    const letsConnectDiv = container.querySelector('#letsConnect');
    expect(letsConnectDiv).toBeInTheDocument();
  });
});
