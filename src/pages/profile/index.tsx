// import React from 'react'
// import ProfilePage from './ProfilePage'
// import { supabase } from '@/lib/supabaseClient'

// const index = ({data}:{data:any}) => {
//   return (
//     <ProfilePage data={data} />
//   )
// }

// export default index

// export async function getStaticPaths() {
//   const {data, error} = await supabase
//     .from('users')
//     .select()
    
//     if(error){
//             console.log(error);
//             return []
//     }

//   const allPaths = data.map((user) => {
//     return {
//       params: {
//         id: user.id.toString(),
//       },
//     };
//   });
//   return {
//     paths: allPaths,
//     fallback: false,
//   };
// }

// export async function getStaticProps(context:any) {
//   console.log(context.params.id);
//   const {data, error} = await supabase
//     .from('users')
//     .select()
    
//     if(error){
//             console.log(error);
//             return []
//     }

//     const userData = data.filter(data => data.id === context.params.id)

//   return {props: {data: userData}}
// }