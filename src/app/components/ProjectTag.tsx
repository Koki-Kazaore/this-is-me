import React from 'react'

// ProjectTagコンポーネントのpropsの型を定義
interface ProjectTagProps {
    name: string;
    onClick: (name: string) => void;
    isSelected: boolean;
}

const ProjectTag: React.FC<ProjectTagProps> = ({ name, onClick, isSelected }) => {
    const buttonStyles = isSelected
    ? 'text-fg border-fg'
    : 'text-fg-subtle border-transparent hover:text-fg-muted'
    return (
        <button
            className={`${buttonStyles} border-b pb-1 font-mono text-sm transition-colors`}
            onClick={() => onClick(name)}
        >
            {name}
        </button>
    )
}

export default ProjectTag
