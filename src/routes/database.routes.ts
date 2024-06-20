import { IncomingMessage, ServerResponse } from "http";

import { createDatabase } from '@/controllers'
import { HttpMethods, HttpStatusCodes, ContentTypeValues,HttpHeaders } from '@/enums'

export const handleRequest = (req: IncomingMessage, res: ServerResponse) => {
    if(req.method === HttpMethods.POST && req.url === '/create-db'){
        createDatabase(req, res)
    } else {
        res.statusCode = HttpStatusCodes.BadRequest
        res.setHeader(HttpHeaders.ContentType, ContentTypeValues.ApplicationJson)
        res.end(JSON.stringify({error: 'Not Found'}))
    }
}
