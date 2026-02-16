export const preloaderPage = {
    name: 'preloaderPage',
    title: 'Preloader Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            description: 'Internal title for this page (e.g. "Preloader Page")',
            initialValue: 'Preloader Page'
        },
        {
            name: 'backgroundImage',
            title: 'Background Image',
            type: 'image',
            description: 'High-quality background image for the loading screen (1920x1080 recommended).',
            options: { hotspot: true }
        },
        {
            name: 'logo',
            title: 'Center Logo',
            type: 'image',
            description: 'The logo displayed in the center with glow effect',
            options: { hotspot: true }
        },
        {
            name: 'titlePrefix',
            title: 'Title Prefix',
            type: 'string',
            description: 'The first part of the main heading (e.g. WELCOME TO)',
            initialValue: 'WELCOME TO'
        },
        {
            name: 'highlightedTitle',
            title: 'Highlighted Title',
            type: 'string',
            description: 'The highlighted part of the main heading (e.g. COPTERCODE)',
            initialValue: 'COPTERCODE'
        },
        {
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
            description: 'The subtitle or slogan below the main heading',
            initialValue: 'Engineering The Unknown'
        }
    ]
}
