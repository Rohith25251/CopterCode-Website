export const faviconPage = {
    name: 'faviconPage',
    title: 'Favicon & Browser Tab',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            description: 'Internal title for this configuration',
            initialValue: 'Favicon & Browser Tab'
        },
        {
            name: 'browserTabTitle',
            title: 'Browser Tab Title',
            type: 'string',
            description: 'The text that appears in the browser tab (e.g., "CopterCode | Drone Tech, AI & More")',
            initialValue: 'CopterCode | Drone Tech, AI & More'
        },
        {
            name: 'faviconFormats',
            title: 'Favicon Files',
            type: 'object',
            description: 'Upload favicon files in different formats and sizes',
            fields: [
                {
                    name: 'favico16',
                    title: 'Favicon 16x16 (ICO)',
                    type: 'file',
                    description: 'Classic favicon format (16x16 pixels)',
                    options: {
                        accept: 'image/x-icon, image/vnd.microsoft.icon'
                    }
                },
                {
                    name: 'favico32',
                    title: 'Favicon 32x32 (PNG)',
                    type: 'image',
                    description: 'Modern favicon format (32x32 pixels)',
                    options: { hotspot: false }
                },
                {
                    name: 'appleIcon180',
                    title: 'Apple Touch Icon (180x180)',
                    type: 'image',
                    description: 'Icon for iOS home screen (180x180 pixels)',
                    options: { hotspot: false }
                },
                {
                    name: 'androidIcon192',
                    title: 'Android Icon (192x192)',
                    type: 'image',
                    description: 'Android web app icon (192x192 pixels)',
                    options: { hotspot: false }
                },
                {
                    name: 'androidIcon512',
                    title: 'Android Icon (512x512)',
                    type: 'image',
                    description: 'Large Android web app icon (512x512 pixels)',
                    options: { hotspot: false }
                }
            ]
        },
        {
            name: 'browserConfig',
            title: 'Browser Configuration',
            type: 'object',
            description: 'Additional browser settings',
            fields: [
                {
                    name: 'themeColor',
                    title: 'Theme Color (Hex)',
                    type: 'string',
                    description: 'Primary color for browser chrome (e.g. #000000)',
                    initialValue: '#000000'
                },
                {
                    name: 'backgroundColor',
                    title: 'Background Color (Hex)',
                    type: 'string',
                    description: 'Background color for splash screen (e.g. #ffffff)',
                    initialValue: '#ffffff'
                },
                {
                    name: 'appName',
                    title: 'App Name',
                    type: 'string',
                    description: 'Name of the web application',
                    initialValue: 'CopterCode'
                },
                {
                    name: 'appDescription',
                    title: 'App Description',
                    type: 'string',
                    description: 'Description of the web application',
                    initialValue: 'Drone Tech, AI & Innovation'
                }
            ]
        },
        {
            name: 'metaTags',
            title: 'Meta Tags',
            type: 'object',
            description: 'Additional meta tag information',
            fields: [
                {
                    name: 'msApplication',
                    title: 'MS Application Config',
                    type: 'boolean',
                    description: 'Enable Microsoft Tile configuration',
                    initialValue: true
                },
                {
                    name: 'tileColor',
                    title: 'MS Tile Color (Hex)',
                    type: 'string',
                    description: 'Color for Windows tiles (e.g. #000000)',
                    initialValue: '#000000'
                }
            ]
        }
    ]
}
