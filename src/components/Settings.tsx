import Link from 'next/link'
import React from 'react'
import { BiFoodMenu, BiLockOpen } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'
import { MdAccountCircle } from 'react-icons/md'

const Settings = () => {
  return (
    <div className='flex flex-col gap-3 m-5 lg:lg:mx-24'>
                <Link href={'#'} className="text-font-color">
                    <MdAccountCircle className='inline-block mr-2 text-xl'/>
                    Account information
                </Link>
                <Link href={'#'} className="text-font-color">
                    <BiLockOpen className='inline-block mr-2 text-xl'/>
                    Change password
                </Link>
                <Link href={'#'} className="text-font-color" >
                    <BiFoodMenu className='inline-block mr-2  text-xl'/>
                    Your recipes
                </Link>
            <button className='inline-block text-left'>
                <FiLogOut className='inline-block mr-2  text-xl' />
                Logout
            </button>
            </div>
  )
}

export default Settings