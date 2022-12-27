// _document.tsx
import type { DocumentContext } from 'next/document';
import Document from 'next/document';
import { createStylesServer, ServerStyles } from '@mantine/next';
import { emotionCache } from '../utils/emotion-cache';

const stylesServer = createStylesServer(emotionCache);

export default class _Document extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            styles: [
                initialProps.styles,
                <ServerStyles
                    html={initialProps.html}
                    server={stylesServer}
                    key="styles"
                />,
            ],
        };
    }
}
