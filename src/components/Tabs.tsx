import Link from 'next/link';
import React from 'react'

const Tabs = ({userId, active = 'recipe'}: {userId?:string, active?: string}) => {
    const tabClasses = 'flex gap-1 px-4 py-1 items-center border-b-4 border-b-white';
    const activeTabClasses = 'flex gap-1 px-4 py1 items-center border-b-4 border-accentColor text-accentColor';

  return (
    <div className="mt-4 md:mt-10 flex gap-0 justify-center">
    <Link href={`/profile/${userId}/recipe`} className={active === 'recipe' ? activeTabClasses : tabClasses }>
        Recipes
    </Link>
    <Link href={`/profile/${userId}/bookmark-list`} className={active === 'bookmark-list' ? activeTabClasses : tabClasses}>
        Bookmarks
    </Link>
    <Link href={`/profile/${userId}/settings`} className={active === 'settings' ? activeTabClasses : tabClasses}>
        Settings
    </Link>
</div>
  )
}

export default Tabs