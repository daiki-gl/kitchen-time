export type RecipeData = {
    id : number
    title : string
    thumbnail? : string
    serves : number
    ingredients : string[]
    directions : string[]
    tips?: string
    user_id : string
  // users : {
    // id : string
    // name : string
    // avatar : string
    // bio : string
    // cover_image : string
  // }
  }
  
  export type User = {
    id : string
    name : string
    avatar?: string
    cover_image?: string
    bio?: string
  }
  
  export type Loading = {
    loading: 'pending' | 'idle'
  }