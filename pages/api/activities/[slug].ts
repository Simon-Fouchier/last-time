import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../server/db/client";
import {sessionService} from "../../../server/service/SessionService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await sessionService.manageSession(req, res);

    switch (req.method) {
        case "PUT":
            const {slug} = req.query;

            if (!slug || Array.isArray(slug)) {
                return res.status(400).json({message: "Slug is required"});
            }

            const activity = await prisma.activity.findUnique({where: {id: slug}});

            if (activity) {
                const updatedActivity = await prisma.activity.update({
                    where: {id: activity.id},
                    data: {
                        activityDate: new Date()
                    }
                });
                res.status(200).json(updatedActivity);
            } else {
                res.status(404).json({message: `Activity with slug: ${slug} not found.`});
            }
        default:
            return res.status(405).json({message: "Method Not Allowed"});
    }
    res.end();
}