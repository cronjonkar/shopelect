const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const thirdParty = require('./thirdParty')

let app = express()
const port = process.env.PORT || '5000'

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


app.get('/getContacts', (req, res, next) => {
    const { authorization } = req.headers
    const { organization_id } = req.query
    console.log(req.query)

    if (!authorization) {
        res.json({ msg: `You must send an Authorization header`, contactList: [] })
    } else {

        if (!organization_id) {
            res.json({ msg: `You must pass and organization id`, contactList: [] })
        } else {
            const [id] = organization_id.split(' ')
            const [token] = authorization.split(' ')
            thirdParty.getContacts(id, token).then(result => {
                // res.status(200).send({ msg: result.msg, contactList: result.data })
                res.json({ msg: result.msg, contactList: result.data })
            }
            ).catch(error => {
                // res.status(500).send({ msg: error, contactList: [] })
                res.json({ msg: error, contactList: [] })
            })
        }
    }


})

app.listen(port, () => {
    console.log(`server is running on ${port}`)
});