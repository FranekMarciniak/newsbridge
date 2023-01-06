import { ActionIcon } from '@mantine/core';
import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';

const VoteButton: FC<{ upvoted: boolean; onClick: () => void }> = ({
    upvoted,
    onClick,
}) => {
    const [value, setValue] = useState(upvoted);

    const handleClick = () => {
        onClick();
        setValue((prev) => !prev);
    };

    useEffect(() => {
        setValue(upvoted);
    }, [upvoted]);

    return (
        <ActionIcon
            onClick={handleClick}
            variant="light"
            color={value ? 'red' : 'green'}
            size="md"
            title={value ? 'Remove vote' : 'Vote'}
        >
            {value ? <IconChevronDown /> : <IconChevronUp />}
        </ActionIcon>
    );
};
export default VoteButton;
