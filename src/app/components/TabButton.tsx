import React, {ReactNode} from 'react'

// TabButtonコンポーネントのpropsの型を定義
interface TabButtonProps {
    active: boolean;
    selectTab: () => void;
    children: ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, selectTab, children }) => {
    const buttonClasses = active
        ? 'border-fg text-fg'
        : 'border-transparent text-fg-subtle hover:text-fg-muted'
    return (
        <button
            onClick={selectTab}
            className={`border-b pb-1 font-mono text-sm transition-colors ${buttonClasses}`}
        >
            {children}
        </button>
    )
}

export default TabButton
