import { Appbar } from "@/components/Appbar";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../lib/auth";
import { redirect } from "next/navigation";
import MenuBar from "@/components/MenuBar";
import ProfileCard from "@/components/ProfileCard";
import PreviewCard from "@/components/PreviewCard";

export default async function UserComponent() {
    const session = await getServerSession(NEXT_AUTH);

    // Redirect to homepage if not authenticated
    if (!session || !session.user) {
        redirect('/signin'); 
        return null;
    }

    return (
        <div>
            <Appbar />
            <div className="flex flex-col md:flex-row md:space-x-4 p-4">
      <MenuBar />
      <ProfileCard />
      <PreviewCard />
    </div>
        </div>
        
    );
}
