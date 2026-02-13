export const scrollingAnnouncementBar = {
    name: 'scrollingAnnouncementBar',
    title: 'Scrolling Announcement Bar',
    type: 'object',
    fields: [
        {
            name: 'isEnabled',
            title: 'Enable Announcement Bar',
            type: 'boolean',
            initialValue: true
        },
        {
            name: 'announcements',
            title: 'Announcements',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'text', type: 'string', title: 'Announcement Text' },
                        { name: 'link', type: 'string', title: 'Link (Optional)' },
                        { name: 'isHighlight', type: 'boolean', title: 'Highlight Text?', initialValue: false }
                    ]
                }
            ]
        },
        {
            name: 'scrollSpeed',
            title: 'Scroll Speed (Duration in seconds)',
            description: 'Lower is faster. Default: 30',
            type: 'number',
            initialValue: 30
        },
        {
            name: 'direction',
            title: 'Direction',
            type: 'string',
            options: {
                list: [
                    { title: 'Left', value: 'left' },
                    { title: 'Right', value: 'right' }
                ]
            },
            initialValue: 'left'
        },
        {
            name: 'backgroundColor', // Optional override
            title: 'Background Color (Hex)',
            type: 'string',
            description: 'e.g. #000000. Leave empty for default premium dark theme.',
        },
        {
            name: 'textColor',
            title: 'Text Color (Hex)',
            type: 'string',
            description: 'e.g. #FFFFFF. Leave empty for default.',
        }
    ]
};
