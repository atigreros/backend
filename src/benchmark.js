import autocannon from 'autocannon';
import { PassThrough } from 'stream';

const run = (url) => {
    const buf = [];
    const outputStream = new PassThrough();
    const inst = autocannon({
         url,
         connection: 100,
         duration: 20 });

    autocannon.track(inst, { outputStream });

    outputStream.on('data', data => buf.push(data));
    inst.on('done', () => {
        process.stdout.write(Buffer.concat(buf));
    })
}

console.log('Running');
run('http://localhost:8080/infobloq');
run('http://localhost:8080/info');
