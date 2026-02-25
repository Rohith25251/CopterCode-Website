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
                    hidden: ({ parent, root }) => root?.videoOnlyMode === true
                },
                {
                    name: 'image',
                    title: 'Background Image',
                    type: 'image',
                    description: 'High-quality background image for the loading screen (1920x1080 recommended).',
                    options: { hotspot: true },
                    hidden: ({ parent, root }) => parent?.type !== 'image' || root?.videoOnlyMode === true
                },
                {
                    name: 'video',
                    title: 'Background Video',
                    type: 'object',
                    description: 'Background video - choose between URL or upload',
                    hidden: ({ parent, root }) => (root?.videoOnlyMode === true) ? false : (parent?.type !== 'video'),
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
            hidden: ({ root }) => root?.videoOnlyMode === true
        },
        {
            name: 'titlePrefix',
            title: 'Title Prefix',
            type: 'string',
            description: 'The first part of the main heading (e.g. WELCOME TO)',
            initialValue: 'WELCOME TO',
            hidden: ({ root }) => root?.videoOnlyMode === true
        },
        {
            name: 'highlightedTitle',
            title: 'Highlighted Title',
            type: 'string',
            description: 'The highlighted part of the main heading (e.g. COPTERCODE)',
            initialValue: 'COPTERCODE',
            hidden: ({ root }) => root?.videoOnlyMode === true
        },
        {
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
            description: 'The subtitle or slogan below the main heading',
            initialValue: 'Engineering The Unknown',
            hidden: ({ root }) => root?.videoOnlyMode === true
        }
    ]
}
