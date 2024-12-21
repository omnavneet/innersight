import { auth } from '@clerk/nextjs/server'
import { UserModel } from '../models/Ad'
import { connectionDB } from './connectionDB'

const getUserByClerkId = async () => {
  await connectionDB()
  const { userId } = await auth()
  const user = await UserModel.findOne({
    clerkId: userId,
  })
  return user
}

export default getUserByClerkId
