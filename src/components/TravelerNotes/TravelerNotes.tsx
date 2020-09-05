import React, { useState } from 'react';
import { Typography } from 'antd';

const TravelerNotes = () => {
    const [notes, setNotes] = useState<string>('Type your notes here...');

    return (
        <div>
            <Typography.Paragraph
                editable={{
                    onChange: setNotes
                }}
            >{notes}</Typography.Paragraph>
        </div>
    )
};

export default TravelerNotes;