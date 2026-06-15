export const jobOpenRole = {
    name: 'jobOpenRole',
    title: 'Job Open Role',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Job Title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'company',
            title: 'Company Name',
            type: 'string',
            initialValue: 'CopterCode'
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string',
            initialValue: 'Remote/Hybrid'
        },
        {
            name: 'postedDate',
            title: 'Posted Date',
            type: 'string',
            initialValue: 'Recent'
        },
        {
            name: 'description',
            title: 'Job Description',
            type: 'text',
            rows: 3
        },
        {
            name: 'badges',
            title: 'Badges (Type, Location, etc.)',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'e.g. "Remote", "Full-Time", "Engineering"'
        },
        {
            name: 'applyLink',
            title: 'Apply Link (mailto: or http)',
            type: 'string',
            initialValue: 'mailto:hr@coptercode.co.in'
        }
    ]
};
