import express from 'express'
import React from 'react'
import renderer from '../helpers/renderer'

const app = express()
const PORT = 3000

app.use(express.static('public'))

app.get('*', (req, res) => {
	res.send(renderer(req))
})

app.listen(PORT,() => {
	console.log("listens on port ", PORT)
})
