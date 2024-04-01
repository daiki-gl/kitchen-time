import { RootState } from '@/redux/store';
import { User } from '@/types/type';
import Link from 'next/link';
import React from 'react'
import { useSelector } from 'react-redux';

const Tabs = ({userData, active = 'recipe'}: {userData:User, active?: string}) => {
    const tabClasses = 'flex gap-1 px-4 py-1 items-center border-b-4 border-b-white';
    const activeTabClasses = 'flex gap-1 px-4 py1 items-center border-b-4 border-accentColor text-accentColor';
    
    const loginUserId = useSelector((state:RootState) => state.persistedReducer.users.user?.[0]?.id)
    const { id } = userData

    // console.log({userData});


  return (
    <div className="mt-4 md:mt-10 flex gap-0 justify-center">
    <Link href={{
                pathname:`/profile/${id}/recipe`,
                // query: { 
                //   ...userData,
                //   }
                }}
                as={`/profile/${(id)}/recipe`}
                className={active === 'recipe' ? activeTabClasses : tabClasses }
                >
        Recipes
    </Link>
    <Link href={{
                pathname:`/profile/${id}/bookmark-list`,
                // query: { 
                //   ...userData,
                //   }
                }}
                as={`/profile/${(id)}/bookmark-list`}
                className={active === 'bookmark-list' ? activeTabClasses : tabClasses}
                >
        Bookmarks
    </Link>
    {loginUserId === id && (
    <Link href={{
                pathname:`/profile/${id}/settings`,
                // query: { 
                //   ...userData,
                //   }
                }}
                as={`/profile/${(id)}/settings`}
                className={active === 'settings' ? activeTabClasses : tabClasses}
                >
        Settings
    </Link>
    )}
</div>
  )
}

export default Tabs

