import { SignIn } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center mt-40">
      <SignIn />
    </div>
  )
}
