export const popupPage = {
    name: 'popupPage',
    title: 'Popup Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            initialValue: 'Popup Page Configuration',
            description: 'Internal title for this document'
        },
        {
            name: 'isEnabled',
            title: 'Enable Popup Announcement',
            type: 'boolean',
            initialValue: true,
            description: 'Turn the homepage popup announcement on or off'
        },
        {
            name: 'image',
            title: 'Popup Image',
            type: 'image',
            description: 'Popup announcement image (1:1 aspect ratio recommended, e.g. 1080x1080)',
            options: { hotspot: true }
        },
        {
            name: 'delay',
            title: 'Popup Delay (Seconds)',
            type: 'number',
            initialValue: 2.5,
            description: 'Time to wait before displaying the popup after the preloader finishes (e.g. 2.5)'
        }
    ]
};
