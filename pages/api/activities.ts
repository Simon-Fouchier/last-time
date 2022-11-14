import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../server/db/client";
import {sessionService} from "../../server/service/SessionService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {method} = req;
    switch (method) {
        case "POST":
            const session = await sessionService.manageSession(req, res);
            const body: { activityDate: string, name: string } = JSON.parse(req.body);
            const activity = await prisma.activity.create({
                data: {
                    name: body.name,
                    activityDate: body.activityDate,
                    sessionId: session.sessionId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            })
            return res.end(JSON.stringify(activity))
        default:
            return res.status(405).json({message: "Method Not Allowed"});
    }
}