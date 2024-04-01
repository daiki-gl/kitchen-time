import Tabs from '@/components/Tabs'
import { useRouter } from 'next/router'
import Settings from '@/components/Settings'
import RecipeList from '@/components/RecipeList'
import ProfileInfo from '@/components/ProfileInfo'
import { User } from '@/types/type'

const ProfilePage = ({data}:{data:User[]}) => {
    const {query} = useRouter()
    if(query?.tab === undefined || null) query.tab = Array('recipe');

  return (
    <div className="min-h-screen pt-14 pb-24 mx-auto md:ml-[68px] md:pt-5 lg:ml-80">

      <div className="relative overflow-hidden text-sm bg-white md:mx-5 md:rounded-lg lg:mx-24">
        
        <ProfileInfo userData={data[0]} />

            <Tabs userData={data[0]} active={query.tab[0]} />

        </div>

        <div className='container mx-auto'>
        {query.tab[0] === "bookmark-list"  && (
            <RecipeList userData={data[0]} />
        )}


        {query.tab[0] === "recipe"  && (
            <RecipeList userData={data[0]} />
        )}

        {query.tab[0] === "settings" && (
            <Settings />
        )}
        </div>
    </div>
  )
}

export default ProfilePage