import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';

/* 
    Currently, fixed to light theme. 
    Potentially, configurable by content editors - 
    e.g. https://github.com/stackbit/dynamic-example-app/blob/master/src/pages/_document.tsx
*/
export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        initialProps['theme'] = 'light';
        return initialProps;
    }

    render() {
        return (
            <Html data-theme={this.props['theme']}>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
