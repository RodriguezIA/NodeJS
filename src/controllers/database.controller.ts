import { Client } from 'pg'
import { IncomingMessage, ServerResponse } from 'http'

import { database_config } from '@/config'
import { HttpHeaders, ContentTypeValues, HttpStatusCodes } from '@/enums'


export const createDatabase = async(req: IncomingMessage, res: ServerResponse) => {
    let body = ''

    req.on('data', chunk => {
        body += chunk.toString()
    })

    req.on('end', async () => {
        const { database_name } = JSON.parse(body)

        if(!database_name) {
            res.statusCode = HttpStatusCodes.BadRequest
            res.setHeader(HttpHeaders.ContentType, ContentTypeValues.ApplicationJson)
            res.end(JSON.stringify({error: 'Database name is required'}))
            return
        }

        const client = new Client(database_config)

        try{
            await client.connect()
            await client.query(`CREATE DATABASE ${database_name}`)

            res.statusCode = HttpStatusCodes.OK
            res.setHeader(HttpHeaders.ContentType, ContentTypeValues.ApplicationJson)
            res.end(JSON.stringify({message: `Database ${database_name} created successfully`}))
        } catch (error) {
            console.error(error)
            res.statusCode = HttpStatusCodes.InternalServerError
            res.setHeader(HttpHeaders.ContentType, ContentTypeValues.ApplicationJson)
            res.end(JSON.stringify({error: 'Failed to create database'}))
        } finally {
            await client.end();
        }
    })
}