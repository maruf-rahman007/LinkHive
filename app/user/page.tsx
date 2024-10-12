import { Appbar } from "@/components/Appbar";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../lib/auth";
import { redirect } from "next/navigation";
import MenuBar from "@/components/MenuBar";
import ProfileCard from "@/components/ProfileCard";
import PreviewCard from "@/components/PreviewCard";
import axios from "axios";

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
            <div className="sm:l-[10px] flex flex-col sm:flex-row md:flex-row p-4 sm:mr-10 sm:ml-10">
                {/* MenuBar with fixed width */}
                <div className="md:w-[80px] lg:w-[100px] mb-4 md:mb-0">
                    <MenuBar />
                </div>

                {/* ProfileCard takes up all remaining space */}
                <div className="flex-1 md:flex-grow mb-4 md:mb-0 flex w-full sm:ml-40">
                    <ProfileCard/>
                </div>

                {/* PreviewCard with fixed width and auto margin on large screens */}
                <div className="md:w-[300px] lg:w-[350px] md:ml-10 lg:ml-0">
                    <PreviewCard />
                </div>
            </div>
        </div>
    );
}
