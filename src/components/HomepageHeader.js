/* eslint-disable @next/next/no-img-element */
import React from 'react';

const techStack = [
    { name: 'github', url: 'https://github.com/stackbit/example-search-many-themes', width: 'w-[28px]' },
    { name: 'stackbit', url: 'https://www.stackbit.com' },
    { name: 'next', url: 'https://nextjs.org/' },
    { name: 'tailwind', url: 'https://tailwindcss.com', width: 'w-[32px]' },
    { name: 'algolia', url: 'https://www.algolia.com', width: 'w-[90px]' },
    { name: 'daisyUI', url: 'https://daisyui.com', width: 'w-[80px]' }
];

export default function HomepageHeader(props) {
    const { page, themeCounts } = props;
    return (
        <div className="flex flex-col mx-[2.5%] mb-6 gap-2">
            <div className="flex text-center my-6">
                <div data-sb-field-path="title" className="text-xl text-neutral font-bold">
                    {page.title}
                </div>
            </div>

            <div className="stats shadow rounded-[8px]">
                <div className="stat">
                    <div className="stat-title">Active themes</div>
                    <div className="stat-value">{themeCounts.enabled.toLocaleString()}</div>
                    <div className="stat-desc">Themes with working live demo</div>
                </div>

                <div className="stat">
                    <div className="stat-title">All themes</div>
                    <div className="stat-value">{themeCounts.all.toLocaleString()}</div>
                    <div className="stat-desc">
                        From{' '}
                        <a className="underline" href="https://jamstackthemes.dev">
                            Jamstackthemes.dev
                        </a>
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-title">Environment</div>
                    <div className="stat-value">{process.env.NODE_ENV}</div>
                    <div className="stat-desc">Algolia index is per-environment</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Tech stack</div>
                    <div className="stat-value flex items-center gap-[10px]">
                        {techStack.map((tech, idx) => {
                            const classes = [tech.width || 'w-[26px]', 'inline-block'].join(' ');
                            return (
                                <div key={idx} className={classes}>
                                    <a href={tech.url}>
                                        <img
                                            className="inline max-width-full"
                                            src={`/images/logos/${tech.name}.svg`}
                                            alt={`${tech.name} logo`}
                                        />
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                    <div className="stat-desc">Built by developers, and looks like it ;-)</div>
                </div>
            </div>
        </div>
    );
}
