import React from 'react';

export function withPageHeading<P extends object>(Page: React.ComponentType<P>, title: string) {
    const PageWithHeading = (props: P) => {
        return (
            <div>
                <h1 className='mb-6'>{title}</h1>
                <Page {...props} />
            </div>
        );
    };

    PageWithHeading.displayName = Page.displayName || Page.name || 'PageComponent';

    return PageWithHeading;
};

export default withPageHeading;