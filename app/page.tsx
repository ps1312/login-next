import { SignedIn, UserButton } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function Home() {
  const user = await currentUser()

  if (!user) {
    return redirect("/sign-in")
  }

  return (
    <main className="mx-4 py-10">
      <h1 className="text-3xl font-bold">{user?.firstName}</h1>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </main>
  )
}
