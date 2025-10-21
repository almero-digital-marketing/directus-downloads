import mime from 'mime-types';
import { existsSync, createReadStream } from 'fs';
import { glob } from 'glob';

export default (router) => {
	router.get('/:file', async (req, res) => {
		const file = `./uploads/${req.params.file}`;
		if (existsSync(file)) {
			res.setHeader('content-type', mime.lookup(file) || 'application/octet-stream');
			createReadStream(file).pipe(res)
		} else {
			const files = await glob(file + '.*')
			if (files.length) {
				res.setHeader('content-type', mime.lookup(files[0]) || 'application/octet-stream');
				createReadStream(files[0]).pipe(res)
			} else {
				res.sendStatus(404)
			}
		}
	});
};
