import {getUserProject} from "@/lib/actions";
import {UserProfile} from "@/common.type";
import ProfilePage from "@/components/ProfilePage";

type Props = {
    params: {
        id: string;
    }
}

async function UserProfile({params}: Props) {
    const result = await getUserProject(params.id, 100) as {user: UserProfile};

    if (!result?.user) {
        return <p className={"no-result-text"}>Failed to fetch user info</p>
    };

    return (
        <ProfilePage user={result?.user}/>
    )
}

export default UserProfile;
