var request = require('request');

describe('calc', () => {
    it('should multiply 2 and 2', () =>{
        expect(2*2).toBe(4);
    });
});

describe('get messages', () => {
    it('should return 200 Ok', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(res.statusCode).toEqual(200);
            done();
        });
    });
});

describe('get messages', () => {
    it('should return not empty', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0);
            done();
        });
    });
});

describe('get messages by user', () => {
    it('should get messages from user maks', (done) => {
        request.get('http://localhost:3000/messages/maks', (err, res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0);
            done();
        });
    });
    it('should be maks messages', (done) => {
        request.get('http://localhost:3000/messages/maks', (err, res) => {
            console.log(JSON.parse(res.body)[0].name);
            expect(JSON.parse(res.body)[0].name).toEqual('maks');
            done();
        });
    })
});