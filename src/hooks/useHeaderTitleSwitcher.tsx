import { useEffect } from "react";

type HeaderTitleSwitcherProps = {
    pathname: string
    query: any
}

const useHeaderTitleSwitcher = () => {
// const useHeaderTitleSwitcher = (pathname:string, query:any) => {
    // useEffect(() => {
    //     switchHeader(pathname, query);
    // }, [pathname, query]);

    const switchHeader = (pathname:string, query:any) => {
        switch (pathname) {
            case '/search/recipe':
                return setHeader('Search Recipe');
            case '/search/user':
                return setHeader('Search User');
            case '/recipe/[title]':
                return setHeader(String(query.title).toUpperCase());
            case '/profile/[id]':
                return setHeader(String(query.name));
            case '/profile/[id]/[...tab]':
                return setHeader(String(query.name));
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