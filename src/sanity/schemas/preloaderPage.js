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
            name: 'videoOnlyMode',
            title: 'Video Only Mode',
            type: 'boolean',
            description: 'Enable to display ONLY video with no other content (logo, text, etc.)',
            initialValue: false
        },
        {
            name: 'imageOnlyMode',
            title: 'Image Only Mode',
            type: 'boolean',
            description: 'Enable to display ONLY image with no other content (logo, text, etc.)',
            initialValue: false
        },
        {
            name: 'background',
            title: 'Background',
            type: 'object',
            description: 'Add either a background image or video for the loading screen',
            fields: [
                {
                    name: 'type',
                    title: 'Background Type',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Image', value: 'image' },
                            { title: 'Video', value: 'video' }
                        ],
                        layout: 'radio'
                    },
                    hidden: ({ parent, root }) => root?.videoOnlyMode === true || root?.imageOnlyMode === true
                },
                {
                    name: 'image',
                    title: 'Background Image',
                    type: 'image',
                    description: 'High-quality background image for the loading screen (1920x1080 recommended).',
                    options: { hotspot: true },
                    hidden: ({ parent, root }) => (root?.imageOnlyMode === true) ? false : (parent?.type !== 'image' || root?.videoOnlyMode === true)
                },
                {
                    name: 'video',
                    title: 'Background Video',
                    type: 'object',
                    description: 'Background video - choose between URL or upload',
                    hidden: ({ parent, root }) => (root?.imageOnlyMode === true) ? true : ((root?.videoOnlyMode === true) ? false : (parent?.type !== 'video')),
                    fields: [
                        {
                            name: 'source',
                            title: 'Video Source',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Upload Video File', value: 'upload' },
                                    { title: 'Video URL', value: 'url' }
                                ],
                                layout: 'radio'
                            }
                        },
                        {
                            name: 'uploadedVideo',
                            title: 'Upload Video File',
                            type: 'file',
                            description: 'Upload a video file (MP4, WebM, etc.)',
                            hidden: ({ parent }) => parent?.source !== 'upload',
                            options: {
                                accept: 'video/*'
                            }
                        },
                        {
                            name: 'videoUrl',
                            title: 'Video URL',
                            type: 'string',
                            description: 'Paste a video URL (YouTube, Vimeo, etc. or direct video link)',
                            hidden: ({ parent }) => parent?.source !== 'url'
                        },
                        {
                            name: 'posterImage',
                            title: 'Poster Image',
                            type: 'image',
                            description: 'Thumbnail/poster image to show before video plays (1920x1080 recommended)',
                            options: { hotspot: true }
                        }
                    ]
                }
            ]
        },
        {
            name: 'logo',
            title: 'Center Logo',
            type: 'image',
            description: 'The logo displayed in the center with glow effect',
            options: { hotspot: true },
            hidden: ({ root }) => root?.videoOnlyMode === true || root?.imageOnlyMode === true
        },
        {
            name: 'titlePrefix',
            title: 'Title Prefix',
            type: 'object',
            description: 'The first part of the main heading (e.g. WELCOME TO)',
            hidden: ({ root }) => root?.videoOnlyMode === true || root?.imageOnlyMode === true,
            fields: [
                {
                    name: 'text',
                    title: 'Text',
                    type: 'string',
                    initialValue: 'WELCOME TO'
                },
                {
                    name: 'color',
                    title: 'Text Color',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Black', value: 'black' },
                            { title: 'White', value: 'white' },
                            { title: 'White (80% opacity)', value: 'white/80' },
                            { title: 'White (60% opacity)', value: 'white/60' },
                            { title: 'Accent', value: 'accent' },
                            { title: 'Primary', value: 'primary' },
                            { title: 'Custom Hex', value: 'custom' }
                        ]
                    },
                    initialValue: 'black'
                },
                {
                    name: 'customColor',
                    title: 'Custom Color (Hex)',
                    type: 'string',
                    description: 'Enter hex color code (e.g., #ffffff)',
                    hidden: ({ parent }) => parent?.color !== 'custom'
                },
                {
                    name: 'fontSize',
                    title: 'Font Size',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Extra Small (12px)', value: 'text-xs' },
                            { title: 'Small (14px)', value: 'text-sm' },
                            { title: 'Base (16px)', value: 'text-base' },
                            { title: 'Large (18px)', value: 'text-lg' },
                            { title: 'XL (20px)', value: 'text-xl' }
                        ]
                    },
                    initialValue: 'text-sm'
                },
                {
                    name: 'fontWeight',
                    title: 'Font Weight',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Light (300)', value: 'font-light' },
                            { title: 'Normal (400)', value: 'font-normal' },
                            { title: 'Medium (500)', value: 'font-medium' },
                            { title: 'Semibold (600)', value: 'font-semibold' },
                            { title: 'Bold (700)', value: 'font-bold' }
                        ]
                    },
                    initialValue: 'font-light'
                },
                {
                    name: 'letterSpacing',
                    title: 'Letter Spacing',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Normal', value: 'tracking-normal' },
                            { title: 'Wide (0.4em)', value: 'tracking-[0.4em]' },
                            { title: 'Wider (0.6em)', value: 'tracking-[0.6em]' },
                            { title: 'Widest (0.8em)', value: 'tracking-[0.8em]' }
                        ]
                    },
                    initialValue: 'tracking-[0.4em]'
                }
            ]
        },
        {
            name: 'highlightedTitle',
            title: 'Highlighted Title',
            type: 'object',
            description: 'The highlighted part of the main heading (e.g. COPTERCODE)',
            hidden: ({ root }) => root?.videoOnlyMode === true || root?.imageOnlyMode === true,
            fields: [
                {
                    name: 'text',
                    title: 'Text',
                    type: 'string',
                    initialValue: 'COPTERCODE'
                },
                {
                    name: 'color',
                    title: 'Text Color',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Black', value: 'black' },
                            { title: 'White', value: 'white' },
                            { title: 'White (80% opacity)', value: 'white/80' },
                            { title: 'White (60% opacity)', value: 'white/60' },
                            { title: 'Accent', value: 'accent' },
                            { title: 'Primary', value: 'primary' },
                            { title: 'Custom Hex', value: 'custom' }
                        ]
                    },
                    initialValue: 'black'
                },
                {
                    name: 'customColor',
                    title: 'Custom Color (Hex)',
                    type: 'string',
                    description: 'Enter hex color code (e.g., #ffffff)',
                    hidden: ({ parent }) => parent?.color !== 'custom'
                },
                {
                    name: 'fontSize',
                    title: 'Font Size',
                    type: 'string',
                    options: {
                        list: [
                            { title: '3XL (30px)', value: 'text-3xl' },
                            { title: '4XL (36px)', value: 'text-4xl' },
                            { title: '5XL (48px)', value: 'text-5xl' },
                            { title: '6XL (60px)', value: 'text-6xl' },
                            { title: '7XL (72px)', value: 'text-7xl' }
                        ]
                    },
                    initialValue: 'text-7xl'
                },
                {
                    name: 'fontWeight',
                    title: 'Font Weight',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Light (300)', value: 'font-light' },
                            { title: 'Normal (400)', value: 'font-normal' },
                            { title: 'Medium (500)', value: 'font-medium' },
                            { title: 'Semibold (600)', value: 'font-semibold' },
                            { title: 'Bold (700)', value: 'font-bold' }
                        ]
                    },
                    initialValue: 'font-bold'
                },
                {
                    name: 'letterSpacing',
                    title: 'Letter Spacing',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Tight', value: 'tracking-tight' },
                            { title: 'Normal', value: 'tracking-normal' },
                            { title: 'Wide (0.4em)', value: 'tracking-[0.4em]' }
                        ]
                    },
                    initialValue: 'tracking-tight'
                }
            ]
        },
        {
            name: 'tagline',
            title: 'Tagline',
            type: 'object',
            description: 'The subtitle or slogan below the main heading',
            hidden: ({ root }) => root?.videoOnlyMode === true || root?.imageOnlyMode === true,
            fields: [
                {
                    name: 'text',
                    title: 'Text',
                    type: 'string',
                    initialValue: 'Engineering The Unknown'
                },
                {
                    name: 'color',
                    title: 'Text Color',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Black', value: 'black' },
                            { title: 'White', value: 'white' },
                            { title: 'White (80% opacity)', value: 'white/80' },
                            { title: 'White (60% opacity)', value: 'white/60' },
                            { title: 'Accent', value: 'accent' },
                            { title: 'Primary', value: 'primary' },
                            { title: 'Custom Hex', value: 'custom' }
                        ]
                    },
                    initialValue: 'black'
                },
                {
                    name: 'customColor',
                    title: 'Custom Color (Hex)',
                    type: 'string',
                    description: 'Enter hex color code (e.g., #ffffff)',
                    hidden: ({ parent }) => parent?.color !== 'custom'
                },
                {
                    name: 'fontSize',
                    title: 'Font Size',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Extra Small (12px)', value: 'text-xs' },
                            { title: 'Small (14px)', value: 'text-sm' },
                            { title: 'Base (16px)', value: 'text-base' },
                            { title: 'Large (18px)', value: 'text-lg' }
                        ]
                    },
                    initialValue: 'text-sm'
                },
                {
                    name: 'fontWeight',
                    title: 'Font Weight',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Light (300)', value: 'font-light' },
                            { title: 'Normal (400)', value: 'font-normal' },
                            { title: 'Medium (500)', value: 'font-medium' },
                            { title: 'Semibold (600)', value: 'font-semibold' },
                            { title: 'Bold (700)', value: 'font-bold' }
                        ]
                    },
                    initialValue: 'font-light'
                },
                {
                    name: 'letterSpacing',
                    title: 'Letter Spacing',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Normal', value: 'tracking-normal' },
                            { title: 'Wide (0.2em)', value: 'tracking-[0.2em]' },
                            { title: 'Wider (0.4em)', value: 'tracking-[0.4em]' }
                        ]
                    },
                    initialValue: 'tracking-[0.2em]'
                }
            ]
        }
    ]
}
