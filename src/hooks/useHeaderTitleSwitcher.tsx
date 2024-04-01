type HeaderTitleSwitcherProps = (pathname:string, name?: string, title?:string) => string

const useHeaderTitleSwitcher = () => {
    const switchHeader:HeaderTitleSwitcherProps = (pathname, name, title) => {
        switch (pathname) {
            case '/search/recipe':
                return setHeader('Search Recipe');
            case '/search/user':
                return setHeader('Search User');
            case '/recipe/[title]':
                return setHeader(String(title).toUpperCase());
            case '/profile/[id]':
                return setHeader(String(name));
            case '/profile/[id]/[...tab]':
                return setHeader(String(name));
            case '/bookmark-list':
                return setHeader('Bookmark List');
            case '/recipe/create':
                return setHeader('Create Recipe');
            default:
                return setHeader('');
        }
    };

    const setHeader = (header = 'nothing') => {
        return header
    };

    return {switchHeader, setHeader}
};

export default useHeaderTitleSwitcher;