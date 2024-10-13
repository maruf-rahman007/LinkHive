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
            <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-green-300 to-indigo-300
 sm:l-[10px] flex flex-col sm:flex-row md:flex-row p-4">
                {/* MenuBar with fixed width */}
                <div className="md:w-[80px] lg:w-[100px] mb-4 md:mb-0 sm:mr-10 sm:ml-10">
                    <MenuBar />
                </div>

                {/* ProfileCard takes up all remaining space */}
                <div className="flex-1 md:flex-grow mb-4 md:mb-0 flex w-full sm:ml-40">
                    <ProfileCard /> {/* ProfileCard should have no borders */}
                </div>

                {/* PreviewCard with fixed width and auto margin on large screens */}
                <div className="md:w-[300px] lg:w-[350px] md:ml-10 lg:ml-0 sm:mr-10 sm:ml-10">
                    <PreviewCard />
                </div>
            </div>
        </div>
    );
}
