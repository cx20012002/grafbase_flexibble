'use client'

import Link from "next/link";
import Image from "next/image";
import {useState} from "react";
import {deleteProject, fetchToken} from "@/lib/actions";
import {useRouter} from "next/navigation";

function ProjectActions({projectId}: { projectId: string }) {
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter();
    const handleDeleteProject = async () => {
        setIsDeleting(true);
        const {token} = await fetchToken();
        router.push('/');
        router.refresh();
        try {
            await deleteProject(projectId, token);
        } catch (error) {
            console.log(error);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <>
            <Link
                href={`/edit-project/${projectId}`}
                className={"flexCenter edit-action_btn"}
            >
                <Image src={"/pencile.svg"} width={15} height={15} alt="edit"/>
            </Link>
            <button
                type={"button"}
                className={`flexCenter delete-action_btn ${isDeleting ? 'bg-gray' : 'bg-primary-purple'}`}
                onClick={handleDeleteProject}
            >
                <Image src={"/trash.svg"} alt={"delete"} width={15} height={15}/>
            </button>
        </>
    )
}

export default ProjectActions;
