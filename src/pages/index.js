import React from 'react';
import Link from 'next/link';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';
import { staticPropsFor } from '../utils/static-props-helper';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import 'instantsearch.css/themes/satellite.css';
import { themeThumbnailUrl } from '../utils/theme-utils';
import HomepageHeader from '../components/HomepageHeader';
import BaseLayout from '../components/BaseLayout';

const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);
const searchIndexName = process.env.NODE_ENV + '_' + process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME;
const searchLabel = 'Search for framework names, author names or really anything...';

function Homepage(props) {
    const { page, site } = props;
    return (
        <BaseLayout page={page} site={site}>
            <HomepageHeader {...props} searchIndexName={searchIndexName} />
            <ThemeSearch />
        </BaseLayout>
    );
}

function ThemeSearch() {
    return (
        <div className="mx-20">
            <InstantSearch searchClient={searchClient} indexName={searchIndexName}>
                <SearchBox translations={{ placeholder: searchLabel }} />
                <div>
                    <Hits hitComponent={ThemeCard} />
                </div>
            </InstantSearch>
        </div>
    );
}

function ThemeCard({ hit }) {
    const thumbnailImageUrl = themeThumbnailUrl(hit.github);
    return (
        <div data-sb-object-id={hit.objectID} className="card card-compact w-96 bg-base-100 shadow-xl rounded-lg">
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

function countThemes(data) {
    const allThemes = data.objects.filter((content) => content.layout == 'JamstackTheme');
    const enabledThemes = allThemes.filter((theme) => !theme.disabled);
    return { all: allThemes.length, enabled: enabledThemes.length };
}

export async function getStaticProps({ params }) {
    const data = await sourcebitDataClient.getData();
    const props = await staticPropsFor('/', data);
    props.themeCounts = countThemes(data);
    return { props };
}

export default withRemoteDataUpdates(Homepage);
