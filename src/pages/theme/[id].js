import React from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import Markdown from 'markdown-to-jsx';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';
import { staticPropsFor } from '../../utils/static-props-helper';
import { themeImageUrl } from '../../utils/theme-utils';
import BaseLayout from '../../components/BaseLayout';

export function JamstackThemePage(props) {
    const { page, site } = props;
    const formattedDate = dayjs(page.date).format('MMMM D, YYYY');
    const imageUrl = themeImageUrl(page.github);
    return (
        <BaseLayout page={page} site={site}>
            <div className="text-center pt-6 pb-2 text-2xl font-bold">Theme detail page</div>
            <div className="text-center pb-6 text-md font-light">
                Incomplete, as this is just an example site :-)
                <br />
                After editing themes, remember to also re-run indexing to Algolia!
            </div>

            <div className="flex justify-center">
                <div className="card w-[95%] lg:w-[950px] bg-base-100 shadow-xl">
                    <Link href={page.github}>
                        <a>
                            <img className="border-b-[1px] max-w-full" src={imageUrl} alt="Thumbnail image" />
                        </a>
                    </Link>
                    <div className="card-body">
                        <h2 data-sb-field-path="title" className="card-title">
                            {page.title}
                        </h2>
                        <div>
                            <span data-sb-fp="ssg" className="badge badge-outline rounded-md badge-primary badge-lg">
                                {page.ssg}
                            </span>
                        </div>
                        <p data-sb-fp="author" className="uppercase text-accent-focus">
                            {page.author}
                        </p>
                        <p data-sb-fp="date" className="uppercase text-accent-focus">
                            {formattedDate}
                        </p>
                        <p>
                            Github URL:{' '}
                            <a className="underline" href={page.github}>
                                {page.github}
                            </a>
                        </p>
                        <p>
                            Demo URL:{' '}
                            <a className="underline" href={page.demo}>
                                {page.demo}
                            </a>
                        </p>
                        <p data-sb-fp="description" className="text-md text-neutral">
                            {page.description}
                        </p>

                        {page.markdown_content && (
                            <Markdown
                                className="theme-details-markdown border-t-2 mt-4"
                                options={{ forceBlock: true }}
                                data-sb-fp="markdown_content"
                            >
                                {page.markdown_content}
                            </Markdown>
                        )}
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}

export async function getStaticPaths() {
    return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
    const urlPath = '/theme/' + params.id;
    const data = await sourcebitDataClient.getData();
    const props = await staticPropsFor(urlPath, data);
    return { props };
}

export default withRemoteDataUpdates(JamstackThemePage);
