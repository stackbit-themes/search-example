import * as React from 'react';
import Head from 'next/head';

export default function BaseLayout(props) {
    const { page, site } = props;
    return (
        <div data-sb-object-id={page?.__metadata?.id}>
            <Head>
                <title>{page.title}</title>
                {site.favicon && <link rel="icon" href={site.favicon} />}
            </Head>
            <body className="bg-gray-100 min-h-screen">{props.children}</body>
        </div>
    );
}
