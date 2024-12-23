import { currentUser } from '@clerk/nextjs/server'
import { UserModel } from '../models/Ad'
import { redirect } from 'next/navigation'
import { connectionDB } from '../libs/connectionDB'
import loading from './loading'

const createNewUser = async () => {
  await connectionDB()
  const user = await currentUser()
  console.log(user?.primaryEmailAddress?.emailAddress)
  const match = await UserModel.findOne({ clerkId: user?.id })

  if (!match) {
    await UserModel.create({
      clerkId: user?.id,
      email: user?.primaryEmailAddress?.emailAddress,
    })
  }
  redirect('/journal')
}

const NewUser = async () => {
  await createNewUser()
  return loading()
}

export default NewUser
