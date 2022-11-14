import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../db/client";


async function manageSession(req: NextApiRequest, res: NextApiResponse): Promise<{ sessionId: string }> {

    let session;
    // Update session id if it's not set
    if (!req.cookies.session) {

        const newSession = await prisma.session.create({
            data: {}
        })

        res.setHeader("Set-Cookie", `session=${newSession.id}; path=/; expires=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toUTCString()}; httpOnly=true; SameSite=Lax; Secure`);
        session = {sessionId: newSession.id};
    } else {
        session = {sessionId: req.cookies.session};
    }

    return session;

}

export const sessionService = Object.freeze({
    manageSession
})