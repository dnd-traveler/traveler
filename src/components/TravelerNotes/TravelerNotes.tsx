import React, { useCallback, useEffect, useState } from 'react';
import { Typography } from 'antd';

const TravelerNotes = () => {
    const [notes, setNotes] = useState<string>('Type your notes here...');

    const noteChangeHandler = useCallback((note: string) => {
        setNotes(note);
        localStorage.setItem('traveler-notes', note);
    }, []);

    useEffect(() => {
        const localNotes = localStorage.getItem('traveler-notes');

        if (localNotes) {
            setNotes(localNotes);
        }
    }, []);

    return (
        <div>
            <Typography.Paragraph
                editable={{
                    onChange: noteChangeHandler
                }}
            >{notes}</Typography.Paragraph>
        </div>
    )
};

export default TravelerNotes;