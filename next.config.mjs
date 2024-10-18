import mdx from '@next/mdx';

const withMDX = mdx({
    extension: /\.mdx?$/,
    options: {},
});

const corsHeaders = [
    {
        key: 'Access-Control-Allow-Origin',
        value: '*',
    },
    {
        key: 'Access-Control-Allow-Methods',
        value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    },
    {
        key: 'Access-Control-Allow-Headers',
        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
    async headers() {
        return [
            {
                source: '/api/authenticate',
                headers: corsHeaders,
            },
        ];
    },
    images: {
        domains: ['res.cloudinary.com'],
    },
};

export default withMDX(nextConfig);