import * as React from 'react';
import Head from 'next/head';

export default function BaseLayout(props) {
    const { page, site } = props;
    const pageMeta = page?.__metadata || {};
    return (
        <div data-sb-object-id={pageMeta.id}>
            <Head>
                <title>{page.title}</title>
                {site.favicon && <link rel="icon" href={site.favicon} />}
            </Head>
            <body className="bg-base-200 min-h-screen">{props.children}</body>
        </div>
    );
}
