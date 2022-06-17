// @ts-ignore: Object is possibly 'null'.
// @ts-nocheck

import { PrismaClient } from '@prisma/client'
import { logger } from "./logger"

const prisma = new PrismaClient()

export async function registerView(id: number) {
    let foundRedirect = await prisma.links.findFirst({where: { id }})
    
    if(foundRedirect) {
        let newViews = foundRedirect!.views += 1;
        let res = await prisma.links.update({where: { id: id }, data: { views: newViews}})
        logger.debug(`Added view to redirect with ID: ${foundRedirect!.id}`);

        return true;
    } else {
        logger.debug(`Cannot find a redirect with ID: ${id}`);
        
        return false;
    }
}

export async function createLink(to: string ) { 
    const newLink = await prisma.links.create({data: { to, views: 0}})

    logger.info(`New redirect: ${to} with ID: ${newLink.id}`)
    return newLink.id;
}    