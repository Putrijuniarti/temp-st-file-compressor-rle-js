const fs = require('fs');
const compress = require('./compress');

const runLengthEncode = (input) => {
    let encoded = '';
    let count = 1;
    for (let i = 1; i < input.length; i++) {
        if (input[i] === input[i - 1]) {
            count++;
        } else {
            encoded += input[i - 1] + count;
            count = 1;
        }
    }
    encoded += input[input.length - 1] + count;
    return encoded;
};

describe('Compress function tests', () => {
    test('RunLengthEncode should encode strings correctly', () => {
        expect(runLengthEncode('aaabb')).toBe('a3b2');
        expect(runLengthEncode('abc')).toBe('a1b1c1');
    });

    test('Compress should successfully create a compressed file', (done) => {
        const mockInputPath = './mockInput.txt';
        const mockOutputPath = './mockOutput.txt';

        // Buat file input mock
        fs.writeFileSync(mockInputPath, 'aaabb\nabc');

        // Jalankan fungsi compress
        compress(mockInputPath, mockOutputPath);

        // Berikan waktu untuk menyelesaikan operasi async
        setTimeout(() => {
            try {
                // Baca file output untuk memastikan hasilnya benar
                const output = fs.readFileSync(mockOutputPath, 'utf8');
                expect(output).toBe('a3b2\na1b1c1');
            } finally {
                // Bersihkan file mock
                fs.unlinkSync(mockInputPath);
                fs.unlinkSync(mockOutputPath);
                done();
            }
        }, 1000); // Tambahkan waktu tunggu 1 detik
    }, 10000); // Tambahkan timeout 10 detik untuk tes ini
});
