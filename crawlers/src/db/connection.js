import Mongoose from 'mongoose'

import apiData from '../../api-data.json'

Mongoose.connect(apiData.database || 'mongodb://localhost:27017/blu365',
	(err) => {
		if (err) {
			console.log('Erro na tentativa conexão ao banco de dados, a aplicação será finalizada!')
			console.error(err)
			process.exit(1)
		}
	}
)

export default Mongoose
