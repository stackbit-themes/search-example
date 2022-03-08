import React from 'react';
/*
    Next up: make this into editable content with Markdown/MDX :-)
*/

const techStack = [
    { label: 'Stackbit', url: 'https://www.stackbit.com' },
    { label: 'Next.js', url: 'https://nextjs.org/' },
    { label: 'Algolia', url: 'https://www.algolia.com' },
    { label: 'Tailwind', url: 'https://tailwindcss.com' },
    { label: 'daisyUI', url: 'https://daisyui.com' }
];

export default function HomepageHeader(props) {
    const { page, themeCounts, searchIndexName } = props;
    return (
        <div className="flex flex-col mx-20 mb-4 gap-2">
            <div data-sb-field-path="title" className="text-2xl font-bold mt-8">
                {page.title}
            </div>
            <div className="flex gap-1 items-center">
                <span>Tech stack of this site: </span>
                {techStack.map((tech, idx) => (
                    <a className="badge badge-outline rounded-md" href={tech.url} key={idx}>
                        {tech.label}
                    </a>
                ))}
            </div>
            <div className="text-md font-light">
                Dataset:{' '}
                <a className="underline" href="https://jamstackthemes.dev">
                    Jamstackthemes.dev
                </a>
                <br />
                Live themes: <span className="font-semibold">{themeCounts.enabled}</span> (out of{' '}
                <span className="font-semibold">{themeCounts.all}</span> in total)
                <br />
                Results below are returned from Algolia (index: <strong>{searchIndexName}</strong>). If you edit
                content, remember to re-index!
            </div>
        </div>
    );
}
