import parseGithubUrl from 'parse-github-url';

/* Code here taken from source of jamstackthemes.dev, to point to same image URLs */

function imageName(githubUrl) {
    const repoName = parseGithubUrl(githubUrl).repo;
    const imageName = repoName.replace('/', '-').toLowerCase();
    return imageName;
}

export function themeThumbnailUrl(githubUrl) {
    return `https://jamstackthemes.dev/images/theme/thumbnail/2x/${imageName(githubUrl)}-2x.jpg`;
}

export function themeImageUrl(githubUrl) {
    return `https://jamstackthemes.dev/capture/${imageName(githubUrl)}.png`;
}
