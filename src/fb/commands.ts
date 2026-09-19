import { db } from "./init"
import { doc, setDoc } from "firebase/firestore"

interface InviteData {
    date?: string
    weekday?: string
    time?: string
    duration?: number
        [key: string]: unknown
}

export async function saveInvite(data: InviteData, id: string): Promise<string> {

    await setDoc(doc(db, "invites", id), {
        ...data,
        createdAt: new Date().toISOString()
    })

    return id
}