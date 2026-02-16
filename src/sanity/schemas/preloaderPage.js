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
            name: 'backgroundImages',
            title: 'Background Images',
            type: 'array',
            description: 'Upload exactly 3 images for the split-screen background (Left, Center, Right)',
            of: [{ type: 'image', options: { hotspot: true } }],
            validation: Rule => Rule.length(3).error('You must have exactly 3 images for the preloader background.')
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
