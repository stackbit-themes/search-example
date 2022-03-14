/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { themeThumbnailUrl } from '../utils/theme-utils';

export function ThemeCard({ hit }) {
    const thumbnailImageUrl = themeThumbnailUrl(hit.github);
    return (
        <div
            data-sb-object-id={hit.objectID}
            className="card card-compact min-w-48 max-w-96 bg-base-100 shadow-lg rounded-lg"
        >
            <Link href={hit.url}>
                <a>
                    <img className="border-b-[1px]" src={thumbnailImageUrl} alt="Thumbnail image" />
                </a>
            </Link>
            <div className="card-body gap-[8px] h-48">
                <h3 className="card-title">{hit.title}</h3>
                <div>
                    <span className="badge badge-outline rounded-md badge-primary badge-md">{hit.ssg}</span>
                    {hit.css && (
                        <span className="ml-2 badge rounded-md badge-outline badge-accent badge-md">{hit.css}</span>
                    )}
                    {hit.contentBody && <span className="ml-2 badge rounded-md badge-accent badge-md">README</span>}
                </div>
                <p className="uppercase text-accent-focus grow-0">
                    By <span>{hit.author}</span>
                </p>
                <p className="text-md text-neutral text-ellipsis overflow-hidden line-clamp-3">{hit.description}</p>
            </div>
        </div>
    );
}
