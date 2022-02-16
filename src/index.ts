import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { app } from './app';
import { PORT } from './constants';
import { getConnectionConfig } from './ormconfig';

(async () => {
	const connectionConfig = getConnectionConfig();
	await createConnection({ ...connectionConfig!, name: 'default' });

	app.listen({ port: PORT }, () => {
		console.log(`🚀 Server ready at http://localhost:${PORT}`);
	});
})();
