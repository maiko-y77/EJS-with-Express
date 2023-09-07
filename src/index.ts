import express from 'express';
import morgan from 'morgan';
import path from 'path';

const app = express();

type DataType = {
    email: string;
    password: string;
}

const users: DataType[] = [];

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home', { title: 'HOME' });
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'LOGIN FORM' });
});

app.get('/register', (req, res) => {
    res.render('register', { title: 'REGISTER FORM' });
});

//register route
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    const newUser = { email, password };
    users.push(newUser);
    res.redirect('/login');
});

//login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

const PORT = 3000;
const HOST = 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
