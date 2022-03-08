export function staticPropsFor(urlPath, data) {
    const page = data.pages.find((page) => page.__metadata.urlPath === urlPath);
    return {
        page,
        ...data.props
    };
}
