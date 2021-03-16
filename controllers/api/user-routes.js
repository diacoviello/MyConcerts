const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            email: req.body.email,
            password: req.body.password,
            // TODO: SET EMAIL TO EMAIL SENT IN REQUEST
            // TOD: SET PASSWORD TO PASSWORD SENT IN REQUEST
        });

        req.session.save(() => {
            req.session.userId = myconcertsDB.id;
            req.session.email = myconcertsDB.email;
            req.session.loggedIn = true;
            // TODO: SET USERID IN REQUEST SESSION TO ID RETURNED FROM DATABASE

            // TODO: SET EMAIL IN REQUEST SESSION TO EMAIL RETURNED FROM DATABASE

            // TODO: SET LOGGEDIN TO TRUE IN REQUEST SESSION

            res.json(newUser);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                EMAIL: req.body.EMAIL,
            },
        });

        if (!user) {
            res.status(400).json({ message: 'No user account found!' });
            return;
        }

        const validPassword = user.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'No user account found!' });
            return;
        }

        req.session.save(() => {
            req.session.userId = myconcertsDB.id;
            req.session.email = myconcertsDB.email;
            req.session.loggedIn = true;

            // TODO: SET USERID IN REQUEST SESSION TO ID RETURNED FROM DATABASE

            // TODO: SET EMAIL IN REQUEST SESSION TO EMAIL RETURNED FROM DATABASE

            // TODO: SET LOGGEDIN TO TRUE IN REQUEST SESSION

            res.json({ user, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json({ message: 'No user account found!' });
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});



router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleteUser = await User.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!deleteUser) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        res.status(200).json(deleteUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
